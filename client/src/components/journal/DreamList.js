import React, { useState } from 'react'
import moment from 'moment'
import ContentEditable from 'react-contenteditable'
import { Button, Modal } from 'react-bootstrap'


const Entry = ({ _id, date, title, description, updateEntry, deleteEntry }) => {

    const [toggle, setToggle] = useState(true)
    // same as properties in object for updateEntry
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)

    // modal state
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    // Update an entry
    const submitEdit = (e) => {
        e.preventDefault()
        updateEntry(_id, newTitle, newDescription)
        setToggle(!toggle)

    }

    const handleDelete = () => {
        handleShow()
        console.log(_id)
        deleteEntry(_id)
    }
    return (
        <div>
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
                {toggle && (
                    <div>
                        <Button varant='info' onClick={() => setToggle(!toggle)}>edit</Button>
                        <Button variant='danger' onClick={() => handleShow()}>delete</Button>
                    </div>
                )}
                {!toggle && (
                    <div>
                        <button onClick={() => setToggle(!toggle)}>cancel</button>
                        <button type='submit'>submit</button>
                    </div>
                )}
            </form>

            <Modal show={show} onHide={handleShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the dream entry: "{newTitle}"?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShow}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete Dream
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default function DreamList({ journal, updateEntry, deleteEntry }) {
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
                    deleteEntry={deleteEntry}
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
