import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { AppState } from "../store";
import { isLoggedIn } from "../store/actions/userActions";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

function AppHeader() {
  const { data, loading, error } = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  const { pathname } = useLocation();

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
        {data.username ? (
          <React.Fragment>
            <Menu.Item key="/records">
              <Link to="/records">Payment Records</Link>
            </Menu.Item>
            <Menu.Item key="/categories">
              <Link to="/categories">Categories</Link>
            </Menu.Item>
            <Menu.Item key="/logout">
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </React.Fragment>
        ) : loading ? null : (
          <Menu.Item key="/login">
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
}

export default AppHeader;
