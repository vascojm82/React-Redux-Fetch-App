import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, setPosts } from '../actions/postActions';

class Posts extends Component{
  componentWillMount(){
    this.props.fetchPosts();    //connect returns 'fetchPosts()' as a prop
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.newPost){
      this.props.posts.unshift(nextProps.newPost);  //Adds to the beginning of the array unlike 'push()' which adds to the end
    }
  }

  componentDidUpdate(){
    if(!(Object.keys(this.props.newPost).length === 0 && this.props.newPost.constructor === Object)){
      this.props.setPosts(this.props.posts);    //connect returns 'setPosts()' as a prop
    }
  }

  render(){
    let posts = this.props.posts.map((post) => {
      return(
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      );
    });

    return(
      <div>
        <h1>Posts</h1>
        {posts}
      </div>
    );
  }
}

Posts.propTypes = {     //Typechecking With PropTypes, will run on its own, no need to do anything else, separate library since React 16, wasn't the case before on 14 or 15
  fetchPosts: PropTypes.func.isRequired,     //Action, does the Fetch part from the posts API
  setPosts: PropTypes.func.isRequired,       //Action, add new post to posts array in Redux store
  posts: PropTypes.array.isRequired,         //Payload, returned from our reducer which in turn got it from the Action
  newPost: PropTypes.object                  //Payload, returned from our reducer which in turn got it from the Action
}

let mapStatetoProps = (state) => ({    //rootReducer calls 'postReducer' which returns an object with previous(current) state and new data(items) onto a prop called 'posts' as we specified below
  posts: state.postReducer.items,      //'posts', new prop in component 'Posts'. 'state.postReducer', the object where our reducer is saved in the redux state, must have same name as the reference
                                       //to our reducer in the rootReducer. We're basically mapping our reducer's response saved in the redux state to the props on our 'Posts' component.
  newPost: state.postReducer.item
});

export default connect(mapStatetoProps, { fetchPosts, setPosts })(Posts);
