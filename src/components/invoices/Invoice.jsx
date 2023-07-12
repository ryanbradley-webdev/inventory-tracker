import StatusChip from "../StatusChip"

export default function Invoice({ invoice, selectInvoice }) {
    const styles = {
        card: {
            backgroundColor: 'var(--color-bg-input)',
            boxShadow: '0px 10px 10px -10px #48549F1A',
            borderRadius: '8px',
            marginBottom: '1rem',
            cursor: 'pointer'
        },
        info: {
            display: 'flex',
            flexDirection: 'column'
        }
    }

    return (
        <div style={styles.card} onClick={() => selectInvoice(invoice.id.toLowerCase())}>
            <div>
                <span>#{invoice.id}</span>
            </div>
            <div>
                <span>{invoice.clientName}</span>
            </div>
            <div style={styles.info}>
                <span>Due {formatDate(invoice.paymentDue)}</span>
                <span>$ {invoice.total}</span>
            </div>
            <StatusChip status={invoice.status} />
        </div>
    )
}

function formatDate(date) {
    const dateStr = new Date(date).toDateString()
    const dateArr = dateStr.split(' ')
    let formattedDate = dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[3]
    return formattedDate
}