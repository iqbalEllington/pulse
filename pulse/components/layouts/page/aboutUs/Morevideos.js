import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_SEARCH_COUNT } from '../../../../services/constant';
import { setInfinitySearch } from '../../../../store/actions/search/searchAction';

function Morevideos(props) {
  const dispatch = useDispatch()
  const { ref, inView, entry } = useInView({

    /* Optional options */
    threshold: 0,
  });
  useEffect(() => {
    if (props.total > DEFAULT_SEARCH_COUNT && props.searchData.data.hits.length < props.total) {
      let current = window.location.href;
      var result = /[^/]*$/.exec(current)[0];
      let results = result.includes("page");
      let currentPage= Math.floor(props.searchData.data.hits.length/DEFAULT_SEARCH_COUNT)
      if (results) {
       let url = current.substr(0, current.lastIndexOf("/"));
        window.history.pushState({}, null, url + "/page-"+(parseInt(currentPage)+1))+"?inf=true";
      } else {
          window.history.pushState({}, null, current + "/page-"+(parseInt(currentPage)+1))+"?inf=true";
      }
      // page-" + searchParams.pagevar result = /[^/]*$/.exec("foo/bar/test.html")[0];

      dispatch(setInfinitySearch('dubai/properties/residential/sales/in-areas-dmr-dubai-marina'));
    }
  }, [inView])
  return (
    <div ref={ref}>
      <h2>{`Header inside viewport ${inView}.`}

        {inView &&
          <div>

          </div>
        }
      </h2>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    searchData: state.searchReducer.searchData,
    total: state.searchReducer.searchData.total,
  };
};
export default connect(mapStateToProps)(Morevideos)