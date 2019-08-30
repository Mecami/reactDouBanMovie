import React from 'react';
//导入布局组件
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
//导入路由相关组件，没有HashRouter，那个一个网站导入一次就行
import { Route,Link,Switch } from 'react-router-dom';
//导入组件
import MovieList from './MovieList.jsx';
import MovieDetail from './MovieDetail.jsx';
export default class MovieContainer extends React.Component{
  constructor(props){
    super(props);
    this.state={
        movieList:[]
    }
  }

  render(){
    return <Layout style={{height:'100%'}}>
    <Sider width={200} style={{ background: '#fff'}}>
      <Menu
        mode="inline"
        defaultSelectedKeys={[window.location.hash.split('/')[2]]}
         
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="in_theaters">
             <Link to="/movie/in_theaters/1" onClick={this.getInTheaters}>正在热映</Link>
        </Menu.Item>

        <Menu.Item key="coming_soon">
             <Link to="/movie/coming_soon/1">即将上映</Link>
        </Menu.Item>

        <Menu.Item key="top250">
            <Link to="/movie/top250/1">Top250</Link>
        </Menu.Item>
           
      </Menu>
    </Sider>
    <Layout style={{ padding: '0 24px',height:'100%' }}>
     
      <Content
        style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          // height: '100%',
        }}
      >
        <Switch>
            <Route exact path="/movie/detail/:id" component={MovieDetail}></Route>
            <Route path="/movie/:type/:page" component={MovieList}></Route>
        </Switch>
      </Content>
    </Layout>
  </Layout>
  }
  // getInTheaters=()=>{
  //     fetch('http://www.liulongbin.top:3005/api/getlunbo')
  //       .then(res=>{
  //           return res.json();
  //       })
  //       .then(data=>{
  //           // console.log(data);
  //           // console.log(window.location);
  //           this.state.movieList=data.message;
  //       })
  // }
}