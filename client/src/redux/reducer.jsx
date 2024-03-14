import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "../redux/theme"


const rootReducer = combineReducers({

  theme: themeSlice,
  
});
export { rootReducer };
