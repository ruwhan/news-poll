import {
  VOTE_UPDATE
} from "../actionTypes";

const initialState = {
  loading: false,
  updating: false,
  entities: {
    pollIds: [],
    byPollId: {}
  }
}

function updateMyVote(state, actions) {
  const { entities } = state;
  const { payload } = actions;
  
  payload.forEach((item) => {
    entities.byPollId[item.pollId] = item;

    if (entities.pollIds.indexOf(item.pollId) === -1) {
      entities.pollIds.push(item.pollId);
    }
  });

  return Object.assign({}, state, {
    entities: { ...entities },
    loading: false,
    updating: false,
  });
}

export default function myVoteReducer(state = initialState, actions) {
  switch (actions.type) {
    case `${VOTE_UPDATE}`:
      return updateMyVote(state, actions);
  
    default:
      return initialState;
  }
}
