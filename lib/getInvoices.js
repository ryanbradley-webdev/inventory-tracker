import axios from 'axios'

export async function getInvoices() {
    const invoices = axios.get(import.meta.env.VITE_SERVER_URL)
        .then(res => {
            return res.data
        })
        .catch(e => {
            console.log(e)

            return 'Failed to fetch'
        })

    return invoices
}