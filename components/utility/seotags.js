import Head from "next/head"
import { useRouter } from 'next/router'

function Seotags(params) {
    const { asPath } = useRouter()

    return (
        <Head>
            <title>
                {params.pageTitle}
            </title>
            <Link legacyBehavior rel="alternate" hreflang="en-ae" href={"https://www.allsoppandallsopp.com"+asPath} />
            <Link legacyBehavior rel="alternate" hreflang="en-us" href={"https://www.allsoppandallsopp.com"+asPath} />
            <Link legacyBehavior rel="alternate" hreflang="en-gb" href={"https://www.allsoppandallsopp.com"+asPath}/>
            <Link legacyBehavior rel="alternate" hreflang="en" href={"https://www.allsoppandallsopp.com"+asPath} />
            <Link legacyBehavior rel="alternate" hreflang="x-default" href={"https://www.allsoppandallsopp.com"+asPath} />

            <meta property="og:title" content={params.pageTitle} />
            <meta property="og:description" content={params.metaDescription} />
            <meta name="description" content={params.metaDescription}></meta>
            <meta property="twitter:card" content={params.pageTitle} />
            <meta property="twitter:title" content={params.pageTitle} />
            <meta property="twitter:description" content={params.metaDescription} />
            <meta property="og:site_name" content="Allsopp and Allsopp" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="" />
            <meta property="twitter:url" content="" />
            <meta property="twitter:image" content={params.image}></meta>
            <meta property="og:image" itemprop="image" content={params.image} />
            {params.index &&
                <>
                    {params.index.isIndex == false &&
                        <>
                            <meta name="robots" content="noindex" />
                        </>}
                    {params.index.isFollow == false &&
                        <>
                            <meta name="robots" content="nofollow" />
                        </>}
                </>}
        </Head>
    )
}
export default Seotags