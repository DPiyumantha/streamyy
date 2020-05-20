import React from "react";
import Modal from "../Modal";
import history from '../../history';
import  { fetchStream, deleteStream} from '../../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class StreamDelete extends React.Component {

componentDidMount(){
    console.log('hi')
    this.props.fetchStream(this.props.match.params.id);
}



  renderActions(){
      const id= this.props.match.params.id;
      return (
        <React.Fragment>
          <button className="ui negative button" onClick={()=> this.props.deleteStream(id)}>Delete</button>
          <Link className="ui button" to="/">Cancel</Link>
        </React.Fragment>
      );
  };

  renderContent(){
      if(!this.props.stream){
          return 'Are you sure you want to delete this stream?'
      }
      return `Are you sure you want to delete this stream ${this.props.stream.title}?`
  }

  render(){
  return (      
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={()=>history.push('/')}
      />
    
  );}
};

const mapStateToProps=(state, ownProps)=>{
    return { stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);
