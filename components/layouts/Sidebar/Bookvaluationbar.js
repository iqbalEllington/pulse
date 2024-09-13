import Link from 'next/link';
import React from 'react';
function Bookvaluationbar(props) {
    return (
        <div className="alert book_alert">
            <div>
                <img src="/icons/home_city.svg" uk-svg alt="" />
                <span className="alert_title">Book a Valuation</span>
            </div>
            <p className="alert_desc pb-0 mb-0">
                <span>Premium marketing, {props.searchType == "sales" ? "more buyers":"more tenants"} and an expert service.</span> Just
                three of the reasons why people choose us.
            </p>
            <Link legacyBehavior href="/dubai/book-valuation"><a>
                <button className="secondary_btn">List Your Property</button>
            </a></Link>

        </div>
    );
}

export default Bookvaluationbar;