import React, { Component } from "react";
import cmsService from "../../../../services/CMSService";
import TeamProfile from "./teamProfile";
import LazyLoad from "react-lazyload";
import Dropdown from "react-bootstrap/Dropdown";
class team extends Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
    this.state = {
      teamData: this.props.teamData,
      search: "",
      filteredOffice: "",
      filteredDepartment: "",
      teamCategory: "",
      popup: false,
      active: "11",
      JobTitles: false,
      offices: false,
      departments: false,
    };
  }
  handler() {
    this.setState({
      popup: false,
    });
  }
  componentDidMount() {
    // this.getFilters();
  }
  async getFilters() {
    var CMSService = new cmsService();
    var teamSearchFilters = await CMSService.teamSearchFilters();
    if (teamSearchFilters.props.status == 200) {
      this.setState({
        departments: teamSearchFilters.props.data["department"],
      });
      this.setState({ offices: teamSearchFilters.props.data["offices"] });
    }
  }
  async getTeamProfile(e, id) {
    e.preventDefault();
    this.setState({ active: id });
    this.setState({ popup: true });
  }
  handleChange = (event) => {
    const {
      target: { name, value },
      x,
    } = event;
    this.setState({ [name]: value });

    // To enable Server Side search
    // this.setState({ [name]: value }, () => {
    //   this.teamSearch();
    // });
  };
  handleChangeSelect = (event) => {
    var type = event.split("~");
    if (event == "All") {
      this.setState({ filteredOffice: false });
      this.setState({ filteredDepartment: false });
    }
    if (type[0] == "office") {
      this.setState({ filteredOffice: type[1] });
      this.setState({ filteredDepartment: false });
    }
    if (type[0] == "department") {
      this.setState({ filteredDepartment: type[1] });
      this.setState({ filteredOffice: false });
    }
  };
  deprtExists(arr,filteredDepartment) {
    return arr.some(function (el) {
      return (
        el.team_departments[0].DepartmentName === filteredDepartment
      );
    });
  }

  profileRender(data) {
    return (
      <LazyLoad height={200} offset={100} once scroll>
        <div className="col-12">
          <div>
            <img src={process.env.NEXT_PUBLIC_S3 + data.salesforceImageURL} />
            <h3>
              {data.firstName} {data.LastName}
            </h3>
            <p>
              office:
              {data["offices"] != null && data["offices"]["officeName"]}
            </p>
            <h5>{data.JobTitle}</h5>
            <a href={"tel:" + data.phone}>{data.phone}</a>

            <a onClick={(e) => this.getTeamProfile(e, data.id)} href={data.id}>
              Get in touch
            </a>
          </div>
        </div>
      </LazyLoad>
    );
  }
  render() {
    return (
      <>















        <div className="about-teams">
          <div className="float-left search-text col-12 p-5">
            <input
              type="text"
              className="search-input col-12 border-0 p-4"
              name="search"
              autoComplete="off"
              placeholder="Search Products"
              value={this.state.search}
              onInput={this.handleChange}
            />
          </div>
          <div className="row">
            {/* <Dropdown
              className="drop-down"
              name="offices"
              onSelect={(e) => this.handleChangeSelect(e)}
            >
              <Dropdown.Toggle id="dropdown-basic">Filter</Dropdown.Toggle>

              <Dropdown.Menu className="p-4">
                <Dropdown.ItemText eventKey="1">
                  <b>Offices</b>
                </Dropdown.ItemText>
                {this.state.offices && (
                  <>
                    {this.state.offices.map((Offices, key) => (
                      <Dropdown.Item eventKey={"office~" + Offices.officeName}>
                        {Offices.Area}
                      </Dropdown.Item>
                    ))}
                  </>
                )}
                <Dropdown.Divider />
                <Dropdown.ItemText eventKey="2">
                  <b>Department</b>
                </Dropdown.ItemText>
                {this.state.departments && (
                  <>
                    {this.state.departments.map((Department, key) => (
                      <Dropdown.Item
                        eventKey={"department~" + Department.DepartmentName}
                      >
                        {Department.DepartmentName}
                      </Dropdown.Item>
                    ))}
                  </>
                )}
                <Dropdown.Divider />
                <Dropdown.Item eventKey="All">
                  <b>All</b>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </div>
          {/* {this.state.popup && (
            <div className="popup active">
              <TeamProfile action={this.handler} id={this.state.active} />
            </div>
          )} */}
          <div className="row list">
            {/* {JSON.stringify(this.state.teamData.data)} */}
            {this.state.teamData.data.length && (
              <>
                {this.state.teamData.data
                  .filter(
                    (person) =>
                      (person.firstName || "")
                        .toLowerCase()
                        .includes(this.state.search) ||
                      (person.LastName || "")
                        .toLowerCase()
                        .includes(this.state.search)
                  )
                  .map((filteredPerson) => (
                    <>
                      {this.state.filteredOffice ||
                      this.state.filteredDepartment ? (
                        <>
                          {this.state.filteredOffice ? (
                            <>
                              {filteredPerson["offices"] != null && (
                                <>
                                  {filteredPerson["offices"]["officeName"] ==
                                    this.state.filteredOffice && (
                                    <>{this.profileRender(filteredPerson)}</>
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {this.state.filteredDepartment && (
                                <>
                                  {filteredPerson["AddDepartment"] != null && (
                                    <>
                                      {this.deprtExists(
                                        filteredPerson["AddDepartment"], this.state.filteredDepartment,
                                      ) && <>{this.profileRender(filteredPerson)}</>}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <>{this.profileRender(filteredPerson)}</>
                      )}
                    </>
                  ))}
              </>
            )}
            {/* {this.state.teamData.filter(searchItems=> searchItems.firstName.includes("na")).map((searchItem, searchIndex) => (
              <div className="col-3">
                <div>
                  <img
                    src={
                      process.env.NEXT_PUBLIC_S3 + searchItem.salesforceImageURL
                    }
                  />
                  <h3>
                    {searchItem.firstName} {searchItem.LastName}
                  </h3>
                  <h5>{searchItem.JobTitle}</h5>
                  <a href={"tel:" + searchItem.phone}>{searchItem.phone}</a>

                  <a
                    onClick={(e) => this.getTeamProfile(e, searchItem.id)}
                    href={searchItem.id}
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </>
    );
  }
}

export default team;
