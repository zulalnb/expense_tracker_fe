import React from "react";
import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

export default function App() {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`
          }))}
        />
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "50px", marginTop: 64 }}>
        <Route path="/register" component={SignUp} />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Expense Tracker @ React Dersleri 2022
      </Footer>
    </Layout>
  );
}
