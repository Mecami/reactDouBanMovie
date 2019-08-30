import React from 'react';
import fetchJSON from 'fetch-jsonp';
//导入返回按钮组件，和’加载中‘组件
import { Button,Icon,Spin,Alert } from 'antd';
export default class MovieDetail extends React.Component{
  constructor(props){
    super(props);
    this.state={
        id:this.props.match.params.id,//根据上面的url获取对应的电影id
        movieDetail:{},
        isLoading:true
    }
  }
  componentWillMount(){
        this.getMovieDetail();
  }

  render(){
    //   console.log(this.state.movieDetail.images)
      //解决豆瓣图片出现403问题
      //获取对象中图片的https://后面的字符串
      
    // const _u=this.state.movieDetail.images && this.state.movieDetail.images.small.split('https://')[1];
    // //字符串拼接
    // const url='https://images.weserv.nl/?url='+_u;
    return <div>
        <Button type="primary" onClick={this.goBack}>
            <Icon type="left" />
            返回
        </Button>
        {this.renderDetail()}
        
    </div>
  }
  getMovieDetail(){
      fetchJSON('https://douban.uieee.com/v2/movie/subject/'+this.state.id)
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            this.setState({
                movieDetail:data,
                isLoading:false
            })
        })
  }
  goBack=()=>{
      console.log(this.props)
      this.props.history.go(-1);
  }
  renderDetail=()=>{
      if(this.state.isLoading){
          return <Spin tip="Loading...">
                    <Alert
                        message="请稍后"
                        description="电影详细信息获取ing..."
                        type="info"
                    />
            </Spin>
      }else{
            //解决豆瓣图片出现403问题
        //获取对象中图片的https://后面的字符串
      
        const _u=this.state.movieDetail.images.small.split('https://')[1];
        //字符串拼接
        const url='https://images.weserv.nl/?url='+_u;
          return <div>
              <div style={{textAlign:'center'}}>
                  <h1 style={{fontWeight:700,fontSize:20}}>{this.state.movieDetail.title}</h1>
                  <img src={url}/>
              </div>
              <p style={{textIndent:'2em',lineHeight:'20px'}}>{this.state.movieDetail.summary}</p>
          </div>
      }
  }
}