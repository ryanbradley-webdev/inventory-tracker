import { useEffect, useRef, useState } from "react"
import Button from "../Button"
import FormItem from "./FormItem"
import PlusIcon from "../../assets/PlusIcon"
import { useNavigate, useSearchParams } from "react-router-dom"
import BackButton from "../BackButton"
import styles from './form.module.css'
import Address from "./Address"
import { initialAddress, initialItem } from "./initialInfo"
import { calculateDueDate } from "../../../lib/calculateDueDate"
import { letterArr } from '../../../lib/letterArr'
import { saveInvoice } from "../../../lib/saveInvoice"
import Modal from "../modal/Modal"

export default function Form({ invoiceIds, hideForm, isVisible, invoice, generateId }) {
    const [searchParams, setSearchParams] = useSearchParams()

    const navigate = useNavigate()

    const [senderAddress, setSenderAddress] = useState(initialAddress)
    const [clientAddress, setClientAddress] = useState(initialAddress)
    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [createdAt, setCreatedAt] = useState(new Date().toISOString().slice(0, 10))
    const [paymentTerms, setPaymentTerms] = useState(1)
    const [description, setDescription] = useState('')
    const [items, setItems] = useState([])

    const [formValid, setFormValid] = useState(true)
    const [itemsValid, setItemsValid] = useState(true)

    const [successModalVisible, setSuccessModalVisible] = useState(false)

    const modalRef = useRef(null)
    const wrapperRef = useRef(null)
    const formRef = useRef(null)

    function generateId() {
        let newId = letterArr[Math.floor(Math.random() * 26)]
  
        newId += letterArr[Math.floor(Math.random() * 26)]
  
        newId += Math.floor(Math.random() * 10000)
  
        return invoiceIds?.includes(newId) ? generateId() : newId
    }

    const localStyles = {
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
            invoiceId: invoice?.invoiceId || generateId(),
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

        saveInvoice(draftInvoice)
            .then(() => {
                setSuccessModalVisible(true)
            })
            .catch(res => {
                console.log(res)
            })
    }

    function handleChange(e, setState) {
        setState(e.target.value)
        validateField(e.target)
    }

    function validateField(field) {
        if (!field.value) {
            field.classList.add('invalid')
            return false
        } else {
            field.classList.remove('invalid')
            return true
        }
    }

    function validateForm() {
        const fields = formRef.current.querySelectorAll('input')
        let isValid = true

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false
            }
        })

        setFormValid(isValid)
        setItemsValid(items.length > 0)

        return isValid
    }

    function handleSubmit() {
        const isFormValid = validateForm()

        if (!isFormValid) return

        const newInvoice = {
            invoiceId: invoice?.invoiceId || generateId(),
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

        saveInvoice(newInvoice)
            .then(() => {
                setSuccessModalVisible(true)
            })
            .catch(res => {
                console.log(res)
            })
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
    
    function handleClose() {
        setSuccessModalVisible(false)
        closeForm()
    }

    function handleBack() {
        handleClose()
        navigate('/')
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

    useEffect(() => {
        if (isVisible) {
            modalRef.current.style.display = 'block'
            setTimeout(() => {
                modalRef.current.style.opacity = '1'
                wrapperRef.current.style.transform = 'translateX(0)'
            }, 100)
        } else {
            wrapperRef.current.style.transform = 'translateX(-616px)'
            modalRef.current.style.opacity = '0'
            setTimeout(() => {
                modalRef.current.style.display = 'none'
            }, 300)
        }
    }, [isVisible])

    return (
        <>
            <div className={styles.modal} ref={modalRef}>
                <div className={styles.wrapper} ref={wrapperRef}>
                    <BackButton handleClick={closeForm} marginBottom='26px' />
                    {invoice ? (
                            <h2>Edit <span style={{ color: 'var(--color-text-accent)' }}>#</span>{invoice?.id}</h2>
                        ) : (
                            <h2>New Invoice</h2>
                        )
                    }
                    <form action="" onSubmit={e => e.preventDefault()} ref={formRef}>
                        <fieldset>
                            <h4 style={localStyles.h4}>Bill From</h4>
                            <Address
                                toOrFrom='from'
                                {...senderAddress}
                                setAddress={setSenderAddress}
                                validateField={validateField}
                            />
                        </fieldset>
                        <fieldset>
                            <h4 style={localStyles.h4}>Bill To</h4>
                            <label htmlFor="name">
                                <span>Client's Name</span>
                                <input type="text" name="name" id="name" value={clientName} onChange={e => handleChange(e, setClientName)} required />
                            </label>
                            <label htmlFor="email">
                                <span>Client's Email</span>
                                <input type="email" name="email" id="email" value={clientEmail} onChange={e => handleChange(e, setClientEmail)} required />
                            </label>
                            <Address
                                toOrFrom='to'
                                {...clientAddress}
                                setAddress={setClientAddress}
                                validateField={validateField}
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="date">Invoice Date</label>
                            <input type="date" name="date" id="date" value={createdAt} onChange={e => handleChange(e, setCreatedAt)} min={new Date().toISOString().slice(0, 10)} disabled={invoice?.status === 'pending' || invoice?.status === 'paid'} />
                            <label htmlFor="term">Payment Terms</label>
                            <select name="term" id="term" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} required>
                                <option value="1">Net 1 Day</option>
                                <option value="7">Net 7 Days</option>
                                <option value="14">Net 14 Days</option>
                                <option value="30">Net 30 Days</option>
                            </select>
                            <label htmlFor="description">
                                <span>Project Description</span>
                                <input type="text" name="description" id="description" value={description} onChange={e => handleChange(e, setDescription)} required />
                            </label>
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
                        <div className={styles.red_div}>
                            {!formValid && <p className={styles.red_text}>- All fields must be added</p>}
                            {!itemsValid && <p className={styles.red_text}>- An item must be added</p>}
                        </div>
                        <div className={styles.btn_div}>
                            <Button variant={invoice ? 'cancel' : 'discard'} onClick={closeForm}>
                                {invoice ? 'Cancel' : 'Discard'}
                            </Button>
                            {(!invoice || invoice.status === 'draft') && <Button variant='draft' onClick={saveDraft}>
                                Save As Draft
                            </Button>}
                            <Button variant='save' onClick={handleSubmit}>
                                Save {invoice?.status === 'pending' ? 'Changes' : '& Send'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal isVisible={successModalVisible}>
                <div className={styles.success_modal}>
                    <h3>Invoice saved!</h3>
                    <div>
                        <Button variant='edit' onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='save' onClick={handleBack}>
                            Back to invoices
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}