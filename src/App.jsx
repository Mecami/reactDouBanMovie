import React from 'react';
import { HashRouter,Route,Link } from 'react-router-dom';
//导入需要的antDesign组件
import { Layout, Menu} from 'antd';
const { Header, Content, Footer } = Layout;
//导入css文件
import './css/app.scss';
//导入路由组件
import HomeContainer from './components/home/HomeContainer.jsx';
import MovieContainer from './components/movie/MovieContainer.jsx';
import AboutContainer from './components/about/AboutContainer.jsx';

export default class App extends React.Component{
  constructor(props){
  super(props);
  this.state={
   
}
}
static getDerivedStateFromProps(nextProps, prevState) {
  // console.log(window.location.hash.split('/')[1]);
  return null;
}

render(){
  return <HashRouter>
  <Layout className="layout" style={{height:'100%'}}>

    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[window.location.hash.split('/')[1]]} style={{ lineHeight: '64px' }}>
        <Menu.Item key="home">
          <Link to="/home">首页</Link>
        </Menu.Item>
        
        <Menu.Item key="movie">
          <Link to="/movie/in_theaters/1">电影</Link>
        </Menu.Item>

        <Menu.Item key="about">
          <Link to="/about">关于</Link>
        </Menu.Item>
      </Menu>
    </Header>

    {/* 下面那个Content就是main */}
    <Content style={{ padding: '0 px' }}>
       

      <Route path="/home" component={HomeContainer}></Route>
      <Route path="/movie" component={MovieContainer}></Route>
      <Route path="/about" component={AboutContainer}></Route>

       
    </Content>

    <Footer style={{ textAlign: 'center' }}>©2018 Created by Mecami</Footer>
  </Layout>

</HashRouter>


}
}