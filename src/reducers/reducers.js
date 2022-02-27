import { combineReducers } from 'redux';
import { SET_MOVIES, SET_FILTER, SET_USER } from '../actions/actions';

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

/* function moviesApp(state = {}, action) {
  return {
    movies: movies(state.movies, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    user: user(state.user, action)
  };
} */

const moviesApp = combineReducers({
  movies,
  visibilityFilter,
  user,
});

export default moviesApp;
