import {
  POLLS_LOADING,
  POLLS_LOADING_FAILED,
  POLLS_LOADING_SUCCEED,
  POLL_RESULTS_LOADING,
  POLL_RESULTS_LOADING_FAILED,
  POLL_RESULTS_LOADING_SUCCEED,
  POLL_UPDATE_FAILED,
  POLL_UPDATE_SUCCEED,
  POLL_UPDATING,
  VOTE_UPDATE,
} from "../actionTypes";
import { getPolls, updatePolls, getResults, updateResult, updateResults } from "../services/pollsService";
import { setItem } from "../utils/storage";

export const pollsLoading = () => ({ type: POLLS_LOADING });

export const pollsLoadingSucceed = (payload) => ({ type: POLLS_LOADING_SUCCEED, payload });

export const pollsLoadingFailed = () => ({ type: POLLS_LOADING_FAILED });

export const pollUpdating = () => ({ type: POLL_UPDATING });

export const pollUpdateSucceed = (payload) => ({ type: POLL_UPDATE_SUCCEED, payload });

export const pollUpdateFailed = () => ({ type: POLL_UPDATE_FAILED })

export const pollResultsLoading = () => ({ type: POLL_RESULTS_LOADING });

export const pollResultsLoadingSucceed = (payload) => ({ type: POLL_RESULTS_LOADING_SUCCEED, payload });

export const pollResultsLoadingFailed = () => ({ type: POLL_RESULTS_LOADING_FAILED });

export const voteUpdate = (payload) => ({ type: VOTE_UPDATE, payload });

export const loadPolls = () => {
  return (dispatch, getState) => {
    dispatch(pollsLoading());
    return getPolls()
      .then((res) => {
        dispatch(pollsLoadingSucceed(res.data));
      })
      .catch((err) => {
        console.error(err);
        dispatch(pollsLoadingFailed());
      })
  }
}

export const loadResults = () => {
  return (dispatch) => {
    dispatch(pollResultsLoading());
    return getResults()
      .then((res) => {
        dispatch(pollResultsLoadingSucceed(res.data || []));
      })
      .catch(() => {
        dispatch(pollResultsLoadingFailed());
      });
  }
}

export const vote = (poll, answers) => {
  return (dispatch, getState) => {
    const { myVotes } = getState();
    const { entities } = myVotes;
    let previousAnswers = entities.byPollId[poll.id] 
      ? entities.byPollId[poll.id].answers
      : [];

    dispatch(pollResultsLoading());
    return getResults()
      .then((res) => {
        let temp = -1;
        let index = 0;

        for (let i = 0; i < previousAnswers.length; i++) {
          temp = previousAnswers[i];
          index = res.data.findIndex((item) => item.id === temp);

          if (index === -1) {
            res.data.push({ id: previousAnswers, voteCount: 0 });
          }
          else {
            --res.data[index].voteCount;
          }
        }

        index = 0;

        for (let i = 0; i < answers.length; i++) {
          temp = answers[i];
          index = res.data.findIndex((item) => item.id === answers[i].id);
          index > -1
            ? ++res.data[index].voteCount
            : res.data.push({ id: temp.id, voteCount: 1 });
        }

        return updateResults(res.data);
      })
      .then(() => {
        dispatch(voteUpdate([{ pollId: poll.id, answers: answers.map((i) => i.id) }]));
        return getResults();
      })
      .then((res) => {
        dispatch(pollResultsLoadingSucceed(res.data));
      });
  }
}
