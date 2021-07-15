import {fireDatabase} from "../../lib/firebase";
import {actionsItemList} from "./itemListSlice";

const actions = {
  listenItemList: payload => (dispatch) => {
    fireDatabase.ref(`itemList/${payload}/`).on('value', data => {
      console.log('itemList Listener');
      dispatch(actionsItemList.listenItemList(data.val()));
    });
  },
};

export default actions;
