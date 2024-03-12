import styles from '../assets/css/NoProjectSelected.module.css';
import logo from '../assets/images/no-projects.png';

export default function NoProjectSelected({handleOpeningForm}) {
    {/* No project selected */}
    return <div className={styles.notSelected}>
        <img src={logo} alt='logo'></img>
        <h2>No project selected</h2>
        <p>Select a project or start with a new one</p>
        <button onClick={handleOpeningForm}>Create new project</button>
    </div>
}