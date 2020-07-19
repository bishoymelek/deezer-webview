import React from 'react';
import { Layout, Menu } from 'antd';
import logo from 'assets/deezer-logo.png';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

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
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['genres']}>
          <Menu.Item key="genres">
            <Link to="/genres">Genres</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', paddingTop: '20px' }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Deezer web-views ©{dt.getFullYear()} Created by
        <a href="mailto:bishoymelekwadie@gmail.com"> Bishoy Melek</a>
      </Footer>
    </Layout>
  );
}
export { LayoutContainer };
export default withRouter(LayoutContainer);
