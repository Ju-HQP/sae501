import { combineReducers } from "redux";

import project from "./project/projectSlice";
import volunteer from "./volunteer/volunteerSlice";

export default combineReducers({ project, volunteer });