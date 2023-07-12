import React from 'react'
import Button from '../Button'

export default function DeleteInvoiceModal({ id, isVisible, closeModal, deleteInvoice }) {
    const styles = {
        screen: {
            position: 'absolute',
            inset: '0',
            display: isVisible ? 'grid' : 'none',
            placeItems: 'center',
            backgroundColor: '#0000000F'
        }
    }

    return (
        <div style={styles.screen}>
            <form action="" method='dialog'>
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete invoice #{id}? This action cannot be undone.</p>
                <div>
                    <Button onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button onClick={() => deleteInvoice(id)}>
                        Delete
                    </Button>
                </div>
            </form>
        </div>
    )
}