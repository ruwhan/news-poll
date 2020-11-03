import {
  POLLS_LOADING,
  POLLS_LOADING_FAILED,
  POLLS_LOADING_SUCCEED,
  POLL_UPDATE_FAILED,
  POLL_UPDATE_SUCCEED,
  POLL_UPDATING
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

function updatePolls(state, actions) {
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
    case `${POLLS_LOADING}`:
      return setLoading(state);
    case `${POLLS_LOADING_SUCCEED}`:
    case `${POLL_UPDATE_SUCCEED}`:
      return updatePolls(state, actions);
    case `${POLLS_LOADING_FAILED}`:
      return stopLoading(state);
    case `${POLL_UPDATING}`:
      return setUpdating(state);
    case `${POLL_UPDATE_FAILED}`:
      return stopUpdating();
  
    default:
      return initialState;
  }
}
