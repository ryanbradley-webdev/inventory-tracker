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
            <BackButton handleClick={() => navigate(-1)} />
            <section className={styles.status}>
                <span>Status</span>
                <StatusChip status={status} />
                <div className='exclude-mobile'>
                    <InvoiceOptions 
                        openForm={toggleEditInvoiceForm} 
                        handleDelete={toggleDeleteModal} 
                        markAsPaid={markAsPaid} 
                    />
                </div>
            </section>
            <section className={styles.content}>
                <div className={styles.invoice_info_address}>
                    <div className={styles.invoice_info}>
                        <h5>#{invoice.id}</h5>
                        <p>{description}</p>
                    </div>
                    <div className={styles.address}>
                        <p>{senderAddress.street}</p>
                        <p>{senderAddress.city}</p>
                        <p>{senderAddress.postCode}</p>
                        <p>{senderAddress.country}</p>
                    </div>
                </div>
                <div className={styles.invoice_client_info}>
                    <div className={styles.invoice_dates}>
                        <h6>Invoice Date</h6>
                        <p>{createdAt}</p>
                        <h6>Payment Due</h6>
                        <p>{paymentDue}</p>
                    </div>
                    <div className={styles.client_address}>
                        <h6>Bill To</h6>
                        <p>{clientName}</p>
                        <p>{clientAddress.street}</p>
                        <p>{clientAddress.city}</p>
                        <p>{clientAddress.postCode}</p>
                        <p>{clientAddress.country}</p>
                    </div>
                    <div className={styles.client_email}>
                        <h6>Sent To</h6>
                        <p>{clientEmail}</p>
                    </div>
                </div>
                <div className={styles.invoice_items}>
                    {items.length > 0 && items.map(item => (
                        <div key={crypto.randomUUID()} className={styles.item}>
                            <div>                                
                                <p>{item.name}</p>
                                <p>{item.quantity} x ${formatCurrency(item.price)}</p>
                            </div>
                            <p>${formatCurrency(item.total)}</p>
                        </div>
                    ))}
                    <div className={styles.item_amount_due}>
                        <span>Grand Total</span>
                        <span>$ {formatCurrency(total)}</span>
                    </div>
                </div>
            </section>
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