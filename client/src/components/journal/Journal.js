import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DreamForm from './DreamForm'
import DreamList from './DreamList'

export default function Journal() {
    const [journal, setJournal] = useState([])

    // get all customers from db, set local array
    const getJournal = async () => {
        const journalRes = await axios.get('http://localhost:3001/journal')
        setJournal(journalRes.data)
    }

    const updateEntry = async (entryId, newTitle, newDescription) => {
        const updatedEntry = { entryId, newTitle, newDescription }
        await axios.put('http://localhost:3001/journal', updatedEntry)
        getJournal()
    }
    useEffect(() => {
        getJournal()
    }, [])
    return (
        <div>
            <DreamForm getJournal={getJournal} />
            <DreamList journal={journal} updateEntry={updateEntry} />
        </div>
    )
}

