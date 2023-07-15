function formatStatus(status) {
    let str = status.split('')
    str[0] = str[0].toUpperCase()
    return str.join('')
}

function primaryColor(status) {
    if (status === 'paid') return '#33D69F'
    if (status === 'pending') return '#FF8F00'
    return 'var(--color-invoice-draft)'
}

function backgroundColor(status) {
    if (status === 'paid') return '#33D69F0F'
    if (status === 'pending') return '#FF8F000F'
    return 'var(--color-bg-draft)'
}

export default function StatusChip({ status }) {
    const color = primaryColor(status)
    const colorBG = backgroundColor(status)

    const styles = {
        chip: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            fontSize: '15px',
            fontWeight: 'bold',
            lineHeight: '15px',
            letterSpacing: '-0.25px',
            color,
            backgroundColor: colorBG,
            borderRadius: '6px',
            width: '104px',
            height: '40px'
        },
        indicator: {
            height: '8px', 
            width: '8px', 
            borderRadius: '8px', 
            background: color
        }
    }

    return (
        <div style={styles.chip}>
            <div style={styles.indicator}></div>
            <div>{formatStatus(status)}</div>
        </div>
    )
}