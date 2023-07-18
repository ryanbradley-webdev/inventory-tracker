import axios from 'axios'

export async function getInvoices() {
    const invoices = axios.get('http://localhost:3000')
        .then(res => {
            return res.data
        })
        .catch(e => {
            console.log(e)

            return 'Failed to fetch'
        })

    return invoices
}