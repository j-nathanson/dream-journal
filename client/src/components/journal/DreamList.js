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
    const [newRating, setNewRating] = useState(rating)
    const [newTag, setNewTag] = useState(tag)

    // modal state
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    // Update an entry
    const submitEdit = (e) => {
        e.preventDefault()
        updateEntry(_id, newTitle, newDescription, newRating, newTag)
        setToggle(!toggle)

    }

    const handleDelete = () => {
        handleShow()
        deleteEntry(_id)
    }
    return (
        <Container className='p-4 mb-4 entry-container'>
            <Form onSubmit={submitEdit}>
                <Row className='mb-4'>
                    <Col xs={12}>
                        <h2>{moment(date).format('dddd, MMMM Do, YYYY')}</h2>
                    </Col>
                </Row>
                <Row className='mb-4 align-items-end'>
                    <Col xs={8} >
                        <ContentEditable
                            html={toggle ? `"${title}"` : newTitle} // 
                            disabled={toggle} //boolean to edit
                            onChange={(e) => setNewTitle(e.target.value)}
                            tagName='h3'
                            className='m-0 pt-2 px-1'
                            style={{
                                border: !toggle ? '1.5px solid white' : '', borderRadius: '5px'
                            }}

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
                            readonly={toggle}
                            initialRating={newRating}
                            onClick={num => setNewRating(num)}
                        />
                    </Col>
                </Row>
                <ContentEditable
                    html={toggle ? description : newDescription}
                    disabled={toggle}
                    onChange={(e) => setNewDescription(e.target.value)}
                    tagName='p'
                    className='pt-2 px-1'
                    style={{
                        border: !toggle ? '1.5px solid white' : '', borderRadius: '5px'
                    }}
                />
                {toggle && (<p>Tag: {tag}</p>)}

                {!toggle && (
                    <Form.Group>
                        <Form.Select
                            id="dreamTags"
                            value={newTag}
                            onChange={e => setNewTag(e.target.value)}
                            className='mb-3 edit-tag-dropdown'
                        >
                            <option value='normal'>normal</option>
                            <option value='daydream'>daydream</option>
                            <option value='false-awakening'>false-awakening</option>
                            <option value='lucid dream'>lucid dream</option>
                            <option value='nightmare'>nightmare</option>
                            <option value='vivid'>vivid</option>
                        </Form.Select>
                    </Form.Group>
                )}
                <Form.Group>
                    <Row className='justify-content-start align-items-center  p-2'>
                        {toggle && (
                            <>
                                <Button variant='primary' onClick={() => setToggle(!toggle)} className='col-3' >
                                    <Icon path={mdiLeadPencil}
                                        size={.6}
                                        color="white"
                                        title='edit'

                                    />
                                    edit
                                </Button>
                                <Button variant='primary' onClick={() => handleShow()} className='col-3 m-1'>
                                    <Icon path={mdiTrashCanOutline}
                                        size={.6}
                                        color="white"
                                    />
                                    delete
                                </Button>
                            </>

                        )}
                        {!toggle && (
                            <>
                                <Button variant='primary' onClick={() => setToggle(!toggle)} className='col-4'>
                                    <Icon path={mdiCancel}
                                        size={.6}
                                        color="white"
                                    />
                                    cancel
                                </Button>
                                <Button type='submit' variant='primary' className='col-4 m-1'>
                                    <Icon path={mdiPlaylistCheck}
                                        size={.6}
                                        color="white"
                                    />
                                    submit
                                </Button>
                            </>
                        )}
                    </Row>
                </Form.Group>
            </Form>

            <Modal show={show} onHide={handleShow} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-danger'>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    Are you sure you want to delete the dream:
                    <br /><br />
                    <strong><h1 className='text-black'>"{newTitle}"?</h1></strong>
                </Modal.Body>
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

    if (journal.length === 0) {
        return (
            <div className='empty-fill-div' />
        )
    }

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
        <div className='w-100 pb-3'>
            {renderJournal().reverse()}
        </div>
    )
}