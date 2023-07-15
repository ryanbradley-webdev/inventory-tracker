import { useNavigate } from 'react-router-dom'
import Invoice from './Invoice'
import ArrowDownIcon from '../../assets/ArrowDownIcon'
import IllustrationEmpty from '../../assets/IllustrationEmpty'
import Button from '../Button'
import styles from './invoices.module.css'

export default function Invoices({ invoices, toggleEditInvoiceForm }) {
    const navigate = useNavigate()

    function selectInvoice(id) {
        navigate(`/${id}`)
    }

    return (
        <>
            <div className={styles.header}>
                <div>
                    <h1>Invoices</h1>
                    <h2 className={styles.subheader}>
                        {invoices.length === 0 ? 'No invoices' : `${invoices.length} invoices`}
                    </h2>
                </div>
                <div className={styles.headerRight}>
                    <button className={styles.filter_btn}>
                        <span>Filter</span>
                        <span className='exclude-mobile'>by status</span>
                        <ArrowDownIcon />
                    </button>
                    <Button variant='new' onClick={toggleEditInvoiceForm}>
                        New
                    </Button>
                </div>
            </div>
            {
                invoices.length === 0 
                ? <IllustrationEmpty />
                : invoices.map(invoice => <Invoice invoice={invoice} key={invoice.id} selectInvoice={selectInvoice} />)
            }
        </>
    )
}