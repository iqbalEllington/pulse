import { useEffect, useState } from "react";
import Testimonials from "../../Sidebar/testimonials";
import BookValuationForm from "../home/bookValuation";
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from "react-markdown";
import Newsbox from "../../Sidebar/newsbox";
import Link from "next/link";
import Seotags from "../../../utility/seotags";
function salesProgression(props) {
  const [readmore, setReadmore] = useState(false)
  return (

    <>
      {props.pageData.staticPage[0].attributes.SEO != null ?
        <Seotags pageTitle={props.pageData.staticPage[0].attributes.SEO.pageTitle} metaDescription={props.pageData.staticPage[0].attributes.SEO.metaDescription} image={props.pageData.staticPage[0].attributes.featuredImage.data != null ? props.pageData.staticPage[0].attributes.featuredImage.data.attributes.url : false} />
        :
        <Seotags pageTitle={props.pageData.staticPage[0].attributes.MainTitile} metaDescription={props.pageData.staticPage[0].attributes.description} image={props.pageData.staticPage[0].attributes.featuredImage.data != null ? props.pageData.staticPage[0].attributes.featuredImage.data.attributes.url : false} />
      }
      <div className="devider pb-0"></div>
      {/* ================================= Careers ================================= */}
      <div className="container">
        <div className="navigation breadcrumbs">
          <span className="overlay" />
          <Link legacyBehavior href={"/"}><a>Home</a></Link><i className="fa-solid fa-angle-right" />
          <Link legacyBehavior href="/dubai/sellers/sales-progression"><a>Sales Progression</a></Link>
        </div>
      </div>
      {/* ================================= Modules Banner ================================= */}
      <div className="modules_banner" style={{ background: 'url("' + props.pageData.staticPage[0].attributes.featuredImage.data.attributes.url + '")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <div className="container">
          <span>{props.pageData.staticPage[0].attributes.description}</span>
          <h1>{props.pageData.staticPage[0].attributes.MainTitile}</h1>

        </div>
      </div>
      <section className="last_content_daynamic">
        <div className="container">
          <div className="desc col-12 col-md-9 mx-auto">
            <>
              <ReactMarkdown className="rounded-frame" rehypePlugins={[rehypeRaw]} children={props.pageData.staticPage[0].attributes.contentVisible}
                escapeHtml={false}
              />

            </>
            <div className={readmore == true ? "read_more-show readmore-content" : "readmore-content"}>
              {props.pageData.staticPage[0].attributes.contentMore != null &&
                <>
                  <ReactMarkdown className="rounded-frame" rehypePlugins={[rehypeRaw]} children={props.pageData.staticPage[0].attributes.contentMore}
                    escapeHtml={false}
                  />

                </>
              }
            </div>
            <button className="read_more_btn" onClick={() => setReadmore(!readmore)} id="read_tower_desc">
              {readmore == true ?
                <>Read Less</>
                : <>Read More</>
              }
            </button>

          </div>
        </div>
      </section>
      <BookValuationForm video={false} />

      <div className="devider"></div>
      <section className='p-0-md mb-0 mt-4'>
        <div className='container'>
          <Newsbox filter="sales" preloaded={false} />
        </div>
      </section>
      {/* ================================= Our Offices ================================= */}
      {/* <section className="slider-testimonials mb-0 mt-0">
        <Testimonials />
      </section> */}
    </>

  )
}

export default salesProgression;