import styles from './invoices.module.css'

export default function FilterMenu({ filter, setFilter }) {
    const handleChange = (e, term) => {
        if (e.target.checked) {
            setFilter(prev => [...prev, term])
        } else {
            setFilter(prev => prev.filter(item => item !== term))
        }
    }

    return (
        <div className={styles.filter_menu}>
            <label htmlFor="draft">
                <input type='checkbox' id='draft' name='draft' value='draft' checked={filter.includes('draft')} onChange={e => handleChange(e, 'draft')} />
                <span>Draft</span>
            </label>
            <label htmlFor="pending">
                <input type='checkbox' id='pending' name='pending' value='pending' checked={filter.includes('pending')} onChange={e => handleChange(e, 'pending')} />
                <span>Pending</span>
            </label>
            <label htmlFor="paid">
                <input type='checkbox' id='paid' name='paid' value='paid' checked={filter.includes('paid')} onChange={e => handleChange(e, 'paid')} />
                <span>Paid</span>
            </label>
        </div>
    )
}