export default function Dashboard({ handleSelectingProject, projects }) {
    return <div>
        <h2 className='header'>Dashboard</h2>
        <div className="dashboard">
            {projects.length > 0 ? 
                projects.map(project => {
                    return <div
                        className='dashboard-project' 
                        key={project.name} 
                        onClick={() => handleSelectingProject(project)}
                        >
                            <div className='dashboard-project-name'>{project.name}</div>
                            <div className='dashboard-project-description'>{project.description}</div>
                            <div className='dashboard-project-date'>{project.dueDate}</div>
                            <div className='dashboard-project-taskcount'>Tasks: {project.tasks.length}</div>
                    </div>
                })
                :
                <p>You do not have any projects.</p>
            }
        </div>
    </div>
}