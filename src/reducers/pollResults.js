import {
  POLL_RESULTS_LOADING,
  POLL_RESULTS_LOADING_FAILED,
  POLL_RESULTS_LOADING_SUCCEED
} from "../actionTypes";

const initialState = {
  loading: false,
  updating: false,
  entities: {
    ids: [],
    byId: {}
  }
}

function setLoading(state) {
  return Object.assign({}, state, {
    loading: true
  });
}

function updatePollResults(state, actions) {
  const { entities } = state;
  const { payload } = actions;
  
  payload.forEach((item) => {
    entities.byId[item.id] = item;

    if (entities.ids.indexOf(item.id) === -1) {
      entities.ids.push(item.id);
    }
  });

  return Object.assign({}, state, {
    entities: { ...entities },
    loading: false,
    updating: false,
  });
}

function stopLoading(state) {
  return Object.assign({}, state, {
    loading: false
  });
}

function setUpdating(state) {
  return Object.assign({}, state, {
    updating: true,
  });
}

function stopUpdating(state) {
  return Object.assign({}, state, {
    updating: false,
  });
}

export default function pollsReducer(state = initialState, actions) {
  switch (actions.type) {
    case `${POLL_RESULTS_LOADING}`:
      return setLoading(state);
    case `${POLL_RESULTS_LOADING_SUCCEED}`:
      return updatePollResults(state, actions);
    case `${POLL_RESULTS_LOADING_FAILED}`:
      return stopLoading(state);
  
    default:
      return initialState;
  }
}
