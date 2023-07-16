import PlusIcon from "../assets/PlusIconLg";

export default function Button({ variant, onClick, children }) {
    const localStyles = {
        button: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: 'none',
            borderRadius: '100px',
            outline: 'transparent',
            paddingInline: '15px'
        },
        span: {
            flexGrow: '1',
            fontWeight: '700',
            fontSize: '15px',
            letterSpacing: '-0.25px'
        }
    }

    return (
        <button style={localStyles.button} onClick={onClick} className={`button ${variant}`}>
            {variant === 'new' && <PlusIcon />}
            <span style={localStyles.span}>
                {children}
            </span>
        </button>
    )
}