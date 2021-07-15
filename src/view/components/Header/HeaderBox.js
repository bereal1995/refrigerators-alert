import React from "react";
import {Avatar, Col, Dropdown, Menu, Row} from "antd";
import {Header} from "antd/es/layout/layout";
import {HomeOutlined, UnorderedListOutlined, FormOutlined, UserOutlined} from '@ant-design/icons';
import {CgSmartHomeRefrigerator} from 'react-icons/cg'
import {useHistory, useLocation} from "react-router";
import {PATH_ADD_LIST, PATH_HOME, PATH_ITEM_LIST} from "../../../constants/ConstantsPath";

function HeaderBox() {
    const location = useLocation();
    const history = useHistory();

    const userMenu = (
      <Menu>
        <Menu.Item key={'guest'}>
          Guest
        </Menu.Item>
        <Menu.Item key={'login'}>
          Login
        </Menu.Item>
        <Menu.Item key={'hello'}>
          Hello name
        </Menu.Item>
        <Menu.Item key={'logout'}>
          Logout
        </Menu.Item>
      </Menu>
    );

    const onClickMenu = (e) => {
      history.push(e.key);
    }

    return (
      <Header>
        <Row justify="space-between">
          <Col>
            <div className="logo" >
              <CgSmartHomeRefrigerator />
            </div>
            <Menu mode="horizontal" selectedKeys={[location.pathname]} onClick={onClickMenu}>
              <Menu.Item key={PATH_HOME}>
                <HomeOutlined style={{fontSize: '1.25rem'}} />
              </Menu.Item>
              <Menu.Item key={PATH_ADD_LIST}>
                <FormOutlined style={{fontSize: '1.25rem'}} />
              </Menu.Item>
              <Menu.Item key={PATH_ITEM_LIST}>
                <UnorderedListOutlined style={{fontSize: '1.25rem'}} />
              </Menu.Item>
            </Menu>
          </Col>
          <Col>
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href="#">
                <Avatar size={"large"} icon={<UserOutlined />} />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    )
}

export default HeaderBox;