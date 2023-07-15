import { useState } from "react"
import Button from "../Button"
import FormItem from "./FormItem"
import PlusIcon from "../../assets/PlusIcon"
import LeftArrowIcon from "../../assets/LeftArrowIcon"
import { useSearchParams } from "react-router-dom"

export default function Form({ hideForm, isVisible, invoice }) {
    const [searchParams, setSearchParams] = useSearchParams()

    const [items, setItems] = useState([])

    const styles = { 
        modal: {
            position: 'absolute', 
            inset: '0', 
            background: '#FFFFFF', 
            transform: isVisible ? '' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
            maxWidth: '616px'
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
        <div style={styles.modal}>
            <button onClick={closeForm} style={styles.button}>
                <LeftArrowIcon />
                <span style={styles.text}>Go Back</span>
            </button>
            {invoice ? (
                    <h2>Edit <span>#</span>{invoice?.id}</h2>
                ) : (
                    <h2>New Invoice</h2>
                )
            }
            <form action="" onSubmit={handleSubmit}>
                <fieldset>
                    <h4>Bill From</h4>
                    <label htmlFor="from-address">Street Address</label>
                    <input type="text" name="from-address" id="from-address" />
                    <div>
                        <label htmlFor="from-city">City</label>
                        <input type="text" name="from-city" id="from-city" />
                        <label htmlFor="from-post-code">Post Code</label>
                        <input type="text" name="from-post-code" id="from-post-code" />
                        <label htmlFor="from-country">Country</label>
                        <input type="text" name="from-country" id="from-country" />
                    </div>
                </fieldset>
                <fieldset>
                    <h4>Bill To</h4>
                    <label htmlFor="name">Client's Name</label>
                    <input type="text" name="name" id="name" />
                    <label htmlFor="email">Client's Email</label>
                    <input type="email" name="email" id="email" />
                    <label htmlFor="to-address">Street Address</label>
                    <input type="text" name="to-address" id="to-address" />
                    <div>
                        <label htmlFor="to-city">City</label>
                        <input type="text" name="to-city" id="to-city" />
                        <label htmlFor="to-post-code">Post Code</label>
                        <input type="text" name="to-post-code" id="to-post-code" />
                        <label htmlFor="to-country">Country</label>
                        <input type="text" name="to-country" id="to-country" />
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
                <Button>
                    <PlusIcon />
                    <span style={{ marginLeft: '0.5rem' }}>Add New Item</span>
                </Button>
                {invoice ? (
                    <div>
                        <Button>
                            Discard
                        </Button>
                        <Button>
                            Save As Draft
                        </Button>
                        <Button>
                            Save & Send
                        </Button>
                    </div>
                ) :  (
                    <div>
                        <Button>
                            Cancel
                        </Button>
                        <Button>
                            Save Changes
                        </Button>
                    </div>
                )}
            </form>
        </div>
    )
}