import { useState } from "react"
import Button from "../Button"
import FormItem from "./FormItem"
import PlusIcon from "../../assets/PlusIcon"
import { useSearchParams } from "react-router-dom"
import BackButton from "../BackButton"
import styles from './form.module.css'

export default function Form({ hideForm, isVisible, invoice }) {
    const [searchParams, setSearchParams] = useSearchParams()

    const [items, setItems] = useState(invoice?.items || [])

    const localStyles = { 
        modal: {
            position: 'absolute', 
            inset: '0',
            bottom: 'auto', 
            transform: isVisible ? '' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
            background: '#00000099'
        },
        button: {
            outline: 'transparent',
            background: 'none',
            border: 'none'
        },
        text: { 
            marginLeft: '1.5rem',
            color: 'var(--color-text-primary)',
            fontSize: '15px',
            fontWeight: 'bold',
            letterSpacing: '-0.25px'
        },
        h4: {
            fontSize: '15px',
            fontWeight: '700',
            letterSpacing: '-0.25px',
            color: 'var(--color-purple-primary)'
        }
    }

    function closeForm() {
        setSearchParams()
        hideForm()
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    function removeItem() {

    }

    function updateItem() {
        
    }

    return (
        <div style={localStyles.modal}>
            <div className={styles.wrapper}>
                <BackButton handleClick={closeForm} marginBottom='26px' />
                {invoice ? (
                        <h2>Edit <span>#</span>{invoice?.id}</h2>
                    ) : (
                        <h2>New Invoice</h2>
                    )
                }
                <form action="" onSubmit={handleSubmit}>
                    <fieldset>
                        <h4 style={localStyles.h4}>Bill From</h4>
                        <label htmlFor="from-address">Street Address</label>
                        <input type="text" name="from-address" id="from-address" />
                        <div className={styles.address_info}>
                            <label htmlFor="from-city">
                                <span>City</span>
                                <input type="text" name="from-city" id="from-city" />
                            </label>
                            <label htmlFor="from-post-code">
                                <span>Post Code</span>
                                <input type="text" name="from-post-code" id="from-post-code" />
                            </label>
                            <label htmlFor="from-country">
                                <span>Country</span>
                                <input type="text" name="from-country" id="from-country" />
                            </label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <h4 style={localStyles.h4}>Bill To</h4>
                        <label htmlFor="name">Client's Name</label>
                        <input type="text" name="name" id="name" />
                        <label htmlFor="email">Client's Email</label>
                        <input type="email" name="email" id="email" />
                        <label htmlFor="to-address">Street Address</label>
                        <input type="text" name="to-address" id="to-address" />
                        <div className={styles.address_info}>
                            <label htmlFor="to-city">
                                <span>City</span>
                                <input type="text" name="to-city" id="to-city" />
                            </label>
                            <label htmlFor="to-post-code">
                                <span>Post Code</span>
                                <input type="text" name="to-post-code" id="to-post-code" />
                            </label>
                            <label htmlFor="to-country">
                                <span>Country</span>
                                <input type="text" name="to-country" id="to-country" />
                            </label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="date">Invoice Date</label>
                        <input type="date" name="date" id="date" disabled={invoice} />
                        <label htmlFor="term">Payment Terms</label>
                        <select name="term" id="term">
                            <option value=""></option>
                        </select>
                        <label htmlFor="description">Project Description</label>
                        <input type="text" name="description" id="description" />
                    </fieldset>
                    <ul>
                        {items.length > 0 && items.map(item => <FormItem item={item} removeItem={removeItem} updateItem={updateItem} />)}
                    </ul>
                    <Button variant='add'>
                        <PlusIcon />
                        <span style={{ marginLeft: '0.5rem' }}>Add New Item</span>
                    </Button>
                    <div className={styles.btn_div}>
                        <Button variant={invoice ? 'cancel' : 'discard'}>
                            {invoice ? 'Cancel' : 'Discard'}
                        </Button>
                        {!invoice && <Button variant='draft'>
                            Save As Draft
                        </Button>}
                        <Button variant='save'>
                            Save {invoice ? 'Changes' : '& Send'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}