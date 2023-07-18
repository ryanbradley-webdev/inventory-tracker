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
    const [itemName, setItemName] = useState(name)
    const [itemQuantity, setItemQuantity] = useState(quantity)
    const [itemPrice, setItemPrice] = useState(price ? formatCurrency(price) : '0.00')
    const [itemTotal, setItemTotal] = useState(total)

    function handlePriceChange(e) {
        let [dollars, cents] = e.target.value.split('.')

        if (cents.length > 2) {
            const prefix = cents.slice(0, cents.length - 2)
            cents = cents.replace(prefix, '')
            dollars += prefix
        }

        if (cents.length < 2) {
            const suffix = dollars.slice(dollars.length - (2 - cents.length), dollars.length)
            dollars = dollars.slice(0, dollars.length - suffix.length)
            cents = suffix + cents
        }

        setItemPrice((Number(dollars) || '0') + '.' + cents)
    }

    useEffect(() => {
        const newTotal = Number(itemQuantity) * Number(itemPrice.replaceAll(',', ''))

        setItemTotal(newTotal)
    }, [itemQuantity, itemPrice])

    useEffect(() => {
        updateItem({
            id,
            name: itemName,
            quantity: itemQuantity,
            price: Number(itemPrice),
            total: Number(itemTotal)
        })
    }, [itemName, itemQuantity, itemPrice, itemTotal])

    return (
        <div className={styles.form_item}>
            <label htmlFor={`name-${id}`}>
                <span>Item Name</span>
                <input type="text" name={`name-${id}`} id={`name-${id}`} value={itemName} onChange={e => setItemName(e.target.value)} required />
            </label>
            <div>
                <label htmlFor={`quantity-${id}`}>
                    <span>Qty.</span>
                    <input type="number" name={`quantity-${id}`} id={`quantity-${id}`} value={itemQuantity} min={1} onChange={e => setItemQuantity(e.target.value)} required />
                </label>
                <label htmlFor={`price-${id}`}>
                    <span>Price</span>
                    <input type="text" name={`price-${id}`} id={`price-${id}`} value={itemPrice} min={1} onChange={handlePriceChange} required />
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