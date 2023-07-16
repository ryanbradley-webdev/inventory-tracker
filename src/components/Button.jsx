import PlusIcon from "../assets/PlusIconLg";

export default function Button({ variant, onClick, children, submit }) {
    const localStyles = {
        button: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: 'none',
            borderRadius: '100px',
            outline: 'transparent'
        },
        span: {
            flexGrow: '1',
            fontWeight: '700',
            fontSize: '15px',
            letterSpacing: '-0.25px'
        }
    }

    return (
        <button style={localStyles.button} onClick={onClick} className={`button ${variant}`} type={submit ? 'submit' : 'button' }>
            {variant === 'new' && <PlusIcon />}
            <span style={localStyles.span}>
                {children}
            </span>
        </button>
    )
}