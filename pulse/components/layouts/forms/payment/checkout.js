import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./checkoutForm";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.

// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE);
export default function payments(props) {
  const [clientSecret, setClientSecret] = useState("");
  const [clientsecretStatus, setClientsecretStatus] = useState(false);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(process.env.NEXT_PUBLIC_API_URL + "dubai/payment/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ ...props.formData }),
      body: JSON.stringify({ items: [props.formData] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
        setClientsecretStatus(data.status)
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };
  return (
    <div className="stripePayment">
      {clientSecret !== "" && (
        <>
          {clientsecretStatus != 200 ?
            <>
              <div className="form_csuccess_ontainer">
                <div className="form_content">
                  <h5>Sorry {props.formData.fullName}, <br /> Unfortunately, your payment hasn't gone through .</h5>
                  <p>
                    Please try again. Alternatively, please call <a href="tel:+9714429444" target="_blank">04 429 4444</a>
                  </p>
                </div>
              </div>
            </> :
            <>
              <Elements options={{
                clientSecret,
                appearance
              }} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>

            </>
          }
        </>
      )}
    </div>
  );
}