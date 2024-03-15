import styles from '../assets/css/NoProjectSelected.module.css';
import logo from '../assets/images/no-projects.png';
import Button from './buttons/Button.jsx';

export default function NoProjectSelected({ handleOpenTab }) {
    {/* No project selected */}
    return <div className={styles.notSelected}>
        <img src={logo} alt='logo'></img>
        <h2>No project selected</h2>
        <p>Select a project or start with a new one</p>
        <Button onClick={() => handleOpenTab('FORM')}>
            <span className='icon-plus'></span>
            Create new project
        </Button>
    </div>
}