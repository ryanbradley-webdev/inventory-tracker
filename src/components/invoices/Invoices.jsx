import { useNavigate } from 'react-router-dom'
import Invoice from './Invoice'
import ArrowDownIcon from '../../assets/ArrowDownIcon'
import IllustrationEmpty from '../../assets/IllustrationEmpty'
import Button from '../Button'
import styles from './invoices.module.css'
import { useEffect, useState } from 'react'
import FilterMenu from './FilterMenu'

export default function Invoices({ invoices, toggleEditInvoiceForm }) {
    const navigate = useNavigate()

    const [filter, setFilter] = useState([])
    const [filterMenuVisible, setFilterMenuVisible] = useState(false)

    const [filteredInvoices, setFilteredInvoices] = useState(invoices)

    function selectInvoice(id) {
        navigate(`/${id}`)
    }

    function toggleFilterMenu() {
        setFilterMenuVisible(!filterMenuVisible)
    }

    useEffect(() => {
        if (filter.length > 0) {
            setFilteredInvoices(invoices.filter(invoice => filter.includes(invoice.status)))
        } else {
            setFilteredInvoices(invoices)
        }

    }, [filter])

    return (
        <>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.h1}>Invoices</h1>
                    <h2 className={styles.subheader}>
                        {invoices.length === 0 ? 'No invoices' : `${invoices.length} invoices`}
                    </h2>
                </div>
                <div className={styles.headerRight}>
                    <div className={styles.filter_btn_div}>
                        <button className={styles.filter_btn} onClick={toggleFilterMenu}>
                            <span className={styles.bold_text}>Filter
                            <span className='exclude-mobile'>&nbsp;by status</span>
                            </span>
                            <ArrowDownIcon />
                        </button>
                        {filterMenuVisible && <FilterMenu
                            filter={filter}
                            setFilter={setFilter}
                            toggleMenu={toggleFilterMenu}
                        />}
                    </div>
                    <Button variant='new' onClick={toggleEditInvoiceForm}>
                        New
                    </Button>
                </div>
            </div>
            {
                filteredInvoices.length === 0 
                ? <IllustrationEmpty />
                : filteredInvoices.map(invoice => <Invoice invoice={invoice} key={invoice.id} selectInvoice={selectInvoice} />)
            }
        </>
    )
}