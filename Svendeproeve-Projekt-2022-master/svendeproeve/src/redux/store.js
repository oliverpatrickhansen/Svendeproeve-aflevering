import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modal/ModalSlice";
import authReducer from "../features/auth/authSlice";
import caseReducer from "../features/cases/caseSlice";
import sliderReducer from "../features/GlobalStates/sliderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    case: caseReducer,
    slider: sliderReducer,
  },
});
