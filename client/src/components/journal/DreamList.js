import React from 'react'

export default function DreamList({ journal }) {

    const renderJournal = () => {
        return journal.map((entry, i) => {
            return <li key={i}>{entry.name}</li>
        })
    }
    return (
        <div>
            <ul>
                {renderJournal()}
            </ul>
        </div>
    )
}
