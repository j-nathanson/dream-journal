import axios from 'axios'
import React, { useState } from 'react'

export default function DreamForm({ getJournal }) {
    const [dream, setEntry] = useState('')

    // add an entry to db
    const saveDream = async (e) => {
        e.preventDefault()
        const dreamData = { name: dream }
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
                <input
                    type="text"
                    placeholder='Dream Log'
                    onChange={(e) => setEntry(e.target.value)}
                    value={dream}
                />
                <button type="submit">Add Entry to Your Journal</button>
            </form>
        </div>
    )
}
