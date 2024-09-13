import React, { Component } from "react";
import teamSearch from "../../../../services/CMSService";
import { getYoutubeURL } from "../../../../services/utilsService";
import Wizard from "../../forms/enquiry/wizardLoged";
class teamProfile extends Component {
  constructor(props) {
    super(props);
    this.handlers = this.handlers.bind(this);
    this.state = {
      profileData: "",
      search: "",
      enquiryFormData: false,
      popup: false,
      filterData: true,
    };
  }
  componentDidMount() {
    this.getTeamProfile(this.props.profileId);
  }
  async getTeamProfile(id) {
    var TeamSearchInstance = new teamSearch();

    var result = await TeamSearchInstance.getProfile(this.props.id);
    if (result.props.status == 200) {
      this.setState({ profileData: result.props.data });
    }
  }
  async getTeamFilter() {
    var TeamSearchInstance = new teamSearch();
    var result = await TeamSearchInstance.teamSearchFilters();
    if (result.props.status == 200) {
      this.setState({ filterData: result.props.data });
    }
  }
  handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value }, () => {
      this.teamSearch();
    });
  };
  async openEnquiryForm(e, Name, email) {
    e.preventDefault();

    this.setState({
      enquiryFormData: {
        name: Name,
        email: email,
      },
    });
    this.setState({ popup: true });
  }
  handlers() {
    this.setState({
      popup: false,
    });
  }
  render() {
    return (
      <>
        {this.state.popup && (
          <div className="popup active">
             <button
                onClick={this.handlers}
                style={{
                  background: "#ccc",
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                X
              </button>
            <Wizard data={this.state.enquiryFormData} />
          </div>
        )}
        {this.state.profileData != "" && (
          <>
            <div
              className="profileData"
              style={{ overflow: "scroll", width: "100%", height: "100%" }}
            >
              <img
                src={
                  process.env.NEXT_PUBLIC_S3 +
                  this.state.profileData.salesforceImageURL
                }
              />
              <h4>
                {this.state.profileData.firstName}{" "}
                {this.state.profileData.LastName}
              </h4>
              <p>
                <a href={"tel:" + this.state.profileData.phone}>Phone</a>
              </p>
              {this.state.profileData.whatsapp && (
                <p>
                  <a
                    href={
                      "https://api.whatsapp.com/send?phone=" +
                      this.state.profileData.whatsapp
                    }
                  >
                    Whatsapp
                  </a>
                </p>
              )}
              <p>
                <a
                  onClick={
                    ((e) =>
                      this.openEnquiryForm(
                        e,
                        (this.state.profileData.firstName + " "+
                          this.state.profileData.LastName),
                       this.state.profileData.email)
                      )
                  }
                  href={"mailto:" + this.state.profileData.email}
                >
                  mail
                </a>
              </p>
              <h5>{this.state.profileData.JobTitle}</h5>

              {this.state.profileData.profileIntro != "" && (
                <p>{this.state.profileData.profileIntro}</p>
              )}
              {this.state.profileData.ProfileVideoURL && (
                <div className="col-12 row">
                  <div className="slider-nav col-12">
                    <iframe
                      width="420"
                      height="315"
                      src={getYoutubeURL(
                        this.state.profileData.ProfileVideoURL,
                        "?ecver=2?autoplay=1"
                      )}
                    ></iframe>
                  </div>
                </div>
              )}

              <p style={{ whiteSpace: "pre-wrap" }}>
                {this.state.profileData.ProfileSummery}
              </p>
              <button
                onClick={this.props.action}
                style={{
                  background: "#ccc",
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                X
              </button>
            </div>
          </>
        )}
      </>
    );
  }
}

export default teamProfile;
