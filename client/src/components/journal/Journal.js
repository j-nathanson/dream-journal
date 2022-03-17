import axios from 'axios'
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

    useEffect(() => {
        getJournal()
    }, [])
    return (
        <div>
            <DreamForm getJournal={getJournal} />
            <DreamList journal={journal} />
        </div>
    )
}
