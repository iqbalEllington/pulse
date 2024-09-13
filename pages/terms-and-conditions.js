import React, { Component } from 'react';
import MainLayout from '../components/layouts/Layout';
import Terms from '../components/layouts/page/generalPages/terms';

function termsAndCondition(props) {
    return (
            <MainLayout>
                    <Terms terms={props.data}/>
            </MainLayout>
        );
}

export async function getServerSideProps({ req, res, resolvedUrl }) {
    // let resolvedUrl='/dubai/landlords/home-maintenance-services-dubai'
try {
    const resp = await fetch(
      process.env.SEARCH_API + "/cms/terms-and-conditions"
    );
    if (resp.ok) {
      const data = await resp.json();
      if (data.status == 200) {
        // Pass data to the page via props
        // console.log(data.data.terms.data.attributes.termsContent)
        return {
          props: {
            status: 200,
            page: "terms",
            data: data.data.terms.data.attributes.termsContent,
          },
        };
      } else {
        return {
          props: {
            status: 410,
            reason: "Server Down",
          },
        };
      }
    } else {
      return {
        props: {
          status: 410,
          reason: "Server Down",
        },
      };
    }
} catch (err) {
  console.log(err, "error")
  return {
    props: {
      status: 410,
      reason: "Server Down",
    },
  };
}
}

export default termsAndCondition;