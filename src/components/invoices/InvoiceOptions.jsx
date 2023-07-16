import { useSearchParams } from "react-router-dom"
import Button from "../Button"
import styles from './invoices.module.css'

export default function InvoiceOptions({ openForm, handleDelete, markAsPaid }) {
    const [searchParams, setSearchParams] = useSearchParams()

    function toggleEditInvoiceForm() {
        setSearchParams({
            edit: true
        })
        openForm()
    }

    return (
        <div className={styles.btn_div}>
            <Button onClick={toggleEditInvoiceForm} variant='edit'>
                Edit
            </Button>
            <Button onClick={handleDelete} variant='delete'>
                Delete
            </Button>
            <Button onClick={markAsPaid} variant='paid'>
                Mark as Paid
            </Button>
        </div>
    )
}