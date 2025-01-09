import { combineReducers } from "redux";

import project from "./project/projectSlice";
import volunteer from "./volunteer/volunteerSlice";
// import user from './user/userSlice';

export default combineReducers({ project, volunteer });