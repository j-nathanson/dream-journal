import React from 'react'
import moment from 'moment'

export default function DreamList({ journal }) {

    const renderJournal = () => {
        return journal.map((entry, i) => {
            return <div key={i} className='border'>
               <h3>{moment(entry.date).format('MMMM Do YYYY')}</h3> 
               <h5>{entry.title}</h5>
                {entry.description}

            </div>
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
