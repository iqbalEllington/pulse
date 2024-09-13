import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPropertyURL } from "../../../../services/propertyService";
import { useRouter } from 'next/router'

function NotFound(props) {
    const [is404, setIs404] = useState(false);
    const router = useRouter();
    const navigate = (url) => {
        router.push(url);
    };

    useEffect( () => {
        try{
        }catch (error) {
            console.log(error)
        }
        
    }, [navigate]);
    return (
        <div>
            <div className='devider'></div>
            {is404 && (
                 <>
                 <section className=''>
                     <div className='container mx-auto text-center'>
                         <img className='col-12 not-found-img' src="/images/404.gif" />
                         <h1 className='col-12 color-primary mt-3'>This is Awkward…</h1>
                         <p style={{ fontSize: "1.4rem" }} className="mb-5 color-primary">The page you want is either missing or the url has changed</p>
 
                     </div>
                     <div className='devider'></div>
                     <div className='container mx-auto text-center'>
                         <div>
                             <h2 className='color-primary mt-4'>
                                 Lets find what you were looking for
                             </h2>
 
                             <div className='col-12 mt-4 notfound-bottons'>
                                 <div className='mr-2'><Link legacyBehavior href='/dubai/properties/residential/sales'>
                                     <a className='mr-2'>
                                         <button className='btn primary_btn'>
                                             Site Search
                                         </button>
                                     </a>
                                 </Link>
                                 </div>
                                 <div>
                                 <Link legacyBehavior href='/dubai/contact'>
                                     <a>
                                         <button className='btn default_btn'>
                                         Contact
                                         </button>
                                     </a>
                                 </Link>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </section>
             </>
            )}
        </div>
    );
}

export default NotFound;