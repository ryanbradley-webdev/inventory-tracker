import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Invoice from './Invoice'
import ArrowDownIcon from '../../assets/ArrowDownIcon'
import IllustrationEmpty from '../../assets/IllustrationEmpty'
import Button from '../Button'
import './Invoices.css'
import Form from '../form/Form'

export default function Invoices({ invoices }) {
    const [newInvoiceVisible, setNewInvoiceVisible] = useState(false)

    const navigate = useNavigate()

    const styles = {
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        headerRight: {
            display: 'flex',
            alignItems: 'center'
        }
    }

    function selectInvoice(id) {
        navigate(`/${id}`)
    }

    function toggleNewInvoiceForm() {
        setNewInvoiceVisible(!newInvoiceVisible)
    }

    return (
        <>
            <div style={styles.header}>
                <div>
                    <h1>Invoices</h1>
                    <h2>No invoices</h2>
                </div>
                <div style={styles.headerRight}>
                    <span>Filter</span>
                    <span id='exclude-mobile'>by status</span>
                    <ArrowDownIcon />
                    <Button variant='new' onClick={toggleNewInvoiceForm}>
                        New
                    </Button>
                </div>
            </div>
            {
                invoices.length === 0 
                ? <IllustrationEmpty />
                : invoices.map(invoice => <Invoice invoice={invoice} key={invoice.id} selectInvoice={selectInvoice} />)
            }
            <Form isVisible={newInvoiceVisible} hideForm={toggleNewInvoiceForm} newInvoice />
        </>
    )
}