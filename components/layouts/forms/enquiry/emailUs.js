import Link from 'next/link';
import React, { useState } from 'react';
import IntlTelInput from "react-intl-tel-input";
import CMSService from '../../../../services/CMSService';

const CMSServices = new CMSService();
function emailUs(props) {
    const [inputField, setInputField] = useState({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        Message: ''
    })
    const [formStatus, setFormStatus] = useState(false);
    const inputsHandler = (e) => {
        const { name, value } = e.target;
        setInputField((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        var result = await CMSServices.submitForms(inputField, "valuation")
        if (result.status == 200) {
            setFormStatus(true)
        }
    }

    return (
        <>
            {/* //   ================================= Book a Valuation Section ================================= */}
            {formStatus == false ?
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Full Name</label>
                        <input className="white_input" name="name" onChange={inputsHandler} value={inputField.name} type="text" required placeholder="Full Name" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input className="white_input" name="email" onChange={inputsHandler} value={inputField.email} type="email" required inputMode="email" placeholder="Email Address" />
                    </div>
                    <div>
                        <label>Mobile</label>
                        <input className="white_input" name="mobile" onChange={inputsHandler} value={inputField.mobile} type="text" inputMode="tel" placeholder="Mobile Number" />
                    </div>
                    <div>
                        <label>Subject</label>
                        <input className="white_input" name="mobile" onChange={inputsHandler} value={inputField.mobile} type="text" inputMode="tel" placeholder="Mobile Number" />
                    </div>
                    <div>
                        <label>Message</label>
                        <textarea className="white_input" name="mobile" onChange={inputsHandler} value={inputField.mobile} type="text" inputMode="tel" placeholder="Mobile Number" />
                    </div>
                    <div>
                        <button className="primary_btn primary_btn">Submit Details</button>
                    </div>
                    <p className='terms-privacy'>By clicking Submit, you agree to our <Link legacyBehavior href={'/terms-and-conditions'}><a>Terms</a></Link> &amp;  <Link legacyBehavior href={'/privacy-and-cookies-policy'}><a>Privacy Policy.</a></Link></p>
                </form>
                :
                <>
                    <div>
                        <h4 className='pt-3 thankyou' >Thank you {inputField.name}, <br /> We shall be contacting you soon</h4>
                    </div>
                </>
            }
        </>
    );
}

export default emailUs;