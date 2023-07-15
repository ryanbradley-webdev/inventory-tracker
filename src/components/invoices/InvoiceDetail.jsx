import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../BackButton'
import StatusChip from '../StatusChip'
import DeleteInvoiceModal from './DeleteInvoiceModal'
import InvoiceOptions from './InvoiceOptions'
import { formatCurrency } from '../../../lib/formatCurrency'
import styles from './invoices.module.css'

export default function InvoiceDetail({ invoices, deleteInvoice, updateInvoice, toggleEditInvoiceForm }) {
    const { id } = useParams()

    const [deleteModalVisible, setDeleteModalVisible] = useState(false)

    const invoice = invoices.find(invoice => invoice.id.toLowerCase() == id.toLowerCase())

    const { 
        status, 
        description, 
        senderAddress, 
        clientAddress, 
        createdAt, 
        paymentDue, 
        clientName, 
        clientEmail, 
        items, 
        total 
    } = invoice

    const navigate = useNavigate()

    function handleClick() {
        navigate(-1)
    }

    function toggleDeleteModal() {
        setDeleteModalVisible(!deleteModalVisible)
    }

    function handleDelete() {
        deleteInvoice(id)
        navigate('/')
    }

    function markAsPaid() {
        invoice.status = 'paid'
        updateInvoice(invoice)
    }

    return (
        <section className={styles.wrapper}>
            <BackButton handleClick={handleClick} />
            <div>
                <span>Status</span>
                <StatusChip status={status} />
                <div className='exclude-mobile'>
                    <InvoiceOptions 
                        openForm={toggleEditInvoiceForm} 
                        handleDelete={toggleDeleteModal} 
                        markAsPaid={markAsPaid} 
                    />
                </div>
            </div>
            <div>
                <div>
                    <h5>#{invoice.id}</h5>
                    <p>{description}</p>
                </div>
                <div>
                    <p>{senderAddress.street}</p>
                    <p>{senderAddress.city}</p>
                    <p>{senderAddress.postCode}</p>
                    <p>{senderAddress.country}</p>
                </div>
            </div>
            <div>
                <div>
                    <h6>Invoice Date</h6>
                    <p>{createdAt}</p>
                    <h6>Payment Due</h6>
                    <p>{paymentDue}</p>
                </div>
                <div>
                    <h6>Bill To</h6>
                    <p>{clientName}</p>
                    <p>{clientAddress.street}</p>
                    <p>{clientAddress.city}</p>
                    <p>{clientAddress.postCode}</p>
                    <p>{clientAddress.country}</p>
                </div>
                <div>
                    <h6>Sent To</h6>
                    <p>{clientEmail}</p>
                </div>
                <div>
                    <p>Item Name</p>
                    <p>QTY.</p>
                    <p>Price</p>
                    <p>Total</p>
                    {items.length > 0 && items.map(item => (
                        <div key={crypto.randomUUID()}>
                            <p>{item.name}</p>
                            <p>{item.quantity}</p>
                            <p>${formatCurrency(item.price)}</p>
                            <p>${formatCurrency(item.total)}</p>
                        </div>
                    ))}
                    <div>
                        <span>Amount Due</span>
                        <span>${formatCurrency(total)}</span>
                    </div>
                </div>
            </div>
            <div className='include-mobile'>
                <InvoiceOptions 
                    openForm={toggleEditInvoiceForm} 
                    handleDelete={toggleDeleteModal} 
                    markAsPaid={markAsPaid} 
                    id={invoice.id}
                />
            </div>
            <DeleteInvoiceModal 
                id={id} 
                isVisible={deleteModalVisible} 
                closeModal={toggleDeleteModal} 
                deleteInvoice={handleDelete} 
            />
        </section>
    )
}