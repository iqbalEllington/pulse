import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserData } from "../../../getUserData/Action/UserDataAction";
import {getAuthData} from "../../../../store/actions/auth/LoginAction"
class wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
    };
  }
  static async getDerivedStateFromProps(props, state) {
    // dispatch(getUserData);
    // var data = await getAuthData();
  }

  render() {
    return <div>      
      <form className="row">
        <input className="col-10 mt-5 p-5" type="text" placeholder="subject"></input>
        <textarea className="col-10 mt-5 p-5" placeholder="message"></textarea>
        <input className="btn btn-success col-10 mt-5 border p-4" type="submit"></input>
      </form>
    </div>;
  }
}

const mapStateToProps = (state) => {
    return {
      suggestions: state.searchReducer.suggestions
    };
  };
  const mapDispachToProps = (dispatch) => {
    return {
        // putSearchParam: dispatch(setSearchResults(data))
    };
  };
  export default connect(mapStateToProps, mapDispachToProps)(wizard);
