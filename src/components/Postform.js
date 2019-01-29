import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  { createPost } from '../actions/postActions'

class PostForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value   //[e.target.value] evaluates either to 'title' or 'body', depending on who is calling
    });
  }

  onSubmit(e){
    e.preventDefault();

    let post = {
      title: this.state.title,
      body: this.state.body
    }

    this.props.createPost(post);
  }

  render(){
    return(
      <div>
        <h1>Add Post</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title: </label><br />
            <input type="text" name="title" onChange={this.onChange} value={this.state.title} />
          </div>
          <br />
          <div>
            <label>Body: </label><br />
            <textarea name="body" onChange={this.onChange} value={this.state.body} />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired
}

let mapStatetoProps = (state) => ({   //rootReducer calls 'postReducer' which returns an object with previous(current) state and new data(item) onto a prop called 'post' as we specified below
  post: state.postReducer.item        //'post', new prop in component 'PostForm'. 'state.postReducer', the object where our reducer is saved in the redux state, must have same name as the reference
});                                   //to our reducer in the rootReducer. We're basically mapping our reducer's response saved in the redux state to the props on our 'PostForm' component.


export default connect(mapStatetoProps, { createPost })(PostForm);
