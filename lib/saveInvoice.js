import axios from "axios"

export async function saveInvoice(invoice) {
    if (!invoice) {
        return
    }

    try {
        const { data } = await axios.get(import.meta.env.VITE_SERVER_URL + invoice.invoiceId)

        if (data === 'found') {
            const updateRes = await axios.patch(import.meta.env.VITE_SERVER_URL + invoice.invoiceId, invoice)

            if (updateRes.status === 200) {
                return 'success'
            } else {
                return 'failed to update'
            }
        } else if (data === 'not found') {
            const postRes = await axios.post(import.meta.env.VITE_SERVER_URL, invoice)

            if (postRes.status === 201) {
                return 'invoice added'
            } else {
                return 'failed to add invoice'
            }
        }
    } catch (e) {
        return 'error'
    }
}