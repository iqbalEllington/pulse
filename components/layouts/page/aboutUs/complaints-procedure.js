import { useEffect, useState } from "react";
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Seotags from "../../../utility/seotags";

function complaintsProcedure(props) {
  const [readmore, setReadmore] = useState(false)
  return (

    <>
      {props.pageData.staticPage[0] != null ?
        <Seotags pageTitle={props.pageData.staticPage[0].attributes.SEO.pageTitle} metaDescription={props.pageData.staticPage[0].attributes.SEO.metaDescription} image={props.pageData.staticPage[0].attributes.featuredImage.data != null ? props.pageData.staticPage[0].attributes.featuredImage.data.attributes.url: false} />
        :
        <Seotags pageTitle={props.pageData.staticPage[0].attributes.MainTitile} metaDescription={props.pageData.staticPage[0].attributes.description} image={props.pageData.staticPage[0].attributes.featuredImage.data != null ? props.pageData.staticPage[0].attributes.featuredImage.data.attributes.url: false} />
      }
      <div className="devider pb-0"></div>
      <div className="container">
        <div className="navigation breadcrumbs">
          <span className="overlay" />
          <Link legacyBehavior href={"/"}><a>Home</a></Link><i className="fa-solid fa-angle-right" />
          <Link legacyBehavior href="/dubai/about-us/complaints-procedure"><a>Complaints Procedure</a></Link>
        </div>
      </div>
      <div className="devider pb-0"></div>

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
            {/* <button className="read_more_btn" onClick={() => setReadmore(!readmore)} id="read_tower_desc">
              {readmore == true ?
                <>Read Less</>
                : <>Read More</>
              }
            </button> */}

          </div>
        </div>
      </section>
    </>

  )
}

export default complaintsProcedure;