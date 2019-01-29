/********* THIS IS THE ROOT REDUCER *********/
import { combineReducers } from 'redux';
import postReducer from './postReducer';

export default combineReducers({
  postReducer: postReducer
});
/********************************************/
