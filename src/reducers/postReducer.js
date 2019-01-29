import { FETCH_POSTS, NEW_POST, SET_POSTS } from '../actions/types';

let initialState = {
  items: [],
  item: {}
}

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_POSTS:
      return{
        ...state,   //current state
        items: action.payload   //all posts
      };
    case NEW_POST:
      return{
        ...state,
        item: action.payload   //new post
      }
    case SET_POSTS:
      return{
        ...state,   //current state
        items: action.payload   //all posts, including newly created post
      }
    default:
      return state;
  }
}
