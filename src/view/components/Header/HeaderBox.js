import React from "react";
import {Avatar, Badge, Col, Dropdown, Menu, Row} from "antd";
import {Header} from "antd/es/layout/layout";
import {FormOutlined, HomeOutlined, UnorderedListOutlined, UserOutlined} from '@ant-design/icons';
import {CgSmartHomeRefrigerator} from 'react-icons/cg'
import {useHistory, useLocation} from "react-router";
import {PATH_ADD_LIST, PATH_HOME, PATH_ITEM_LIST} from "../../../constants/ConstantsPath";
import {useDispatch, useSelector} from "react-redux";
import {stateApp} from "../../../redux/app/appSlice";
import actionsApp from "../../../redux/app/appActions";
import {stateItemList} from "../../../redux/itemList/itemListSlice";
import moment from "moment";

function HeaderBox() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = {...useSelector(stateApp)}.user;
    const list = {...useSelector(stateItemList)}.list;

    const signIn = () => dispatch(actionsApp.appLogin());
    const signOut = () => dispatch(actionsApp.appLogout());
    const onClickMenu = (e) => history.push(e.key);

    const getListCount = (list) => {
      let count = 0;

      for(let item of Object.values(list)) {
        if (moment(item.expire).valueOf() < moment().valueOf()) count++;
      }

      return count
    }

    const userMenu = (
      <Menu>
        <Menu.Item key={'login'} onClick={user ? signOut : signIn}>
          {user ? 'Logout' : 'Login'}
        </Menu.Item>
        <Menu.Item key={'hello'}>
          Hello {user ? user.displayName : 'guest'}!
        </Menu.Item>
      </Menu>
    );

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
                <Badge count={<span className={'ant-badge-count'}>{list && getListCount(list)}</span>}>
                  <UnorderedListOutlined style={{fontSize: '1.25rem'}} />
                </Badge>
              </Menu.Item>
            </Menu>
          </Col>
          <Col>
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <span className="ant-dropdown-link a-tag" onClick={e => e.preventDefault()}>
                {
                  user
                  ? <Avatar
                      size={"large"}
                      src={<img src={user.photoURL} alt=""/>}
                      style={{
                        boxShadow: '0 0 6px 0 rgba(0,0,0,.5)',}}
                    />
                  : <Avatar size={"large"} icon={<UserOutlined />} />
                }
              </span>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    )
}

export default HeaderBox;