import * as Types from "../../../Types";

export const saveAnswer = (question, answer, qid) => {
  return async (dispatch) => {
    function onSuccess(SuccessData) {
      // dispatch({ type: CREATE_USER, payload: success });
      dispatch(actionSaveAnswer(SuccessData));
      return;
    }
    function onError(error) {
      console.log(error);
    }
    try {
      var payloads = {
        question: question,
        answer: answer,
        qid: qid,
      };

      return onSuccess(payloads);
    } catch (error) {
      return onError(error);
    }
  };
};
const actionSaveAnswer = (qanswer) => ({
  type: Types.SET_QA,
  payload: qanswer,
});
