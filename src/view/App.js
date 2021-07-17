import Routes from "./routes/Routes";
import {Layout} from 'antd';
import HeaderBox from "./components/Header/HeaderBox";
import FooterBox from "./components/Footer/FooterBox";
import {Content} from "antd/es/layout/layout";
import {useDispatch, useSelector} from "react-redux";
import actionsApp from "../redux/app/appActions"
import {auth} from "../lib/firebase";
import {useEffect} from "react";
import productActions from "../redux/product/productActions";
import {stateApp} from "../redux/app/appSlice";

function App() {
  const dispatch = useDispatch();
  const user = {...useSelector(stateApp)}.user;

  auth.onAuthStateChanged((user) => {
    if(user) {
      dispatch(actionsApp.appLogin())
    }
  })

  useEffect(() => {
    if (user?.uid) {
      dispatch(productActions.listenList(user.uid));
    } else {
      dispatch(productActions.listenList('guest'));
    }
  }, [user, dispatch])

  return (
    <>
      <Layout className="layout">
        <HeaderBox/>
        <Content style={{ padding: '10px 10px 0' }}>
          <div className="site-layout-content">
            <Routes/>
          </div>
        </Content>
        <FooterBox/>
      </Layout>
    </>
  );
}

export default App;
