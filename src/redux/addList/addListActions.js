import {fireDatabase} from "../../lib/firebase";
import moment from "moment";
import {actionsAddList} from "./addListSlice";

const actions = {
  createAddList: payload => (dispatch) => {
    fireDatabase.ref(`addList/${payload.userUid}`).push({
      key: payload.key,
      name: payload.name,
      enter: moment().format('YYYY-MM-DD'),
      expire: moment().format(),
    })
  },
  listenAddList: payload => (dispatch) => {
    fireDatabase.ref(`addList/${payload}/`).on('value', data => {
      console.log('addList Listener');
      dispatch(actionsAddList.listenAddList(data.val()));
    });
  },
  updateAddListItem: payload => (dispatch) => {
    fireDatabase.ref(`addList/${payload.userUid}/${payload.key}/${payload.path}`).set(payload.data);
  }
};

export default actions;
