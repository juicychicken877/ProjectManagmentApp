import { useState, useRef } from 'react';
import Projects from './components/Projects.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import ErrorDialog from './components/ErrorDialog.jsx';
import Form from './components/Form.jsx';
import ProjectView from './components/ProjectView.jsx';
import MainWindow from './components/MainWindow.jsx';

const FORM_VALUES = {
    nameInput: '',
    descriptionInput: '',
    dateInput: '',
}

export default function App() {
    const [projects, setProjects] = useState([
        {
            name: 'The First Project',
            description: 'A new way to stay productive',
            dueDate: '2024-04-01',
            tasks: [],
        },
    ]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [formValues, setFormValues] = useState(FORM_VALUES);
    const [isCreatingProject, setIsCreatingProject] = useState(false);

    const errorDialog = useRef();
    const taskInput = useRef();

    /* ---------------------*/
    const handleOpeningForm = () => {
        setIsCreatingProject(true);
        setSelectedProject(null);
    }

    const handleClosingForm = () => {
        setIsCreatingProject(false);
        setSelectedProject(null);
    }

    const handleSaveClick = () => {
        let name = formValues.nameInput;
        let description = formValues.descriptionInput;
        let date = formValues.dateInput;

        if (name && description && date) {
            handleCreatingProject(name, description, date);
            setFormValues(FORM_VALUES);
        }
        else {
            errorDialog.current.open('Please enter valid data');
        }
    }

    const handleSelectingProject = (project) => {
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

        if (!findProject(projectObject.name)) {
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

    const findProject = (projectName) => {
        let proj = projects.find(value => {
            return projectName == value.name;
        })

        return proj;
    }

    const findTask = (task, taskArray) => {
        let t = taskArray.find(value => {
            return task == value;
        })

        return t;
    }

    const handleAddingTask = () => {
        let taskName = taskInput.current.value;

        if (taskName) {
            let project = findProject(selectedProject.name);

            if (!findTask(taskName, project.tasks)) {
                project.tasks.push(taskName);

                setSelectedProject(prevSelectedProject => {
                    return {
                        ...prevSelectedProject,
                        tasks: project.tasks
                    }
                })
            }
            else {
                errorDialog.current.open("Task with the same name already exists");
            }
        }

        taskInput.current.value = '';
    }

    const handleClearingTask = (task) => {
        let taskArray = selectedProject.tasks;
        taskArray.splice(taskArray.indexOf(task), 1);

        setSelectedProject(prevSelectedProject => {
            return {
                ...prevSelectedProject,
                tasks: taskArray
            }
        })
    }

    const handleDeletingProject = (project) => {
        let projectPosition = projects.indexOf(project);

        // delete project
        projects.splice(projectPosition, 1);

        setProjects(projects);
        setSelectedProject(null);
    }

    return  <main>
        <ErrorDialog 
            ref={errorDialog} 
        />
        <Projects 
            handleClosingForm={handleClosingForm}
            handleOpeningForm={handleOpeningForm}
            handleSelectingProject={handleSelectingProject}
            projects={projects}
        />
        <MainWindow>
            {!selectedProject && !isCreatingProject && 
                <NoProjectSelected 
                    handleOpeningForm={handleOpeningForm}
                />
            }
            {isCreatingProject && 
                <Form 
                    setFormValues={setFormValues}
                    handleClosingForm={handleClosingForm}
                    handleSaveClick={handleSaveClick}
                />
            }
            {selectedProject && 
                <ProjectView 
                    handleAddingTask={handleAddingTask}
                    handleClearingTask={handleClearingTask}
                    handleDeletingProject={handleDeletingProject}
                    selectedProject={selectedProject}
                    ref={taskInput}
                />
            }
        </MainWindow>
    </main>
}

