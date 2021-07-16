import {fireDatabase} from "../../lib/firebase";
import {actionsItemList} from "./itemListSlice";

const actions = {
  listenItemList: payload => (dispatch) => {
    fireDatabase.ref(`itemList/${payload}/`).on('value', data => {
      console.log('itemList Listener');
      dispatch(actionsItemList.listenItemList(data.val()));
    });
  },
  updateItemList: payload => (dispatch) => {
    fireDatabase.ref(`itemList/${payload.userUid}/${payload.key}/${payload.path}`).set(payload.data);
  },
};

export default actions;
