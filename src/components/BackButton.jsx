import LeftArrowIcon from "../assets/LeftArrowIcon"

export default function BackButton({ handleClick, marginBottom }) {
    const styles = {
        button: {
            outline: 'transparent',
            background: 'none',
            border: 'none',
            marginBottom: marginBottom || ''
        },
        text: { 
            marginLeft: '1.5rem',
            color: 'var(--color-text-primary)',
            fontSize: '15px',
            fontWeight: 'bold',
            letterSpacing: '-0.25px'
        }
    }

    return (
        <button onClick={handleClick} style={styles.button}>
            <LeftArrowIcon />
            <span style={styles.text}>Go Back</span>
        </button>
    )
}