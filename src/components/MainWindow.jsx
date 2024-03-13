import styles from '../assets/css/MainWindow.module.css';

export default function MainWindow({children}) {
    return <div className={styles.mainWindow}>
        {children}
    </div>
}