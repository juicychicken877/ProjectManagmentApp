import { useState, useRef } from 'react';
import ErrorDialog from './components/ErrorDialog.jsx';
import logo from './assets/images/no-projects.png';

export default function App() {
    const [projects, setProjects] = useState([
        {
            name: 'Test Project',
            description: 'A new way to stay productive',
            dueDate: '08-07-2007',
            tasks: []
        }
    ]);
    const [isProjectSelected, setIsProjectSelected] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isCreatingProject, setIsCreatingProject] = useState(false);

    const nameInput = useRef();
    const descriptionInput = useRef();
    const dateInput = useRef();
    const taskInput = useRef();
    const errorDialog = useRef();

    const handleOpeningForm = () => {
        setIsCreatingProject(true);
        setSelectedProject({});
        setIsProjectSelected(false);
    }

    const handleClosingForm = () => {
        setIsCreatingProject(false);
        setSelectedProject({});
        setIsProjectSelected(false);
    }

    const handleSaveClick = () => {
        let name = nameInput.current.value;
        let description = descriptionInput.current.value;
        let date = dateInput.current.value;

        if (name != '' && description != '' && date != '') {
            handleCreatingProject(name, description, date);
        }
        else {
            errorDialog.current.open('Please enter valid data');
        }
    }

    const handleSelectingProject = (project) => {
        setIsProjectSelected(true);
        setSelectedProject(project);
        setIsCreatingProject(false);
    }

    const handleCreatingProject = (projectName, projectDescription, date) => {
        const projectObject = {
            name: projectName,
            description: projectDescription,
            dueDate: date,
            tasks: []
        }

        const repetition = projects.find((value, index, array) => {
            return projectObject.name == value.name
        })

        if (repetition == null) {
            setProjects(prevProjects => {
                return [
                    ...prevProjects,
                    projectObject
                ]
            })

            handleClosingForm();
        }
        else {
            errorDialog.current.open("Project with the same name already exists");
        }
    }

    const handleAddingTask = () => {
        let taskName = taskInput.current.value;

        if (taskName != '') {
            // find selected project in projects
            let project = projects.find((value, index, array) => {
                return value.name == selectedProject.name;
            })

            project.tasks.push(taskName);

            setSelectedProject(prevSelectedProject => {
                return {
                    ...prevSelectedProject,
                    tasks: project.tasks
                }
            })
        }

        taskInput.current.value = '';
    }

    const handleClearingTask = (task, taskArray) => {
        let taskPosition = taskArray.indexOf(task);

        taskArray.splice(taskPosition, 1);

        setSelectedProject(prevSelectedProject => {
            return {
                ...prevSelectedProject,
                tasks: taskArray
            }
        })
    }

    const handleDeletingProject = (project) => {
        let projectPosition = projects.find((value, index, array) => {
            return project.name == value.name && index;
        })

        setProjects(prevProjects => {
            return prevProjects.splice(projectPosition, 1);
        })

        setSelectedProject(null);

        setIsProjectSelected(false);

    }

    return  <main>
        {/* Dialogs */}
        <ErrorDialog ref={errorDialog} />

        {/* Your projects section */}
        <div className='projects'>
            <h2 onClick={handleClosingForm}>Your Projects</h2>
            <button onClick={handleOpeningForm}>+ Add Project</button>
            <section className='projectSection'>
                {projects.map(project => {
                    return <button key={project.name} onClick={() => handleSelectingProject(project)}>{project.name}</button>
                })}
            </section>
        </div>

        {/* Main window */}
        <div className='mainWindow'>
            {/* Project not selected */}
            {!isProjectSelected && !isCreatingProject && <div className='notSelected'>
                    <img src={logo}></img>
                    <h2>No project selected</h2>
                    <p>Select a project or start with a new one</p>
                    <button onClick={handleOpeningForm}>Create new project</button>
            </div>
            }
            {/* Project creation form */}
            {isCreatingProject && <div>
                <section className='buttons'>
                    <button onClick={() => {handleClosingForm()}}>Cancel</button>
                    <button onClick={handleSaveClick}>Save</button>
                </section>
                <form>
                    <label>Title</label>
                    <input type='text' ref={nameInput}></input>
                    <label>Description</label>
                    <textarea ref={descriptionInput}></textarea>
                    <label>Due date</label>
                    <input type='date' ref={dateInput}></input>
                </form>
            </div>
            }
            {isProjectSelected && 
                <div className='projectSelected'>
                    <button className='deleteButton' onClick={() => handleDeletingProject(selectedProject)}>Delete Project</button>
                    <h2>{selectedProject.name}</h2>
                    <span>{selectedProject.dueDate}</span>
                    <p>{selectedProject.description}</p>
                    <hr></hr>
                    <h2>Tasks</h2>
                    <input type='text' ref={taskInput}></input>
                    <button onClick={handleAddingTask}>Add task</button>

                    {selectedProject.tasks.length <= 0 ? <p>This project does not have any tasks yet.</p> 
                        :
                        <div className='projectTasks'>
                            {selectedProject.tasks.map(task => {
                                return <div className='task' key={task}>
                                    <p>{task}</p>
                                    <button onClick={() => handleClearingTask(task, selectedProject.tasks)}>Clear</button>
                                </div>
                            })}
                        </div>
                    }
                </div>
            }
        </div>
    </main>
}

