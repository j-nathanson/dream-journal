import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomerForm from './CustomerForm'
import CustomerList from './CustomerList'

export default function Customers() {
    const empty = []
    const [customers, setCustomers] = useState(empty)

    // get all customers from db, set local array
    const getCustomers = async () => {
        const customersRes = await axios.get('http://localhost:3001/customer')
        setCustomers(customersRes.data)
    }

    useEffect(() => {
        getCustomers()
    }, [])
    return (
        <div>
            <CustomerForm getCustomers={getCustomers}/>
            <CustomerList customers={customers} />
        </div>
    )
}
