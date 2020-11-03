import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Plot from "react-plotly.js";

import { getResult, loadPolls, loadResults, vote } from "../../actions/polls";

import "./Home.scss";

export const Home = () => {
  const dispatch = useDispatch();
  const polls = useSelector((state) => {
    const { entities } = state.polls;
    const polls = entities.ids.map((id) => entities.byId[id]);
    return polls.sort((itemA, itemB) => {
      if (itemA.publishedDate > itemB.publishedDate) {
        return -1;
      }

      if (itemA.publishedDate < itemB.publishedDate) {
        return 1;
      }

      return 0;
    });
  });
  
  const pollResults = useSelector((state) => {
    const { entities } = state.pollResults;
    return entities.ids.map((id) => entities.byId[id]);
  });

  const myVotes = useSelector((state) => {
    const { entities } = state.myVotes;
    return entities.pollIds.map((pollId) => ({
      pollId,
      answers: entities.byPollId[pollId]
        ? entities.byPollId[pollId].answers
        : []
    }));
  });
  const [selectedAnswers, setSelectedAnswer] = useState([]);

  useEffect(() => {
    dispatch(loadPolls());
    dispatch(loadResults());
  }, []);

  const handleClickOption = (poll, selectedOption, type) => {

    const index = selectedAnswers.findIndex((item) => item.id === selectedOption.id);
    let answers;
    if (index === -1) {
      answers = type === 'Single' 
        ? [selectedOption]
        : [ ...selectedAnswers, selectedOption ];
      setSelectedAnswer(answers);
      dispatch(vote(poll, answers));
    }
    else {
      selectedAnswers.splice(index, 1);
      answers = [ ...selectedAnswers ]
      setSelectedAnswer(answers);
      dispatch(vote(poll, answers));
    }
  }

  const buildChartSeries = (poll) => {
    if (!poll) {
      return;
    }

    const { options } = poll.answer;
    const voteResults = options.map((item) => pollResults.find((resultItem) => item.id === resultItem.id) || {});

    return {
      values: voteResults.map((item) => item.voteCount),
      labels: options.map((item) => item.label),
    }
  }

  const renderPolls = () => {
    let date;
    return polls
      .map((item, index) => {
        date = new Date();
        date.setTime(item.publishedDate);

        if (index === 0) {
          const { labels, values } = buildChartSeries(item);
          const myAnswers = myVotes.find((myVoteItem) => myVoteItem.pollId === item.id);
          return (
            <div className="poll-item hero">
              <div>
                <div>Latest Poll</div>
                <div>{item.title}</div>
                <div>{date.toLocaleDateString()}</div>
                <div>
                  {item.answer.options.map((optItem) => (
                    <div key={optItem.id}>
                      <button
                          onClick={() => handleClickOption(item, optItem, item.answer.type)}
                          className={myAnswers && myAnswers.answers && myAnswers.answers.includes(optItem.id) ? 'btn selected' : 'btn'}
                      >
                        {optItem.label}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Plot
                  data={[
                    {
                      values,
                      labels,
                      domain: {column: 0},
                      name: 'GHG Emissions',
                      hoverinfo: 'label+percent+name',
                      hole: .4,
                      type: 'pie'
                    }
                  ]}
                  layout={ {width: 320, height: 240, background: 'transparent'} }
                />
              </div>
            </div>
          )
        }
        else {
          return (
            <div className="poll-item">
              <div>{date.toLocaleDateString()}</div>
              <div>{item.title}</div>
            </div>
          );
        }
      });
  }

  return (
    <div className="home">
      {renderPolls()}
    </div>
  );
}

export default Home;
