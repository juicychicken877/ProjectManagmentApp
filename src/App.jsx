import { useState, useRef } from 'react';
import Projects from './components/Projects.jsx';
import ErrorDialog from './components/ErrorDialog.jsx';
import Form from './components/Form.jsx';
import ProjectView from './components/ProjectView.jsx';
import MainWindow from './components/MainWindow.jsx';
import Settings from './components/side_panel/Settings.jsx';
import Dashboard from './components/side_panel/Dashboard.jsx';

export const DEFAULT_TAB = 'DASHBOARD';

const FORM_VALUES = {
    nameInput: '',
    descriptionInput: '',
    dateInput: '',
}

export default function App() {
    const [projects, setProjects] = useState([
        {
            name: 'Text Project Example',
            description: 'Project for testing and development',
            dueDate: '2025-01-01',
            tasks: [
                'Eat', 'Sleep', 'Gym', 'Code', 'Play'
            ]
        }
    ]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [formValues, setFormValues] = useState(FORM_VALUES);
    const [currentOpenTab, setCurrentOpenTab] = useState(DEFAULT_TAB);
    const [activeButton, setActiveButton] = useState(DEFAULT_TAB);

    const errorDialog = useRef();
    const taskInput = useRef();

    /* ---------------------*/
    const handleOpenTab = (tab) => {
        setCurrentOpenTab(tab);

        if (tab == 'FORM')
            setActiveButton(null);

        if (tab == DEFAULT_TAB)
            setActiveButton(DEFAULT_TAB);
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
        setActiveButton(project.name);
        setSelectedProject(project);
        handleOpenTab('PROJECTVIEW');
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
            handleOpenTab(DEFAULT_TAB);
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

        handleOpenTab(DEFAULT_TAB);
        setProjects(projects);
        setSelectedProject(null);
    }

    return  <main>
        <ErrorDialog 
            ref={errorDialog} 
        />
        <Projects 
            handleOpenTab={handleOpenTab}
            handleSelectingProject={handleSelectingProject}
            setActiveButton={setActiveButton}
            activeButton={activeButton}
            projects={projects}
        />
        <MainWindow>
            {currentOpenTab === 'FORM' && 
                <Form 
                    setFormValues={setFormValues}
                    handleOpenTab={handleOpenTab}
                    handleSaveClick={handleSaveClick}
                />
            }
            {currentOpenTab === 'SETTINGS' &&
                <Settings 
                
                />
            }
            {currentOpenTab === 'DASHBOARD' &&
                <Dashboard 
                    handleSelectingProject={handleSelectingProject}
                    projects={projects}
                />
            }
            {currentOpenTab === 'PROJECTVIEW' && 
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

