import styles from '../assets/css/Form.module.css';
import Button from './buttons/Button.jsx';

export default function Form({ handleOpenTab, setFormValues, handleSaveClick }) {
    /* Input onChange methods */
    const changeName = (eventTarget) => {
        setFormValues(prevFormValues => {
            return {
                ...prevFormValues,
                nameInput: eventTarget.value
            }
        })
    }
    const changeDescription = (eventTarget) => {
        setFormValues(prevFormValues => {
            return {
                ...prevFormValues,
                descriptionInput: eventTarget.value
            }
        })
    }
    const changeDate = (eventTarget) => {
        setFormValues(prevFormValues => {
            return {
                ...prevFormValues,
                dateInput: eventTarget.value
            }
        })
    }
    {/* Project creation form */}
    return <div>
        <section className={styles.buttons}>
            <Button onClick={() => handleOpenTab(null)}>Cancel</Button>
            <Button onClick={() => handleSaveClick()}>Save</Button>
        </section>
        <form>
            <label>Title</label>
            <input type='text' onChange={event => changeName(event.target)}></input>
            <label>Description</label>
            <textarea onChange={event => changeDescription(event.target)}></textarea>
            <label>Due date</label>
            <input type='date' onChange={event => changeDate(event.target)}></input>
        </form>
    </div>
}