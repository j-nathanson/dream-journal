import axios from 'axios'
import React, { useState } from 'react'
import { Container, Col, Row, Button, FormLabel, Form } from 'react-bootstrap'
import moment from 'moment'
import Icon from "@mdi/react";
import Rating from "react-rating";
import { mdiBrightness2 } from "@mdi/js";

export default function DreamForm({ getJournal }) {

    const setDateFunction = (value) => {
        setDate(moment(value).format('YYYY-MM-DD'))
    }
    const [title, setTitle] = useState('')
    const [date, setDate] = useState(moment().subtract(1, 'days').format('YYYY-MM-DD'))
    const [rating, setRating] = useState(3)
    const [tag, setTag] = useState('normal')
    const [description, setDescription] = useState('')

    // add an entry to db
    const saveDream = async (e) => {
        e.preventDefault()
        const dreamData = {
            title,
            date,
            rating,
            description,
            tag
        }
        try {
            await axios.post('http://localhost:3001/journal', dreamData)
            getJournal(); //make http req to rerender page
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container className="d-flex flex-column p-5 entry-form-container mb-4">
            <Form action="" onSubmit={saveDream}>
                <Row className='text-center mb-2'>
                    <h2>How was your dream last night?</h2>
                </Row>
                <Row className='justify-content-around align-items-center mb-3'>
                    <Col className=' d-flex flex-column p-0'>
                        <Form.Group>
                            <Form.Label htmlFor="">Title your dream</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='weird tree again'
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='justify-content-between mb-4'>
                    <Col xs={5} className=' d-flex flex-column p-0'>
                        <Form.Group>
                            <Form.Label htmlFor="date">Date</Form.Label>
                            <Form.Control
                                id='date'
                                type="date"
                                value={date}
                                onChange={(e) => setDateFunction(e.target.value)}
                                className='px-0 text-muted'
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={7} className='d-flex flex-column align-items-end text-center'>
                        <FormLabel htmlFor="rating" className='align-self-end'>Rate your dream</FormLabel>
                        <Rating
                            id="rating"
                            emptySymbol={
                                <Icon path={mdiBrightness2}
                                    size={1.3}
                                    color="white"
                                />}
                            fullSymbol={
                                <Icon
                                    path={mdiBrightness2}
                                    size={1.3}
                                    color="gold"
                                />}
                            fractions={2}
                            initialRating={rating}
                            value={rating}
                            onClick={num => setRating(num)}
                        />
                    </Col>
                </Row>
                <Row className='mb-4 '>
                    <Col className='p-0'>
                        <Form.Group>
                            <Form.Control as="textarea"
                                id='textarea'
                                onChange={(e) => setDescription(e.target.value)} placeholder='describe your dream to the best of your ability'
                                rows="2"
                                className='w-100'
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='justify-content-center mb-4'>
                    <Col xs={7} md={6}>
                        <FormLabel className=''>Add or create a tag for your dream</FormLabel>
                    </Col>
                    <Col xs={5} className=' p-0'>
                        <Form.Group>
                            <Form.Select
                                id="dreamTags"
                                value={tag}
                                onChange={e => setTag(e.target.value)}
                                className='text-muted'
                            >
                                <option value='normal'>normal</option>
                                <option value='daydream'>daydream</option>
                                <option value='false-awakening'>false-awakening</option>
                                <option value='lucid dream'>lucid dream</option>
                                <option value='nightmare'>nightmare</option>
                                <option value='vivid'>vivid</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='align-items-center '>
                    <Button variant='warning' className='col' type="submit">Add Entry to Your Journal</Button>
                </Row>
            </Form>
        </Container>
    )
}
