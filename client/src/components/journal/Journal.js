import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import DreamForm from './DreamForm'
import DreamList from './DreamList'

export default function Journal() {
    const [journal, setJournal] = useState([])
    const [filter, setFilter] = useState('all')

    // get all customers from db, set local array
    const getJournal = async () => {
        const journalRes = await axios.get('http://localhost:3001/journal')
        setJournal(journalRes.data)
    }

    const updateEntry = async (entryId, newTitle, newDescription, newRating, newTag) => {
        const updatedEntry = { entryId, newTitle, newDescription, newRating, newTag }
        await axios.put('http://localhost:3001/journal', updatedEntry)
        getJournal()
    }

    const deleteEntry = async (entryId) => {
        const toDelete = { entryId }
        await axios.delete('http://localhost:3001/journal', { data: toDelete })
        getJournal()
    }

    const handleChange = (e) => {
        const month = e.target.value
        setFilter(month)
    }

    useEffect(() => {
        getJournal()
    }, [])

    return (
        <div className='journal-container pt-4'>
            <DreamForm getJournal={getJournal} />
            {
                journal.length > 0 && (
                    <Container className='my-5'>
                        <Form.Select onChange={handleChange} value={filter} className='text-dark'>
                            <option value='all'>All Months</option>
                            <option value='01'>January</option>
                            <option value='02'>February</option>
                            <option value='03'>March</option>
                            <option value='04'>April</option>
                            <option value='05'>May</option>
                            <option value='06'>June</option>
                            <option value='07'>July</option>
                            <option value='08'>August</option>
                            <option value='09'>September</option>
                            <option value='10'>October</option>
                            <option value='11'>November</option>
                            <option value='12'>December</option>
                        </Form.Select>
                    </Container>
                )
            }
            <DreamList
                journal={
                    filter === 'all'
                        ? journal
                        : journal.filter(entry => filter === entry.date.slice(5, 7))
                }
                updateEntry={updateEntry}
                deleteEntry={deleteEntry}
            />
        </div>
    )
}

