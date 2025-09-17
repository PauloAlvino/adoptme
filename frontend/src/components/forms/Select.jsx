import styles from "./Select.module.css";

const Select = ({ text, name, options, handleChange, value }) => {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        onChange={handleChange}
        value={value || ""}
        className={styles.select}
      >
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
