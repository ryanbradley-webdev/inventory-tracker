import axios from "axios"

export async function deleteInvoiceById(id) {
    try {
        const res = await axios.delete(import.meta.env.VITE_SERVER_URL + id)

        if (res.status !== 204) {
            return 'failed to delete'
        }

        return 'deleted invoice'
    } catch (e) {
        return 'error'
    }
}