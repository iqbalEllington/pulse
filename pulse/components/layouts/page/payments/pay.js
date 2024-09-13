import Link from 'next/link';
import React, { Component } from 'react';
import OpenPayment from '../../forms/payment/openPayment';
class pay extends Component {
    render() {
        return (
            <>
                <div className="devider pb-0"></div>
                <div className="container">
                    <div className="navigation breadcrumbs">
                        <span className="overlay" />
                        <Link legacyBehavior href={"/"}><a>Home</a></Link><i className="fa-solid fa-angle-right" />
                        <Link legacyBehavior href="/dubai/pay"><a>Pay Online</a></Link>
                    </div>
                </div>
                <div className="form_container">
                    <div className="form_content full-form fullwidthforms payment-form">
                        <h3>Pay Online</h3>
                        <p>
                            {/* <span>Lorem ipsum dolor sit amet ectetur.</span> Lorem ipsum dolor sit
                            amet, consectetur adipiscing elit. */}
                        </p>
                        <OpenPayment page="basic"/>
                    </div>

                </div>
            </>
        );
    }
}

export default pay;


