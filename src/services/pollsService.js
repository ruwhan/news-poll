import { getItem, setItem } from "../utils/storage";

export const getPolls = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const polls = require("../data/poll.json");
      resolve({data: polls.polls});
    }, 199);
  });
}

export const updatePolls = (modifiedPoll) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      getItem('polls')
        // .then((res) => res)
        .then((/*res*/) => setItem('polls', modifiedPoll))
        .then((res) => resolve(res));
    }, 199);
  });
}

export const getResults = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      getItem('poll_results')
        .then((res) => {
          const keys = Object.keys(res || {});
          const data = keys.map((key) => res[key]);
          resolve({ data })}
        );
    }, 199);
  })
}

export const getResult = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      getItem('poll_results')
        .then((res) => resolve({data: res[id]}));
    }, 199);
  })
}

export const updateResult = (answerId, voteCount) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      getItem('poll_results')
        .then((res) => {
          if (!res) {
            res = {};
          }

          res[answerId] = { id: answerId, voteCount };
          setItem('poll_results', res);
          resolve({ data: res });
        })
    }, 199);
  });
}

export const updateResults = (pollResults) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      setItem('poll_results', pollResults);
      resolve(pollResults);
      // getItem('poll_results')
      //   .then((res) => {
      //     if (!res) {
      //       res = {};
      //     }

      //     res[answerId] = { id: answerId, voteCount };
      //     setItem('poll_results', res);
      //     resolve({ data: res });
      //   })
    }, 199);
  });
}


