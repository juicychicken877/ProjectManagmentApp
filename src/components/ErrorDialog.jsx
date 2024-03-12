import { useImperativeHandle, useRef, useState, forwardRef } from 'react';

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

    return <dialog ref={dialog} className='errorDialog'>
        <h4>{errorText}</h4>
        <form method='dialog'>
            <button>OK</button>
        </form>
    </dialog>
})

export default ErrorDialog;