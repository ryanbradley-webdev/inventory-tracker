import { useEffect, useState } from 'react'
import { formatCurrency } from '../../../lib/formatCurrency'
import DeleteIcon from '../../assets/DeleteIcon'
import styles from './form.module.css'

export default function FormItem({
    id,
    name,
    quantity,
    price,
    total,
    removeItem,
    updateItem
}) {
    const [itemTotal, setItemTotal] = useState(total || 0)

    function handleChange(e, property) {
        const value = e.target.value

        const newItem = {
            id,
            name,
            quantity,
            price,
            total
        }

        newItem[property] = property === 'price' ? Number(value) : value

        updateItem(newItem)
    }

    useEffect(() => {
        setItemTotal(quantity * price)
    }, [quantity])

    return (
        <div className={styles.form_item}>
            <label htmlFor={`name-${id}`}>
                <span>Item Name</span>
                <input type="text" name={`name-${id}`} id={`name-${id}`} value={name} onChange={e => handleChange(e, 'name')} required />
            </label>
            <div>
                <label htmlFor={`quantity-${id}`}>
                    <span>Qty.</span>
                    <input type="number" name={`quantity-${id}`} id={`quantity-${id}`} value={quantity} min={1} onChange={e => handleChange(e, 'quantity')} required />
                </label>
                <label htmlFor={`price-${id}`}>
                    <span>Price</span>
                    <input type="text" name={`price-${id}`} id={`price-${id}`} value={formatCurrency(price)} min={1} onChange={e => handleChange(e, 'price')} required />
                </label>
                <label>
                    <span>Total</span>
                    <p>{formatCurrency(itemTotal)}</p>
                </label>
                <button onClick={() => removeItem(id)}>
                    <DeleteIcon />
                </button>
            </div>
        </div>
    )
}