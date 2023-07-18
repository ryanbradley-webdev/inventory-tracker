import axios from "axios"

export async function markInvoicePaid(id) {
    if (!id) {
        return 'no ID'
    }

    try {
        const res = await axios.patch('http://localhost:3000/mark-as-paid/' + id)

        if (res.status !== 200) {
            return 'failed to fetch'
        }

        return 'marked as paid'
    } catch (e) {
        return 'error'
    }
}