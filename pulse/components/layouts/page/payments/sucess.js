import React, { Component, useEffect, useState } from 'react';

import Link from 'next/link';
import { covertToCurrency } from '../../../../services/utilsService';
export default function success() {
    const [status, setStatus] = useState(false)
    useEffect(() => {
        let payment_intent = new URLSearchParams(window.location.search).get("payment_intent")
        // Create PaymentIntent as soon as the page loads
        fetch(process.env.NEXT_PUBLIC_API_URL + "dubai/payment/status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({ ...props.formData }),
            body: JSON.stringify({ payment_intent: payment_intent }),
        })
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.data)
            });
    }, [])

    return (
        <>
            <div className='devider'></div>
            <section>
                {status !== false &&
                    <div className="form_csuccess_ontainer">
                        {status.status == "succeeded" &&
                            <div className="form_csuccess_ontainer">
                                <div className="form_content text-center">
                                    <h5 style={{ color: "#25D366" }}>Payment Recieved!</h5>
                                    <p>
                                        Thank you, we have received your payment of {covertToCurrency("AED", "AED", (status.amount / 100))}.
                                    </p>
                                    <Link legacyBehavior href={"/"}><a><button className="primary_btn">Close</button></a></Link>
                                </div>
                            </div>
                        }
                    </div>
                }
            </section>
        </>
    );
}
