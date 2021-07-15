import {actionsApp} from "./appSlice";
import {auth} from "../../lib/firebase";
import firebase from 'firebase'

const actions = {
  appLogin: payload => (dispatch) => {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.onAuthStateChanged((user) => {
          if (user) {
            dispatch(actionsApp.appLogin(user));
          } else {
            auth.signInWithPopup(provider)
          }
        })
      })
      .catch(err => console.log('err',err))
  },
  appLogout: payload => (dispatch) => {
    auth.signOut();
    auth.onAuthStateChanged((user) => {
    })
    dispatch(actionsApp.appLogout());
  }
};

export default actions;
