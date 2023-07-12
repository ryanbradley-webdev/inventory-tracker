import Button from "../Button"

export default function InvoiceOptions({ openForm, handleDelete, markAsPaid }) {
    return (
        <>
            <Button onClick={openForm}>
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