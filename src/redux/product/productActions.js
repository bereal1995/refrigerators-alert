import {fireDatabase} from "../../lib/firebase";
import moment from "moment";
import {actionsProduct} from "./productSlice";

const actions = {
  createListItem: payload => (dispatch) => {
    fireDatabase.ref(`${payload.userUid}/${payload.listType}`).push({
      key: payload.key,
      name: payload.name,
      enter: moment().format('YYYY-MM-DD'),
      expire: moment().add('10', 'days').format(),
    })
  },
  listenList: userUid => (dispatch) => {
    fireDatabase.ref(`${userUid}`).on('value', data => {
      console.log('product Listener');
      dispatch(actionsProduct.listenProduct(data.val()));
    });
  },
  updateListItem: payload => (dispatch) => {
    fireDatabase.ref(`${payload.userUid}/${payload.listType}/${payload.key}/${payload.path}`).set(payload.data);
  },
  moveAddListItems: payload => (dispatch) => {
    for(let item of payload.items) {
      let list;
      fireDatabase.ref(`${payload.userUid}/addList`).get().then((snapshot) => {
        if (snapshot.exists()) {
          list = snapshot.val();
          let key = Object.keys(list).find(key => list[key].key === item.key);
          fireDatabase.ref(`${payload.userUid}/itemList`).push(item);
          fireDatabase.ref(`${payload.userUid}/addList/${key}`).remove();
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
