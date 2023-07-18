import PlusIcon from "./PlusIcon"

export default function PlusIconLg() {
    const styles = {
        display: 'grid',
        placeItems: 'center',
        width: '2rem',
        height: '2rem',
        backgroundColor: '#FFFFFF',
        borderRadius: '1rem',
        marginLeft: '-9px'
    }

    return (
        <div style={styles}>
            <PlusIcon />
        </div>
    )
}