import Link from 'next/link';
import React from 'react';

function MortgageBar(props) {
    return (
        <div className="alert alert_mortgage">
            {props.searchType == "sales" ?
              <>
            <div>
                <img src="/images/icons/home_edit.svg" uk-svg alt="" />
                <span className="alert_title">Need a mortgage?</span>
            </div>
            <p className="alert_desc mb-0">
            We've got a team of independent and qualified advisors that are here to help.
            </p>
            </>
            :
            <><div>
            <img src="/images/icons/home_edit.svg" uk-svg alt="" />
            <span className="alert_title">Have you considered a mortgage? </span>
        </div>
        <p className="alert_desc mb-0">
        Your repayments may just be less than your rent!.
        </p></>
            }
            <Link legacyBehavior href="/dubai/properties/mortgages"><a><button className="secondary_btn">Get in touch</button></a></Link>
        </div>
    );
}

export default MortgageBar;