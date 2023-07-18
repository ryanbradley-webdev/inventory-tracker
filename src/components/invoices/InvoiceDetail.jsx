import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BackButton from '../BackButton'
import StatusChip from '../StatusChip'
import DeleteInvoiceModal from './DeleteInvoiceModal'
import InvoiceOptions from './InvoiceOptions'
import { formatCurrency } from '../../../lib/formatCurrency'
import styles from './invoices.module.css'
import { markInvoicePaid } from '../../../lib/markInvoicePaid'

const invoiceNotFound = {
    invoiceId: "",
    createdAt: "",
    paymentDue: "",
    description: "",
    paymentTerms: 1,
    clientName: "",
    clientEmail: "",
    status: "draft",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: ""
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: ""
    },
    items: [],
    total: 0
}

export default function InvoiceDetail({ invoices, deleteInvoice, updateInvoice, toggleEditInvoiceForm }) {
    const { id } = useParams()

    const [deleteModalVisible, setDeleteModalVisible] = useState(false)

    const invoice = invoices.find(invoice => invoice.invoiceId.toLowerCase() == id.toLowerCase())

    const { 
        invoiceId,
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
    } = invoice || invoiceNotFound

    const navigate = useNavigate()

    function toggleDeleteModal() {
        setDeleteModalVisible(!deleteModalVisible)
    }

    function handleDelete() {
        deleteInvoice(invoiceId)
        navigate('/')
    }

    function markAsPaid() {
        updateInvoice({
            ...invoice,
            status: 'paid'
        })

        markInvoicePaid(invoiceId)
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }

    return (
        <section className={styles.wrapper}>
            <Link to='/'>
                <BackButton/>
            </Link>
            <section className={styles.status}>
                <div className={styles.status_icon}>
                    <span>Status</span>
                    <StatusChip status={status} />
                </div>
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
                        <h5 className={styles.bold_text}><span>#</span>{invoiceId}</h5>
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
                    id={invoiceId}
                />
            </div>
            <DeleteInvoiceModal 
                id={invoiceId} 
                isVisible={deleteModalVisible} 
                closeModal={toggleDeleteModal} 
                deleteInvoice={handleDelete} 
            />
        </section>
    )
}