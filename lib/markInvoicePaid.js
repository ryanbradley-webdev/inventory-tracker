import axios from "axios"

export async function markInvoicePaid(id) {
    if (!id) {
        return 'no ID'
    }

    try {
        const res = await axios.patch(import.meta.env.VITE_SERVER_URL + 'mark-as-paid/' + id)

        if (res.status !== 200) {
            return 'failed to fetch'
        }

        console.log(res)

        return 'marked as paid'
    } catch (e) {
        return 'error'
    }
}