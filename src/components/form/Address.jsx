import styles from './form.module.css'

export default function Address({ street, city, postCode, country, toOrFrom }) {
    return (
        <>
            <label htmlFor={`${toOrFrom}-street`}>Street Address</label>
            <input type="text" name={`${toOrFrom}-street`} id={`${toOrFrom}-street`} value={street} required />
            <div className={styles.address_info}>
                <label htmlFor={`${toOrFrom}-city`}>
                    <span>City</span>
                    <input type="text" name={`${toOrFrom}-city`} id={`${toOrFrom}-city`} value={city} required />
                </label>
                <label htmlFor={`${toOrFrom}-post-code`}>
                    <span>Post Code</span>
                    <input type="text" name={`${toOrFrom}-post-code`} id={`${toOrFrom}-post-code`} value={postCode} required />
                </label>
                <label htmlFor={`${toOrFrom}-country`}>
                    <span>Country</span>
                    <input type="text" name={`${toOrFrom}-country`} id={`${toOrFrom}-country`} value={country} required />
                </label>
            </div>
        </>
    )
}