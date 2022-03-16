import axios from 'axios'
import React, { useState } from 'react'

export default function CustomerForm({ getCustomers }) {
    const [customerName, setCustomerName] = useState('')

    // add a customer to db
    const saveCustomer = async (e) => {
        e.preventDefault()
        const customerData = { name: customerName }
        try {
            await axios.post('http://localhost:3001/customer', customerData)
            getCustomers(); //make http req to rerender page
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <form action="" onSubmit={saveCustomer}>
                <input
                    type="text"
                    placeholder='Customer Name'
                    onChange={(e) => setCustomerName(e.target.value)}
                    value={customerName}
                />
                <button type="submit">Save New Customer</button>
            </form>
        </div>
    )
}
