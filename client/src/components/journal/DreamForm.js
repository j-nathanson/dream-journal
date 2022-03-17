import axios from 'axios'
import React, { useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import moment from 'moment'

export default function DreamForm({ getJournal }) {

    const setDateFunction = (value) => {
        setDate(moment(value).format('YYYY-MM-DD'))
    }
    const [title, setTitle] = useState('')
    const [date, setDate] = useState(moment().subtract(1, 'days').format('YYYY-MM-DD'))
    const [description, setDescription] = useState('')

    // add an entry to db
    const saveDream = async (e) => {
        e.preventDefault()
        const dreamData = {
            title,
            date,
            description
        }
        try {
            await axios.post('http://localhost:3001/journal', dreamData)
            getJournal(); //make http req to rerender page
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <form action="" onSubmit={saveDream}>
                <Container className="d-flex flex-column ">
                    <Row className='text-center my-2'>
                        <h2>dream log</h2>
                    </Row>
                    <Row className='justify-content-around align-items-center mb-3'>
                        <Col xs={5} className=' d-flex flex-column p-0'>
                            <label htmlFor="">Title your dream</label>
                            <input
                                type="text"
                                placeholder='weird tree again'
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </Col>
                        <Col xs={5} className=' d-flex flex-column p-0'>
                            <label htmlFor="">date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDateFunction(e.target.value)}
                            />

                        </Col>
                    </Row>
                    <Row className='align-items-center justify-content-center mb-3'>
                        <textarea
                            id='textarea'
                            className='col-11'
                            onChange={(e) => setDescription(e.target.value)} placeholder='describe your dream to the best of your ability'
                            rows="2"
                        />
                    </Row>
                    <Row className='align-items-center justify-content-center '>
                        <button className='col-6' type="submit">Add Entry to Your Journal</button>
                    </Row>
                </Container>
            </form>
        </div>
    )
}
