export default function PanelButton({children, isActive, ...props}) {
    return <button className={isActive ? 'panelButton buttonActive' : 'panelButton'} {...props}>
        {children}
    </button>
}