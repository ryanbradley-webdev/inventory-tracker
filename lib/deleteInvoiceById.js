import axios from "axios"

export async function deleteInvoiceById(id) {
    try {
        const res = await axios.delete('http://localhost:3000/' + id)

        if (res.status !== 204) {
            return 'failed to delete'
        }

        return 'deleted invoice'
    } catch (e) {
        return 'error'
    }
}