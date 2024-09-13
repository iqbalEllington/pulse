import * as Types from "../../../Types";
const initialState = {
  questionsAnswered: []
};
const wizardAnswer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_QA:
      var questionsAnswered=state.questionsAnswered;
      questionsAnswered[action.payload.qid] = action.payload;
      return {
        ...state,
        questionsAnswered: questionsAnswered,
      };
      default:
        return {
          ...state,
        };
        break;
  }
};
export default wizardAnswer;