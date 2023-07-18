import { useRef } from 'react'
import styles from './form.module.css'

export default function Address({ street, city, postCode, country, toOrFrom, setAddress, validateField }) {
    const streetRef = useRef(null)
    const cityRef = useRef(null)
    const postCodeRef = useRef(null)
    const countryRef = useRef(null)

    function handleChange(e) {
        setAddress({
            street: streetRef.current.value,
            city: cityRef.current.value,
            postCode: postCodeRef.current.value,
            country: countryRef.current.value
        })

        validateField(e.target)
    }

    return (
        <>
            <label htmlFor={`${toOrFrom}-street`}>
                <span>Street Address</span>
                <input type="text" name={`${toOrFrom}-street`} id={`${toOrFrom}-street`} value={street} onChange={handleChange} ref={streetRef} required />
            </label>
            <div className={styles.address_info}>
                <label htmlFor={`${toOrFrom}-city`}>
                    <span>City</span>
                    <input type="text" name={`${toOrFrom}-city`} id={`${toOrFrom}-city`} value={city} onChange={handleChange} ref={cityRef} required />
                </label>
                <label htmlFor={`${toOrFrom}-post-code`}>
                    <span>Post Code</span>
                    <input type="text" name={`${toOrFrom}-post-code`} id={`${toOrFrom}-post-code`} value={postCode} onChange={handleChange} ref={postCodeRef} required />
                </label>
                <label htmlFor={`${toOrFrom}-country`}>
                    <span>Country</span>
                    <input type="text" name={`${toOrFrom}-country`} id={`${toOrFrom}-country`} value={country} onChange={handleChange} ref={countryRef} required />
                </label>
            </div>
        </>
    )
}