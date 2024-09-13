import React, { Component } from "react";
import CMSService from "../../../../services/CMSService";
import { saveAnswer } from "../../../../store/redux/wizardForm/action/wizardForm";
// import Link from "next/link";
import { connect } from "react-redux";
import Router from "next/router";
import Citysuggession from "../citysuggession";
class qa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: false,
      questionId: this.props.q,
      answers: false,
      budget: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  async saveAnswer(question, answer, link, button) {
    await this.props.saveAnswer(this.state.question, answer, question);
    if (link && button != true) {
      this.getq(link);
    }
  }
  componentDidMount() {
    this.getq(this.props.q);
    // var question=this.props(q)
  }
  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      // this.calculate();
    });
  }
  async getq(q) {
    var cmsService = new CMSService();
    var questions = await cmsService.getWizardFormQ(q);
    if (questions.props.status == 200) {
      this.setState({
        question: questions.props.data.Question,
        questionId: questions.props.data.id,
        answers: questions.props.data.wizard_form_answers,
      });
      Router.push(
        `/dubai/mortgages/mortgage-enquiry/` +
          this.props.form +
          "/" +
          questions.props.data.id
      );
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps.q)
  }
  nextq() {
    // Router.push(
    //   `/dubai/mortgages/mortgage-enquiry/`+
    //     this.props.form +
    //     "/" +
    //     questions.props.data.id
    // );
  }
  render() {
    return (
      <div className="text-center mt-5">

        {this.state.question && (
          <div className="q-box bg-white">
            <h2>{this.state.question}</h2>
            <div className="mt-5 text-left">
              {this.state.answers && (
                <>
                  {this.state.isMultiSelect ? (
                    <>
                      {this.state.answers.map((key, value) => (
                        <div key={value} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            //   for="flexCheckDefault"
                          >
                            Default checkbox
                          </label>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {this.state.answers.map((key, value) => (
                        <div
                          key={value}
                          onClick={() =>
                            this.saveAnswer(
                              this.state.questionId,
                              key.answer,
                              key.wizard_form_quest,
                              key.withButton
                            )
                          }
                          className="form-check"
                        >
                          {key.answerType == "AnswerBox" && (
                            <span>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id={"answer" + value}
                              />
                              <label
                                className="form-check-label"
                                // for={"answer" + value}
                              >
                                {key.answer}
                              </label>
                            </span>
                          )}

                          {key.answerType == "text" && (
                            <span>
                              <input
                                className="form-check-input"
                                type="text"
                                name="flexRadioDefault"
                                id={"answer" + value}
                              />
                            </span>
                          )}

                          {key.answerType == "BigText" && (
                            <span>
                              <textarea
                                className="form-check-input"
                                type="text"
                                name="flexRadioDefault"
                                id={"answer" + value}
                              />
                            </span>
                          )}

                          {key.answerType == "Range" && (
                            <div className="col-12 row">
                              <span className="col-6 text-left">
                                {key.rangeMin}
                              </span>
                              <span className="col-6 text-right">
                                {key.rangeMax}
                              </span>
                              <input
                                type="range"
                                className="form-range col-12 my-5"
                                min={key.rangeMin}
                                ref="term"
                                name="budget"
                                value={this.state.budget}
                                onChange={(e) => this.handleChange(e)}
                                max={key.rangeMax}
                                id="terRange"
                              />
                              your Budget: {this.state.budget}
                            </div>
                          )}
                          {key.answerType == "Search" && (
                            <div className="row">
                              <div className="col-12">
                                <label></label>
                                <Citysuggession placeHolder={key.placeHolder} />
                              </div>
                              <p className="col-12">{key.answerNotes}</p>
                            </div>
                          )}
                          {key.answerType == "date" && (
                            <span>
                              <textarea
                                className="form-check-input"
                                type="range"
                                name="flexRadioDefault"
                                id={"answer" + value}
                              />
                            </span>
                          )}
                          {key.answerType == "DateTime" && (
                            <span>
                              <textarea
                                className="form-check-input"
                                type="range"
                                name="flexRadioDefault"
                                id={"answer" + value}
                              />
                            </span>
                          )}
                          {key.answerType == "Selectbox" && (
                            <span>
                              <textarea
                                className="form-check-input"
                                type="range"
                                name="flexRadioDefault"
                                id={"answer" + value}
                              />
                            </span>
                          )}

                          {key.withButton && (
                            <>
                              <button
                                onClick={() =>
                                  this.saveAnswer(
                                    this.state.questionId,
                                    key.id,
                                    key.wizard_form_quest,
                                    false
                                  )
                                }
                              >
                                Continue
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};
const mapDispachToProps = (dispatch) => {
  return {
    saveAnswer: (question, answer, qid) =>
      dispatch(saveAnswer(question, answer, qid)),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(qa);
