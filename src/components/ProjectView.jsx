import { forwardRef } from 'react';
import styles from '../assets/css/ProjectView.module.css';

const ProjectView = forwardRef(function ProjectView({ handleDeletingProject, handleClearingTask, handleAddingTask, selectedProject }, ref) {

    {/* Project selected */}
    return <div className={styles.projectSelected}>
        <button className={styles.deleteButton} onClick={() => handleDeletingProject(selectedProject)}>Delete Project</button>
        <h2>{selectedProject.name}</h2>
        <span>{selectedProject.dueDate}</span>
        <p>{selectedProject.description}</p>
        <hr></hr>
        <h2>Tasks</h2>
        <input type='text' ref={ref}></input>
        <button onClick={handleAddingTask}>Add task</button>

        {selectedProject.tasks.length <= 0 ? <p>This project does not have any tasks yet.</p> 
            :
            <div className={styles.projectTasks}>
                {selectedProject.tasks.map(task => {
                    return <div className={styles.task} key={task}>
                        <p>{task}</p>
                        <button onClick={() => handleClearingTask(task, selectedProject.tasks)}>Clear</button>
                    </div>
                })}
            </div>
        }
    </div>
})

export default ProjectView;