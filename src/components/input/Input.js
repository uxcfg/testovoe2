import React from 'react';
import './Input.css';

function Input({ cName, holder, value, onChange, errorMsg, type }) {
  const typeInp = type || 'text';
  return (
    <div className="input">
      <input
        type={typeInp}
        className={cName}
        placeholder={holder}
        value={value}
        onChange={onChange}
      />
      {cName.split(' ').includes('invalid') ? <small>{errorMsg}</small> : null}
    </div>
  );
}

export default Input;
