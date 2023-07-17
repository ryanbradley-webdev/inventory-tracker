import { useEffect, useState } from "react"
import Button from "../Button"
import FormItem from "./FormItem"
import PlusIcon from "../../assets/PlusIcon"
import { useSearchParams } from "react-router-dom"
import BackButton from "../BackButton"
import styles from './form.module.css'
import Address from "./Address"
import { initialAddress, initialItem } from "./initialInfo"
import { calculateDueDate } from "../../../lib/calculateDueDate"
import { letterArr } from '../../../lib/letterArr'

export default function Form({ invoiceIds, hideForm, isVisible, invoice, generateId }) {
    const [searchParams, setSearchParams] = useSearchParams()

    const [senderAddress, setSenderAddress] = useState(initialAddress)
    const [clientAddress, setClientAddress] = useState(initialAddress)
    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [createdAt, setCreatedAt] = useState(new Date().toISOString().slice(0, 10))
    const [paymentTerms, setPaymentTerms] = useState(1)
    const [description, setDescription] = useState('')
    const [items, setItems] = useState([initialItem])

    function generateId() {
        let newId = letterArr[Math.floor(Math.random() * 26)]
  
        newId += letterArr[Math.floor(Math.random() * 26)]
  
        newId += Math.floor(Math.random() * 10000)
  
        return invoiceIds?.includes(newId) ? generateId() : newId
    }

    const localStyles = { 
        modal: {
            position: 'absolute', 
            inset: '0',
            bottom: 'auto', 
            transform: isVisible ? '' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
            background: '#00000099'
        },
        button: {
            outline: 'transparent',
            background: 'none',
            border: 'none'
        },
        text: { 
            marginLeft: '1.5rem',
            color: 'var(--color-text-primary)',
            fontSize: '15px',
            fontWeight: 'bold',
            letterSpacing: '-0.25px'
        },
        h4: {
            fontSize: '15px',
            fontWeight: '700',
            letterSpacing: '-0.25px',
            color: 'var(--color-purple-primary)'
        }
    }

    function closeForm() {
        setSearchParams()
        hideForm()
    }

    function calculateTotal() {
        let total = 0

        items.forEach(item => {
            total += item.total
        })

        return total
    }

    function saveDraft() {
        const draftInvoice = {
            id: invoice?.id || generateId(),
            createdAt,
            paymentDue: calculateDueDate(createdAt, paymentTerms),
            description,
            paymentTerms: Number(paymentTerms),
            clientName,
            clientEmail,
            status: "draft",
            senderAddress,
            clientAddress,
            items: items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: Number(item.price),
                total: item.total
            })),
            total: calculateTotal()
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        const newInvoice = {
            id: invoice?.id || generateId(),
            createdAt,
            paymentDue: calculateDueDate(createdAt, paymentTerms),
            description,
            paymentTerms: Number(paymentTerms),
            clientName,
            clientEmail,
            status: "pending",
            senderAddress,
            clientAddress,
            items: items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: Number(item.price),
                total: item.total
            })),
            total: calculateTotal()
        }
    }

    function removeItem(id) {
        setItems(prevItems => prevItems.filter(item => item.id !== id))
    }

    function updateItem(item) {
        setItems(prevItems => prevItems.map(prevItem => {
            if (item.id === prevItem.id) {
                return item
            } else {
                return prevItem
            }
        }))
    }

    function addItem() {
        setItems(prevItems => [...prevItems, {...initialItem, id: crypto.randomUUID()}])
    }

    useEffect(() => {
        if (invoice) {
            setItems(invoice.items.map(item => ({
                ...item,
                id: crypto.randomUUID()
            })))

            setSenderAddress(invoice.senderAddress)

            setClientAddress(invoice.clientAddress)

            setClientName(invoice.clientName)

            setClientEmail(invoice.clientEmail)

            setCreatedAt(invoice.createdAt)

            setPaymentTerms(invoice.paymentTerms)

            setDescription(invoice.description)
        } else {
            setItems([])

            setSenderAddress(initialAddress)

            setClientAddress(initialAddress)

            setClientName('')

            setClientEmail('')

            setCreatedAt(new Date().toISOString().slice(0, 10))

            setPaymentTerms(1)

            setDescription('')
        }
    }, [invoice])

    return (
        <div style={localStyles.modal}>
            <div className={styles.wrapper}>
                <BackButton handleClick={closeForm} marginBottom='26px' />
                {invoice ? (
                        <h2>Edit <span style={{ color: 'var(--color-text-accent)' }}>#</span>{invoice?.id}</h2>
                    ) : (
                        <h2>New Invoice</h2>
                    )
                }
                <form action="" onSubmit={handleSubmit}>
                    <fieldset>
                        <h4 style={localStyles.h4}>Bill From</h4>
                        <Address
                            toOrFrom='from'
                            {...senderAddress}
                            setAddress={setSenderAddress}
                        />
                    </fieldset>
                    <fieldset>
                        <h4 style={localStyles.h4}>Bill To</h4>
                        <label htmlFor="name">Client's Name</label>
                        <input type="text" name="name" id="name" value={clientName} onChange={e => setClientName(e.target.value)} required />
                        <label htmlFor="email">Client's Email</label>
                        <input type="email" name="email" id="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} required />
                        <Address
                            toOrFrom='to'
                            {...clientAddress}
                            setAddress={setClientAddress}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="date">Invoice Date</label>
                        <input type="date" name="date" id="date" value={createdAt} onChange={e => setCreatedAt(e.target.value)} min={new Date().toISOString().slice(0, 10)} disabled={invoice?.status === 'pending' || invoice?.status === 'paid'} />
                        <label htmlFor="term">Payment Terms</label>
                        <select name="term" id="term" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} required>
                            <option value="1">Net 1 Day</option>
                            <option value="7">Net 7 Days</option>
                            <option value="14">Net 14 Days</option>
                            <option value="30">Net 30 Days</option>
                        </select>
                        <label htmlFor="description">Project Description</label>
                        <input type="text" name="description" id="description" value={description} onChange={e => setDescription(e.target.value)} required />
                    </fieldset>
                    <h3 className={styles.item_header}>Item List</h3>
                    <div className={styles.item_legend}>
                        <p>Total</p>
                        <p>Qty.</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    <ul>
                        {items.length > 0 && items.map(item => (
                                <FormItem {...item} key={item.id} removeItem={removeItem} updateItem={updateItem} />
                            ))}
                    </ul>
                    <Button variant='add' onClick={addItem}>
                        <PlusIcon />
                        <span style={{ marginLeft: '0.5rem' }}>Add New Item</span>
                    </Button>
                    <div className={styles.btn_div}>
                        <Button variant={invoice ? 'cancel' : 'discard'}>
                            {invoice ? 'Cancel' : 'Discard'}
                        </Button>
                        {!invoice && <Button variant='draft' onClick={saveDraft}>
                            Save As Draft
                        </Button>}
                        <Button variant='save' submit>
                            Save {invoice ? 'Changes' : '& Send'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}