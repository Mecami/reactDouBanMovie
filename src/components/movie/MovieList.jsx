import React from 'react';
//导入‘加载中’组件
import { Spin, Alert } from 'antd';
//导入fetch-jsonp包
import fetchJSONP from 'fetch-jsonp';
//导入电影组件
import MovieItem from './MovieItem.jsx';
//导入分页组件
import { Pagination } from 'antd';

 
export default class MovieList extends React.Component{
  constructor(props){
    super(props);
    this.state={
        movies:[],
        pageSize:12,//每一页显示多少条数据
        currentPage:parseInt(props.match.params.page) || 1,
        total:0,//当前分类下共有多少条数据
        isLoading:true,
        movieType:props.match.params.type//从url中获取电影类型
    }
    // console.log(this.state.currentPage);
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //     console.log(nextProps);
  //     return null;
  // }
  componentWillMount(){
   
    this.getMovieListByTypeAndPage();
  }
  

  render(){
    return <div>
        {/* <h1>MovieList---{this.props.message}</h1> */}
        {this.renderList()}
        <Pagination style={{marginTop:20}} pageSize={this.state.pageSize} current={parseInt(this.state.currentPage)} total={parseInt(this.state.total)} onChange={this.changePage}/>
    </div>
  }
  //就要接受新props
  componentWillReceiveProps(nextProps){
    // console.log(nextProps);
    this.setState({
      isLoading:true,
      movieType:nextProps.match.params.type,
      currentPage:nextProps.match.params.page
    },function(){
      this.getMovieListByTypeAndPage();
    })
  }
  //判断是否需要启用'加载中'组件
  renderList=()=>{
    if(this.state.isLoading){
      return  <Spin tip="Loading...">
    <Alert
      message="请稍后"
      description="电影列表信息获取ing..."
      type="info"
    />
  </Spin>
    }else{
        return <div style={{display:'flex',flexWrap:'wrap'}}>  
        {
            this.state.movies.map(item=>{
            return <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>//return后面是新数组中的每一项
            })
        }
        </div>
    }
  }

  //根据类型，页码，显示数据数目获取对于的电影信息
  getMovieListByTypeAndPage=()=>{
    const start=this.state.pageSize*(this.state.currentPage-1)
    const url=`https://douban.uieee.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize}`;
    fetchJSONP(url)
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        // console.log(data);
        // console.log(this.props.match.params.type);
        // console.log(window.location);
        this.setState({
            isLoading:false,
            total:data.total,
            movies:data.subjects
        })
    })
    //注意下这里的读取json文件方法
    // const data =require('../test_data/'+this.state.movieType+'.json')
    // setTimeout(() => {
    //     this.setState({
    //                 isLoading:false,
    //                 total:data.total,
    //                 movies:data.subjects
    //     })
         
    // }, 1000);
  }
  //点击页码
  changePage=(page)=>{
    // console.log(this.props);
    this.props.history.push('/movie/'+this.state.movieType+'/'+page);
  }

}