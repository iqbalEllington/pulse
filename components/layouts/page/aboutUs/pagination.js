import React, { Component } from "react";
import Link from "next/link";
import { GrFormPrevious, GrFormNext } from "react-icons/gr"


class pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 0,
      showPagesAccess: 4,
      fromPage: 1,
      lastPage: 1,
      url: "",
      currentPages: this.props.currentPage
    };
  }

  componentDidMount() {
    this.paginate();
    let current = window.location.pathname + window.location.search;
    var result = /[^/]*$/.exec(current)[0];
    let results = result.includes("page");
    if (results) {
      this.setState({ url: current.substr(0, current.lastIndexOf("/")) });
    } else {
      this.setState({ url: current });
    }

  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentPage !== this.props.currentPage || prevProps.resultCount!==this.props.resultCount) {
      this.paginate();
    }
  }
  async paginate() {
    let totalPages = Math.ceil(this.props.resultCount / this.props.pageCount);
    if (totalPages > 0) {
      await this.setState({ totalPages: totalPages });
    }

    if (totalPages < this.state.showPagesAccess) {
      await this.setState({ fromPage: 1 });
    } else if (this.props.currentPage <= this.state.showPagesAccess / 2) {
      await this.setState({ fromPage: 1 });
    } else {
      await this.setState({ fromPage: Math.ceil(this.props.currentPage - (this.state.showPagesAccess / 2)) })
    }
    if ((this.state.fromPage + this.state.showPagesAccess) > totalPages) {
      if (totalPages - this.state.showPagesAccess > 0) {
        this.setState({ fromPage: totalPages - this.state.showPagesAccess });
      } else {
        this.setState({ fromPage: 1 });
      }
      this.setState({ lastPage: totalPages });
    } else {
      if (
        (this.state.fromPage + (this.state.showPagesAccess)) >=
        totalPages
      ) {
        this.setState({ lastPage: this.state.totalPages });
      } else {
        this.setState({
          lastPage: this.state.fromPage + this.state.showPagesAccess,
        });
      }
    }
  }
  getPagination(pages) {
    let content = [];
    for (let i = this.state.fromPage; i <= this.state.lastPage; i++) {
      const item = i;
      content.push(
        <Link legacyBehavior passHref scroll={true} href={this.state.url + "/page-" + i}>
          <a className={this.props.currentPage == i ? "active" : "paginate"}>
            <>{i}</>
          </a>
        </Link>
      );
    }
    return content;
  }
  paginationURL() {
    let results = result.includes("page");

  }
  render() {
    return (
      <div className="pagination container center">
        <div className="d-flex center justify-content-center col-12 pages">
          {this.props.currentPage != 1 &&
            <Link legacyBehavior passHref scroll={true} href={this.state.url + "/page-" + (this.props.currentPage - 1)}>
              <a className={"previous"}>
                <><GrFormPrevious /></>
              </a>
            </Link>
          }
          {this.state.totalPages > 5 && this.props.currentPage > 6 &&(
                     <>
                     <Link legacyBehavior passHref scroll={true} href={this.state.url + "/page-1"}>
                       <a href={this.state.url + "/page-1"}>
                         <>1</>
                       </a>
                     </Link>...
                   </>
          )}

          {this.props.resultCount > 1 && (
            <div>
              {this.getPagination(this.state.totalPages)}
            </div>
          )}
          {(this.state.fromPage + this.state.showPagesAccess) < this.state.totalPages &&
            <>...
              <Link legacyBehavior passHref scroll={true} href={this.state.url + "/page-" + this.state.totalPages}>
                <a href={this.state.url + "/page-" + this.state.totalPages}>
                  <>{this.state.totalPages}</>
                </a>
              </Link>
            </>
          }
          {this.props.currentPage < this.state.totalPages &&
            <Link legacyBehavior passHref scroll={true} href={this.state.url + "/page-" + (parseInt(this.props.currentPage) + 1)}>
              <a className={"next"}>
                <><GrFormNext /></>
              </a>
            </Link>
          }
        </div>
      </div>
    );
  }
}
export default pagination;
