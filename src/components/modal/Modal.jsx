import styles from './modal.module.css'

export default function Modal({ isVisible, children }) {
    return (
        <div style={{ display: isVisible ? 'grid' : 'none' }} className={styles.modal}>
            {children}
        </div>
    )
}