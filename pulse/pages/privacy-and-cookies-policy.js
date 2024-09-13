import React, { Component } from 'react';
import MainLayout from '../components/layouts/Layout';
import PrivacyPolicy from '../components/layouts/page/generalPages/privacy-policy';

function termsAndCondition(props) {
    return (
            <MainLayout>
                    <PrivacyPolicy privacy={props.data}/>
            </MainLayout>
        );
}

export async function getServerSideProps({ req, res, resolvedUrl }) {
    // let resolvedUrl='/dubai/landlords/home-maintenance-services-dubai'
try {
    const resp = await fetch(
      process.env.SEARCH_API + "/cms/priacy-policy"
    );
    if (resp.ok) {
      const data = await resp.json();
      if (data.status == 200) {
        // Pass data to the page via props
        return {
          props: {
            status: 200,
            page: "offplan",
            data: data.data.privacy.data.attributes.privacyPolicy,
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