// reducers/index.js
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import pollsReducer from "./polls";
import pollResultsReducer from "./pollResults";
import myVotesReducer from "./myVotes";
 
const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  polls: pollsReducer,
  pollResults: pollResultsReducer,
  myVotes: myVotesReducer,
})

export default createRootReducer
