import { combineReducers } from "redux";
import RegisterReducer from "./reducers/auth/RegisterReducer";
import AuthReducer from "./reducers/auth/AuthReducer";
import UserDataReducer from "../components/getUserData/Reducer/UserDataReducer";
import UserReducer from "./reducers/user/UserReducer";
import searchReducer from "./reducers/search/searchReducer";
import propertyReducer from "./reducers/property/propertyReducer";
import wizardAnswer from "./redux/wizardForm/reducer/wizardAnswer";
import SettingState from "./setting/reducers"
import NavReducer from "./reducers/nav/nav"
export default combineReducers({
  authReducer: AuthReducer,
  registerReducer: RegisterReducer,
  UserDataReducer: UserDataReducer,
  UserReducer: UserReducer,
  setting: SettingState,
  searchReducer:searchReducer,
  propertyReducer:propertyReducer,
  wizardAnswer:wizardAnswer,
  NavReducer:NavReducer
});
