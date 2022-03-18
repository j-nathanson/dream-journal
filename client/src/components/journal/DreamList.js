import React, { useState } from 'react'
import moment from 'moment'
import ContentEditable from 'react-contenteditable'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import Rating from 'react-rating'
import Icon from '@mdi/react'
import { mdiBrightness2, mdiCancel, mdiPlaylistCheck, mdiLeadPencil, mdiTrashCanOutline } from '@mdi/js'



const Entry = ({ entry, updateEntry, deleteEntry }) => {

    const { _id, title, rating, date, description, tag } = entry
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
        <Container className='p-3'>
            <Form onSubmit={submitEdit}>
                <Row className='mb-4'>
                    <Col xs={7}>
                        <h2>{moment(date).format('dddd, MMMM Do, YYYY')}</h2>
                    </Col>
                    <Col className='p-0 d-flex justify-content-end align-items-start'>
                        {toggle && (
                            <div>
                                <Button variant='success' onClick={() => setToggle(!toggle)} className='p-2'>
                                    <Icon path={mdiLeadPencil}
                                        size={.8}
                                        color="white"
                                        title='edit'

                                    />
                                    edit
                                </Button>
                                <Button variant='danger' className='p-2' onClick={() => handleShow()}>
                                    <Icon path={mdiTrashCanOutline}
                                        size={.8}
                                        color="white"
                                    />
                                    delete
                                </Button>
                            </div>
                        )}
                        {!toggle && (
                            <div>
                                <Button variant='warning' onClick={() => setToggle(!toggle)} className='p-2'>
                                    <Icon path={mdiCancel}
                                        size={.8}
                                        color="black"
                                    />
                                    cancel
                                </Button>
                                <Button type='submit' variant='info' className='p-2'>
                                    <Icon path={mdiPlaylistCheck}
                                        size={.8}
                                        color="black"
                                    />
                                    submit
                                </Button>
                            </div>
                        )}
                    </Col>
                </Row>
                <Row className='mb-4'>
                    <Col xs={8}>
                        <ContentEditable
                            html={newTitle} // innerHTML of the editable div
                            disabled={toggle}  // use true to disable editing     
                            onChange={(e) => setNewTitle(e.target.value)} // handle innerHTML change
                            tagName='h3'
                        />
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Rating
                            id="rating"
                            emptySymbol={
                                <Icon path={mdiBrightness2}
                                    size={.8}
                                    color="white"
                                />}
                            fullSymbol={
                                <Icon
                                    path={mdiBrightness2}
                                    size={.8}
                                    color="gold"
                                />}
                            fractions={2}
                            readonly={true}
                            initialRating={rating}
                        />
                    </Col>
                </Row>
                <ContentEditable
                    html={newDescription}
                    disabled={toggle}
                    onChange={(e) => setNewDescription(e.target.value)}
                    tagName='p'
                />
                <p>Tag: {tag}</p>
            </Form>

            <Modal show={show} onHide={handleShow}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-danger'>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the dream: " <strong>{newTitle}"</strong>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShow}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete Dream
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default function DreamList({ journal, updateEntry, deleteEntry }) {
    const renderJournal = () => {
        return journal.map((entry, i) => {
            return (
                <Entry
                    key={i}
                    entry={entry}
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

// _id={_id}
// title={title}
// rating={rating}
// date={date}
// description={description}