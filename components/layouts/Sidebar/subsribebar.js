import Link from "next/link"


export default function Subscribebar() {
    return (
            <div className="alert container">
                <div>
                  <span className="alert_title">Subscribe to Newsletter</span>
                  <p className="alert_desc">
                  Receive a round-up of all the important news in one go!
                  </p>
                </div>
                <Link legacyBehavior href={"/dubai/subscribe"} >
                  <a>
                    <button className="subscribe">
                    Subscribe
                    </button>
                  </a>
                </Link>
              </div>
    )
}