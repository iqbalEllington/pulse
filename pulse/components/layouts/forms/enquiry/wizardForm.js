import React, { Component } from "react";
import CMSService from "../../../../services/CMSService";
import Link from "next/link";
import Qa from "./qa";
import Router from "next/router";

class wizardForm extends Component {
  constructor(props){
    super(props);
    this.state={
      nextqUrl:"#"
    }
  }
  componentDidMount() {
    this.setqa();
  }
  async setqa() {
    try {
      if (Object.keys(this.props.urlData).length >= 1) {
        this.setState({
          nextqUrl:
            `/dubai/mortgages/mortgage-enquiry/` +
            this.props.form +
            "/" +
            this.props.urlData.slug[1],
        });
      } else {
        var form = await this.getForm();
        this.setState({
          nextqUrl:
            `/dubai/mortgages/mortgage-enquiry/` +
            this.props.form +
            "/" +
            form.props.data.starterQuestion.id,
        });
      }
    } catch (exception) {
      console.log(exception);
    }
  }
  async getForm() {
    var cmsServiceInstance = new CMSService();
    return await cmsServiceInstance.getWizardForm(this.props.form);
  }
  render() {
    return (  
      <div>
        {this.props.form && Object.keys(this.props.urlData).length < 1 ? (
          <Link
            // onClick={() => this.setqa()}
            href={this.state.nextqUrl}
          >
            Start Wizard
          </Link>
        ) : (
          <>
            <Qa form={this.props.form} q={this.props.urlData.slug[1]} />
          </>
        )}
      </div>
    );
  }
}

export default wizardForm;
