import Routes from "./routes/Routes";
import {Layout} from 'antd';
import HeaderBox from "./components/Header/HeaderBox";
import FooterBox from "./components/Footer/FooterBox";
import {Content} from "antd/es/layout/layout";
import {useDispatch} from "react-redux";
import actionsApp from "../redux/app/appActions"
import {auth} from "../lib/firebase";

function App() {
  const dispatch = useDispatch();

  auth.onAuthStateChanged((user) => {
    if(user) {
      dispatch(actionsApp.appLogin())
    }
  })

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
