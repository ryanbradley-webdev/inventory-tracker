import { formatCurrency } from "../../../lib/formatCurrency"
import RightArrowIcon from "../../assets/RightArrowIcon"
import StatusChip from "../StatusChip"
import styles from './invoices.module.css'

export default function Invoice({ invoice, selectInvoice }) {
    return (
        <div className={styles.card} onClick={() => selectInvoice(invoice.invoiceId.toLowerCase())}>
            <div className={styles.card_top}>
                <span className={styles.bold_text}>
                    <span style={{ color: 'var(--color-text-accent)'}}>#</span>{invoice.invoiceId}
                </span>
                <span className={`${styles.accent_text} exclude-mobile`}>Due {formatDate(invoice.paymentDue)}</span>
                <span className={styles.accent_text}>{invoice.clientName}</span>
            </div>
            <div className={styles.card_bottom}>
                <div>
                    <span className={`${styles.accent_text} include-mobile`}>Due {formatDate(invoice.paymentDue)}</span>
                    <span className={styles.bold_text}>$ {formatCurrency(invoice.total)}</span>
                </div>
                <StatusChip status={invoice.status} />
                <RightArrowIcon className='exclude-mobile' />
            </div>
        </div>
    )
}

function formatDate(date) {
    const dateStr = new Date(date).toDateString()
    const dateArr = dateStr.split(' ')
    let formattedDate = dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[3]
    return formattedDate
}