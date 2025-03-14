import Link from "next/link";
import React from "react";

function infobarbuy(props) {
    return (
        //   {/* ================================= Info Section ================================= */}
        <section className="info container mt-0 mb-0">
            <div className="card">
                <svg width={29} height={25} viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.4267 13.5067L15.3334 21.5867V24.3334H18.08L26.16 16.24L23.4267 13.5067ZM28.2667 13.1067L26.56 11.4C26.4267 11.2534 26.24 11.1734 26.0534 11.1734C25.8534 11.1867 25.6667 11.2534 25.5334 11.4L24.2 12.7334L26.9334 15.4L28.2667 14.0667C28.52 13.8 28.52 13.3734 28.2667 13.1067ZM12.6667 19H3.33335V5.66671L14 12.3334L24.6667 5.66671V8.33337H27.3334V3.00004C27.3334 1.53337 26.1334 0.333374 24.6667 0.333374H3.33335C1.86669 0.333374 0.666687 1.53337 0.666687 3.00004V19C0.666687 20.4667 1.86669 21.6667 3.33335 21.6667H12.6667V19ZM24.6667 3.00004L14 9.66671L3.33335 3.00004H24.6667Z" fill="#3E4861" />
                </svg>
                <h5>Property For Sale In Dubai</h5>
                <p>
                Interested to see what's on the market?
                </p>
                <Link legacyBehavior href="/dubai/properties/residential/sales"><a><button className="default_btn">Yes, please</button></a></Link>
            </div>
            <div className="card">
                <svg width={50} height={42} viewBox="0 0 50 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.6665 32.6667V9.33333H5.33317V32.6667H21.6665ZM21.6665 0C22.9042 0 24.0912 0.491665 24.9663 1.36683C25.8415 2.242 26.3332 3.42899 26.3332 4.66667V37.3333C26.3332 38.571 25.8415 39.758 24.9663 40.6332C24.0912 41.5083 22.9042 42 21.6665 42H5.33317C2.74317 42 0.666504 39.9 0.666504 37.3333V4.66667C0.666504 3.42899 1.15817 2.242 2.03334 1.36683C2.90851 0.491665 4.09549 0 5.33317 0H21.6665ZM34.4998 0H46.1665C47.0948 0 47.985 0.368749 48.6414 1.02513C49.2978 1.6815 49.6665 2.57174 49.6665 3.5V10.5C49.6665 11.4283 49.2978 12.3185 48.6414 12.9749C47.985 13.6313 47.0948 14 46.1665 14H37.9998L30.9998 21V14V3.5C30.9998 2.57174 31.3686 1.6815 32.025 1.02513C32.6813 0.368749 33.5716 0 34.4998 0Z" fill="#3E4861" />
                </svg>
                <h5>Mortgage Calculator</h5>
                <p>
                Use our mortgage calculator to estimate your monthly mortgage payments.
                </p>
                <Link legacyBehavior href="/dubai/properties/mortgages">
                    <a>
                        <button className="default_btn">Show me!</button>
                    </a>
                </Link>
            </div>
            <div className="card">
                <svg width={49} height={46} viewBox="0 0 49 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.1667 19C38.0001 19 42.6667 23.6666 42.6667 29.5C42.6667 31.5533 42.0834 33.49 41.0567 35.1L48.2434 42.3333L45.0001 45.5766L37.7201 38.4133C36.1101 39.4166 34.1967 40 32.1667 40C26.3334 40 21.6667 35.3333 21.6667 29.5C21.6667 23.6666 26.3334 19 32.1667 19ZM32.1667 23.6666C30.6196 23.6666 29.1359 24.2812 28.042 25.3752C26.948 26.4692 26.3334 27.9529 26.3334 29.5C26.3334 31.0471 26.948 32.5308 28.042 33.6248C29.1359 34.7187 30.6196 35.3333 32.1667 35.3333C33.7138 35.3333 35.1976 34.7187 36.2915 33.6248C37.3855 32.5308 38.0001 31.0471 38.0001 29.5C38.0001 27.9529 37.3855 26.4692 36.2915 25.3752C35.1976 24.2812 33.7138 23.6666 32.1667 23.6666ZM19.3334 0.333313C21.8088 0.333313 24.1827 1.31664 25.9331 3.06698C27.6834 4.81732 28.6667 7.19129 28.6667 9.66665C28.6667 11.79 27.9434 13.75 26.7534 15.3366C24.7467 16.0833 22.9501 17.2733 21.4567 18.7666L19.3334 19C16.8581 19 14.4841 18.0166 12.7338 16.2663C10.9834 14.516 10.0001 12.142 10.0001 9.66665C10.0001 7.19129 10.9834 4.81732 12.7338 3.06698C14.4841 1.31664 16.8581 0.333313 19.3334 0.333313ZM0.666748 37.6666V33C0.666748 28.0533 8.39008 23.9933 18.1667 23.6666C17.4201 25.4866 17.0001 27.4466 17.0001 29.5C17.0001 32.51 17.8867 35.3333 19.3334 37.6666H0.666748Z" fill="#3E4861" />
                </svg>
                <h5>Property Valuation</h5>
                <p>
                Do you want to know the current value of your property? 
                </p>
                <Link legacyBehavior href="/dubai/book-valuation">
                    <a>
                        <button className="default_btn">Yes, please</button>
                    </a>
                </Link>
            </div>
        </section>
    );
}

export default infobarbuy;
