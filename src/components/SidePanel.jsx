import styles from '../assets/css/SidePanel.module.css'
import PanelButton from './buttons/PanelButton.jsx'

export default function SidePanel({ handleOpenTab, setActiveButton, activeButton }) {

    const handleClickButton = (tab) => {
        handleOpenTab(tab);

        setActiveButton(tab);
    }

    return <menu className={styles.sidePanel}>
        <PanelButton 
            onClick={() => handleClickButton('DASHBOARD')}
            isActive={activeButton === 'DASHBOARD' ? true : false}
        >
            <span className='icon-home'></span>
            Dashboard
        </PanelButton>
        <PanelButton 
            onClick={() => handleClickButton('SETTINGS')}
            isActive={activeButton === 'SETTINGS' ? true : false}
        >
            <span className='icon-cog'></span>
            Settings
        </PanelButton>
    </menu>
}