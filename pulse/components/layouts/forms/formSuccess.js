import React, { useState } from 'react';

function Formsuccess({ name, type, date, handleclose }) {
  const a = () => {
    handleclose
  }
  return (
    <div className="form_csuccess_ontainer">
      <div className="form_content">
        <h5>Thank you {name},Your {type} is confirmed.</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit and is
          confirmed for

          {date &&
            <strong>{date}.</strong>
          }
        </p>
        <button onClick={() => a()} className="primary_btn">Close</button>
      </div>
    </div>
  )
};

export default Formsuccess;