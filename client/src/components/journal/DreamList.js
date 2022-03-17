import React, { useRef, useState } from 'react'
import moment from 'moment'
import ContentEditable from 'react-contenteditable'


const Entry = ({ _id, date, title, description, updateEntry }) => {

    const setToggleFunction = (e) => {
        setToggle(!toggle)
        e.preventDefault()
    }

    const [toggle, setToggle] = useState(true)

    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)

    const submitEdit = (e) => {
        e.preventDefault()
        updateEntry(_id, newTitle, newDescription)
        setToggle(!toggle)

    }
    return (
        <div className='border'>
            <h3>{moment(date).format('MMMM Do YYYY')}</h3>
            <form onSubmit={submitEdit}>
                <ContentEditable
                    html={newTitle} // innerHTML of the editable div
                    disabled={toggle}  // use true to disable editing     
                    onChange={(e) => setNewTitle(e.target.value)} // handle innerHTML change
                    tagName='h5'
                />
                <ContentEditable
                    html={newDescription}
                    disabled={toggle}
                    onChange={(e) => setNewDescription(e.target.value)}
                    tagName='p'
                />
                {toggle && <button onClick={setToggleFunction}>edit</button>}
                {!toggle && (
                    <>
                        <button onClick={() => setToggle(!toggle)}>cancel</button>
                        <button type='submit'>submit</button>
                    </>
                )}
            </form>
        </div>
    )
}

export default function DreamList({ journal, updateEntry }) {
    const renderJournal = () => {
        return journal.map((entry, i) => {
            const { _id, title, date, description } = entry
            return (
                <Entry
                    key={i}
                    _id={_id}
                    title={title}
                    date={date}
                    description={description}
                    updateEntry={updateEntry}
                />
            )

        })
    }
    return (
        <div>
            {renderJournal().reverse()}
        </div>
    )
}
