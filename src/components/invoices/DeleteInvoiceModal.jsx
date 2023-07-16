import React from 'react'
import Button from '../Button'
import styles from './invoices.module.css'

export default function DeleteInvoiceModal({ id, isVisible, closeModal, deleteInvoice }) {
    return (
        <div style={{ display: isVisible ? 'grid' : 'none' }} className={styles.delete_modal}>
            <form action="" method='dialog' className={styles.delete_modal_form}>
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete invoice #{id}? This action cannot be undone.</p>
                <div>
                    <Button onClick={closeModal} variant='cancel'>
                        Cancel
                    </Button>
                    <Button onClick={() => deleteInvoice(id)} variant='delete'>
                        Delete
                    </Button>
                </div>
            </form>
        </div>
    )
}