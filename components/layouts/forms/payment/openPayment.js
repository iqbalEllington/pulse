import React, { Component } from "react";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import CheckoutForm from "./checkout";
import CheckoutFormHH from "./checkout-hh";

covertToCurrency
import Link from "next/link";
import Autosuggests from "../autosuggests";
import { covertToCurrency } from "../../../../services/utilsService";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE);
class openPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            email: "",
            propertyAddress: "",
            amount: "",
            agentName: "",
            mobileCountry: "",
            mobileNumber: "",
            mobileCountryName: "",
            formSuccess: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }
    handleautosuggest(value) {
        this.setState({ agentName: value })
    }
    handleMobileNumber(key, value) {
        this.setState({
            [key]: value,
        });
    }
    async processPayment(e) {
        e.preventDefault();
        this.setState({ formSuccess: true })
    }
    setClientSecret(value) {
        this.setState({ clientSecret: value });
    }
    render() {
        return (
            <div className="col-12 p-0">
                {!this.state.formSuccess &&
                    <form onSubmit={(e) => this.processPayment(e)} className="row m-0 p-0 ">
                        <div>
                            <label> Full Name* </label>
                            <input
                                value={this.state.fullName}
                                onChange={(e) => this.handleInputChange(e)}
                                className="white_input"
                                type="text"
                                required
                                placeholder="Full Name"
                                name="fullName"
                            />
                        </div>
                        <div>
                            <label> Email* </label>
                            <input
                                required
                                value={this.state.email}
                                onChange={(e) => this.handleInputChange(e)}
                                type="email"
                                className="white_input"
                                placeholder="Your Email"
                                name="email"
                            />
                        </div>
                        <div>
                            <label> Property Address* </label>
                            <input
                                name="propertyAddress"
                                type="text"
                                required
                                className="white_input"
                                onChange={(e) => this.handleInputChange(e)}
                                value={this.state.propertydAddress}
                                placeholder="Property Address"
                            />
                        </div>
                        <div>
                            <label> Mobile* </label>
                            <IntlTelInput
                                autoHideDialCode="false"
                                onPhoneNumberChange={(b, n, c, number) => {
                                    this.handleMobileNumber("mobileCountry", c.dialCode);
                                    this.handleMobileNumber("mobileCountryName", c.iso2);
                                    this.handleMobileNumber("mobileNumber", n);
                                }}
                                value={this.state.mobileNumber}
                                onSelectFlag={(number, n) => {
                                    this.handleMobileNumber("mobileCountry", n.dialCode);
                                    this.handleMobileNumber("mobileCountryName", n.iso2);
                                }}
                                defaultCountry={"ae"}
                                containerclassName="intl-tel-input"
                                inputclassName="form-control"
                            />
                        </div>
                        <div>
                            <label> Amount* </label>
                            <input className="white_input" name="amount" onChange={(e) => this.handleInputChange(e)} type="number" required placeholder="Amount" />
                        </div>
                        <div>
                            <label> Agent Name* </label>
                            <Autosuggests value={this.state.agentName} change={(e) => this.handleautosuggest(e)} />
                        </div>
                        <button type="submit" className="primary_btn hover-pbg">Proceed to payment</button>
                        <p className='terms-privacy'>By clicking Submit, you agree to our <Link legacyBehavior href={'/terms-and-conditions'}><a>Terms</a></Link> &amp;  <Link legacyBehavior href={'/privacy-and-cookies-policy'}><a>Privacy Policy.</a></Link></p>
                    </form>
                }
                {this.state.formSuccess &&
                    <>
                        <button clas onClick={() => this.setState({ formSuccess: false })} className="back_btn payment-form"><i className="fa-solid fa-angle-left"></i> Back </button>
                        <table className="payment-summery">
                            <tbody>
                                <tr>
                                    <td>Amount</td>
                                    <td>{covertToCurrency("AED", "AED", this.state.amount)}</td>
                                </tr>
                                <tr>
                                    <td>Service Charge (3%)</td>
                                    <td>{covertToCurrency("AED", "AED", this.state.amount * 0.03)}</td>
                                </tr>
                                <tr className="total">
                                    <td>Total</td>
                                    <td>{covertToCurrency("AED", "AED", parseFloat(this.state.amount) + parseFloat(this.state.amount * 0.03))} </td>
                                </tr>
                            </tbody>
                        </table>
                        <img src="/images/uk-powered_by_stripe.png" className="p-4 col-11 col-md-8" />
                        {this.props.page=='holiday' ?
                        <CheckoutFormHH formData={this.state}/>
                        :
                        <CheckoutForm formData={this.state} />
                        }
                        
                    </>
                }
            </div>
        );
    }
}

export default openPayment;
