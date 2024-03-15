import { useState } from 'react';
import styles from '../assets/css/Projects.module.css';
import SidePanel from './SidePanel.jsx';
import Button from './buttons/Button.jsx';
import PanelButton from './buttons/PanelButton.jsx';

export default function Projects({ handleOpenTab, handleSelectingProject, activeButton, setActiveButton, projects}) {
    const handleClickButton = (project) => {
        handleSelectingProject(project);

        setActiveButton(project.name);
    }

    {/* Your projects section */}
    return <div className={styles.projects}>
        <h2 className='header' onClick={() => handleOpenTab(null)}>Your Projects</h2>
        <Button onClick={() => handleOpenTab('FORM')}>
            <span className='icon-plus'></span>
            Add Project
        </Button>
        <section className={styles.projectSection}>
            {projects.map(project => {
                return <PanelButton 
                    key={project.name} 
                    onClick={() => handleClickButton(project)}
                    isActive={activeButton === project.name ? true : false}
                    >
                        {project.name}
                </PanelButton>
            })}
        </section>
        <SidePanel 
            handleOpenTab={handleOpenTab}
            setActiveButton={setActiveButton}
            activeButton={activeButton}
        />

    </div>
}