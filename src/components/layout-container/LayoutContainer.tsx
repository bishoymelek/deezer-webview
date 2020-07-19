import React from 'react';
import { Layout, Menu } from 'antd';
import logo from 'assets/deezer-logo.png';
import { Link } from 'react-router-dom';

const dt = new Date();

function LayoutContainer(props: any): JSX.Element {
  const { children } = props;
  const { Header, Content, Footer } = Layout;
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="genres">
            <Link to="/genres">Genres</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', paddingTop: '20px' }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{dt.getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}
export { LayoutContainer };
export default LayoutContainer;
