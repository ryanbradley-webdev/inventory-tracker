import { useSearchParams } from "react-router-dom"
import Button from "../Button"

export default function InvoiceOptions({ openForm, handleDelete, markAsPaid }) {
    const [searchParams, setSearchParams] = useSearchParams()

    function toggleEditInvoiceForm() {
        setSearchParams({
            edit: true
        })
        openForm()
    }

    return (
        <>
            <Button onClick={toggleEditInvoiceForm}>
                Edit
            </Button>
            <Button onClick={handleDelete}>
                Delete
            </Button>
            <Button onClick={markAsPaid}>
                Mark as Paid
            </Button>
        </>
    )
}