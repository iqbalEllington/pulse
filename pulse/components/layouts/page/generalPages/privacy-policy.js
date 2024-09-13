import Link from "next/link"
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from "react-markdown";
import Seotags from "../../../utility/seotags";

function PrivacyPolicy(props) {
    return (

        <>

            <Seotags pageTitle={"Privacy & Cookies Policy | Allsopp & Allsopp"} metaDescription={"Privacy & Cookies"} image={false} />

            <div className="devider"></div>
            <div className="first_content container">
                <div className="breadcrumbs navigation">
                    <span className="overlay" />
                    <Link legacyBehavior href="/"><a>Home</a></Link><i className="fa-solid fa-angle-right" />
                    <Link legacyBehavior href="/privacy-and-cookies-policy"><a>Privacy  &amp; Cookies Policy</a></Link>
                </div>
            </div>
            <section class="mt-2">
                <div className='container terms-content'>
                    <div className="item-page share-link-hide" itemScope itemType="https://schema.org/Article">
                        <meta itemProp="inLanguage" content="en-GB" />
                        <header className="article__head animate is--animated">
                            <h1 className="h2" itemProp="headline">Privacy  &amp; Cookies Policy</h1>
                        </header>
                    </div>
                    <div itemProp="articleBody" className="article__body animate is--animated react-markdown">
                        <ReactMarkdown className="rounded-frame" rehypePlugins={[rehypeRaw]} children={props.privacy}
                            escapeHtml={false}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
export default PrivacyPolicy;