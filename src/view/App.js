import Routes from "./routes/Routes";
import {Layout} from 'antd';
import HeaderBox from "./components/Header/HeaderBox";
import FooterBox from "./components/Footer/FooterBox";
import {Content} from "antd/es/layout/layout";

function App() {
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
