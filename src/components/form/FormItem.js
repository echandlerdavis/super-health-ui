import React from 'react';
import { Checkbox } from '@material-ui/core';
import { TripOrigin, Lens } from '@material-ui/icons';
import styles from './FormItem.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItem = ({
  onChange, value, id, label, placeholder, type, className, min, step, dataAU
}) => {
  const checkbox = (
    <Checkbox
      data-au={dataAU}
      id={id}
      value={value}
      checked={value}
      icon={<TripOrigin />}
      checkedIcon={<Lens style={{ color: 'green' }} />}
      onChange={onChange}
    />
  );

  let inputBox = (
    <input
      data-au={dataAU}
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

  if (label === 'Rate:') {
    inputBox = (
      <div className={styles.rateInputBox}>
        <div className={styles.rateInputIcon}>$</div>
        {inputBox}
      </div>
    );
  }

  if (type === 'textarea') {
    inputBox = (
      <textarea
        data-au={dataAU}
        className={`${styles.textarea} ${className}`}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
        min={min}
        step={step}
      />
    );
  }

  return (
    <div key={`input${id}`}>
      <label className={type === 'checkbox' ? styles.checkBox : styles.label} htmlFor={id}>
        {label}
        <div>
          {type === 'checkbox' ? checkbox : inputBox}
        </div>
      </label>
    </div>
  );
};

export default FormItem;
