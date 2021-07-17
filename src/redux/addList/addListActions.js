import {fireDatabase} from "../../lib/firebase";
import moment from "moment";
import {actionsAddList} from "./addListSlice";

const actions = {
  createAddList: payload => (dispatch) => {
    fireDatabase.ref(`addList/${payload.userUid}`).push({
      key: payload.key,
      name: payload.name,
      enter: moment().format('YYYY-MM-DD'),
      expire: moment().add('10', 'days').format(),
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
  },
  moveAddListItems: payload => (dispatch) => {
    for(let item of payload.items) {
      let list;
      fireDatabase.ref(`addList/${payload.userUid}`).get().then((snapshot) => {
        if (snapshot.exists()) {
          list = snapshot.val();
          let key = Object.keys(list).find(key => list[key].key === item.key);
          fireDatabase.ref(`itemList/${payload.userUid}`).push(item);
          fireDatabase.ref(`addList/${payload.userUid}/${key}`).remove();
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }
};

export default actions;
