import React from 'react';
//导入scss文件
import '../../css/movie_item.scss';
import { Rate } from 'antd';


export default class MovieItem extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    //解决豆瓣图片出现403问题
    const _u=this.props.images.small.split('https://')[1];
    const url='https://images.weserv.nl/?url='+_u;

    return <div className="box" onClick={this.getMovieDetail}>
        <img src={url}></img>
        <h4 style={{fontWeight:600}}>{this.props.title}</h4>
        <h4>年份：{this.props.year}</h4>
        <h4>类型：{this.props.genres.join(',')}</h4>
        <Rate disabled defaultValue={this.props.rating.average/2} />
    </div>
  }
  getMovieDetail=()=>{
    //点击电影，改变上面的url地址
     this.props.history.push('/movie/detail/'+this.props.id);
  }
}