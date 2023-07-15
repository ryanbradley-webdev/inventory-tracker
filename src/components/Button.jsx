import PlusIcon from "../assets/PlusIcon";

function pickBtnColor(variant) {
    if (variant === 'delete') return 'var(--color-red-primary)'
    if (variant === 'edit') return 'var(--color-bg-edit)'
    return 'var(--color-purple-primary)'
}

export default function Button({ variant, onClick, children }) {
    const color = pickBtnColor(variant)

    const localStyles = {
        button: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: 'none',
            borderRadius: '100px',
            backgroundColor: color,
            outline: 'transparent',
            paddingInline: '15px'
        },
        span: {
            flexGrow: '1',
            color: 'white',
            fontWeight: '700',
            fontSize: '15px',
            letterSpacing: '-0.25px'
        }
    }

    return (
        <button style={localStyles.button} onClick={onClick}>
            {variant === 'new' && <PlusIcon />}
            <span style={localStyles.span}>
                {children}
            </span>
        </button>
    )
}