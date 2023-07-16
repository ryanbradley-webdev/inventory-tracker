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
            <section className={`${styles.content} ${styles.accent_text}`}>
                <div className={styles.invoice_info_address}>
                    <div className={styles.invoice_info}>
                        <h5 className={styles.bold_text}><span>#</span>{invoice.id}</h5>
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
                        <div>
                            <h6 className={styles.accent_text}>Invoice Date</h6>
                            <p className={styles.bold_text}>{createdAt}</p>
                        </div>
                        <div>
                            <h6 className={styles.accent_text}>Payment Due</h6>
                            <p className={styles.bold_text}>{paymentDue}</p>
                        </div>
                    </div>
                    <div className={styles.client_address}>
                        <h6 className={styles.accent_text}>Bill To</h6>
                        <p className={styles.bold_text}>{clientName}</p>
                        <p>{clientAddress.street}</p>
                        <p>{clientAddress.city}</p>
                        <p>{clientAddress.postCode}</p>
                        <p>{clientAddress.country}</p>
                    </div>
                    <div className={styles.client_email}>
                        <h6 className={styles.accent_text}>Sent To</h6>
                        <p className={styles.bold_text}>{clientEmail}</p>
                    </div>
                </div>
                <div className={styles.invoice_items}>
                    {items.length > 0 && items.map(item => (
                        <div key={crypto.randomUUID()} className={styles.item}>
                            <div>                                
                                <p className={styles.bold_text}>{item.name}</p>
                                <p className={styles.item_price}>{item.quantity} x ${formatCurrency(item.price)}</p>
                            </div>
                            <p className={styles.bold_text}>${formatCurrency(item.total)}</p>
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