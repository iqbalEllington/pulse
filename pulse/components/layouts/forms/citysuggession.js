import React, { Component } from "react";
import { connect } from "react-redux";
import { getSugessions } from "../../../store/actions/search/searchAction";
class citysuggession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      areas: [],
      dAreas:[]
    };
  }
  // Search Sugession
  handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value }, () => {
      this.props.getSugessions(this.props.searchParams, this.state.search);
    });
  };
  locationClick(area,show) {
    // d=area;
    // area = area.replace(/\s+/g, "-").toLowerCase();
    if (this.state.areas.indexOf(area) === -1) {
      var araeas = this.state.areas.concat(area);
      // araeas.push(area);
      var dAreas=this.state.areas.concat(area);
      this.setState({ dAreas: araeas });
      this.setState({ areas: araeas });
      this.setState({ search: "" });
    }
  }
  render() {
    return (
      <div>
        <div className="float-left search-text">
          <input
            type="text"
            className="search-input col-12 border-0 p-3 mb-3"
            name="search"
            autoComplete="off"
            placeholder={this.props.placeHolder}
            value={this.state.search}
            onInput={this.handleChange}
          />
          {this.state.areas.length>0 && this.state.areas.map((key, areas) => (
                <>{key},</>
              ))}
        </div>
        {this.state.search.length > 0 &&
          this.props.suggestions.data.length > 0 && (
            <div className="search-suggestion-area">
              {this.props.suggestions.data.map((searchItem, searchIndex) => (
                <div className="search-suggestion" key={searchIndex}>
                  <div
                    onClick={() =>
                      this.locationClick(
                        searchItem.fields.area_codes_aa__c +
                          "-" +
                          searchItem.fields.name,
                          searchItem.fields.name
                      )
                    }
                    className="float-left"
                  >
                    <h5 className="search-title">
                      {searchItem.fields.name} ({searchItem.fields.count})
                    </h5>
                    {/* <p> {this.props.searchItem.fields.Name}</p> */}
                  </div>

                  <div className="clearfix"></div>
                </div>
              ))}
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    suggestions: state.searchReducer.suggestions,
    searchParams: state.searchReducer.searchParams,
    isSearched: state.searchReducer.isSearched,
    isSuggested: state.searchReducer.isSuggested,
    total: state.searchReducer.searchData.total,
    filters: state.searchReducer.filterData,
  };
};
const mapDispachToProps = (dispatch) => {
  return {
    putSearchParam: (paramKey, paramValue) =>
      dispatch(putSearchParam(paramKey, paramValue)),
    getSugessions: (data, search) => dispatch(getSugessions(data, search)),
    setResult: (data) => dispatch(setResult(data)),
    setSearchResults: (data) => dispatch(setSearchResults(data)),
  };
};
export default connect(mapStateToProps, mapDispachToProps)(citysuggession);
