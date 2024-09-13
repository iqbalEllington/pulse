import Link from 'next/link';
import React from 'react';
function RegisterInterest(props) {
    return (
        <>
            <div className="alert new_dev_alert col-12">
                <div>
                    <img src="/icons/edit_mail_icon.svg" uk-svg alt="" />
                    <span className="alert_title">Register your interest</span>
                </div>
                <p className="alert_desc p-4">
                    {/* <span>Lorem ipsum dolor sit amet consectetur adipiscing elit cras ornare finibus arcu. </span> */}
                </p>
                <Link legacyBehavior href="/dubai/book-valuation"><a onClick={props.popupSwitchForm}>
                    <button className="secondary_btn">Register Interest</button>
                </a></Link>

            </div>
        </>
    );
}

export default RegisterInterest;