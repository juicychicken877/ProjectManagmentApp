import styles from '../assets/css/Projects.module.css';

export default function Projects({ handleClosingForm, handleOpeningForm, handleSelectingProject, projects}) {
    {/* Your projects section */}
    return <div className={styles.projects}>
        <h2 onClick={handleClosingForm}>Your Projects</h2>
        <button onClick={handleOpeningForm}>+ Add Project</button>
        <section className={styles.projectSection}>
            {projects.map(project => {
                return <button key={project.name} onClick={() => handleSelectingProject(project)}>{project.name}</button>
            })}
        </section>
    </div>
}