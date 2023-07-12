import PlusIcon from "../assets/PlusIcon";

function pickBtnColor(variant) {
    if (variant === 'delete') return 'var(--color-red-primary)'
    if (variant === 'edit') return 'var(--color-bg-edit)'
    return 'var(--color-purple-primary)'
}

export default function Button({ variant, onClick, children }) {
    const color = pickBtnColor(variant)

    const styles = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: 'none',
        borderRadius: '100px',
        backgroundColor: color,
        outline: 'transparent'
    }

    return (
        <button style={styles} onClick={onClick}>
            {variant === 'new' && <PlusIcon />}
            <span style={{ flexGrow: '1' }}>
                {children}
            </span>
        </button>
    )
}