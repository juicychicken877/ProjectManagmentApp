import { useImperativeHandle, useRef, useState, forwardRef } from 'react';
import styles from '../assets/css/ErrorDialog.module.css';
import Button from './buttons/Button.jsx';

const ErrorDialog = forwardRef(function ErrorDialog({}, ref) {
    const [errorText, setErrorText] = useState('Error');

    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open(text) {
                setErrorText(text);
                dialog.current.showModal();
            }
        }
    })

    return <dialog ref={dialog} className={styles.errorDialog}>
        <span className='icon-attention-circled'></span>
        <h4>{errorText}</h4>
        <form method='dialog'>
            <Button>I understand</Button>
        </form>
    </dialog>
})

export default ErrorDialog;