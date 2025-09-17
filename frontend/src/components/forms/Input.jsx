import styles from './Input.module.css'

const Input = ({type, text, name, placeholder, handleChange, value, ...props}) => {
  return (
    <div>
        <label htmlFor={name} className={styles.label}>{text}: </label>
        <input type={type} name={name} value={value} placeholder={placeholder} id={name} onChange={handleChange} className={styles.input} {...props}/>
    </div>
  )
}

export default Input