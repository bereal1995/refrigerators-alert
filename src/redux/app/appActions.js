import {actionsApp} from "./appSlice";

const actions = {
  appLoading: payload => (dispatch) => {
    dispatch(actionsApp.appLoading(payload.loading));
  },
};

export default actions;
