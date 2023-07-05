import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItem = ({
  onChange, value, id, label, placeholder, type, className, min, step
}) => {
  let inputBox = (
    <input
      className={`${styles.input} ${className}`}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
      checked={value}
      min={min}
      step={step}
    />
  );

  if (label === 'totalCost' || label === 'copay') {
    inputBox = (
      <div className={styles.extraLabelInputBox}>
        <div className={styles.extraLabelInputIcon}>$</div>
        {inputBox}
      </div>
    );
  }
  if (label === 'height' || label === 'weight') {
    inputBox = (
      <div className={styles.extraLabelInputBox}>
        {inputBox}
        <div className={styles.extraLabelInputIcon}>
          {label === 'height' ? 'in.' : 'lbs.'}
        </div>
      </div>
    );
  }

  return (
    <div key={`input${id}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
        <div>
          {inputBox}
        </div>
      </label>
    </div>
  );
};

export default FormItem;
