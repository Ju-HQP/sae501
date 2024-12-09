import { combineReducers } from "redux";

import project from "./project/projectSlice";
import volunteer from "./volunteer/volunteerSlice";
import actuality from "./actuality/actualitySlice";

export default combineReducers({ project, volunteer, actuality });