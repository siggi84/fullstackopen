import React, { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({quote, votes}) => (
  <div>
    <div>
      {quote}
    </div>
    <div>
      has {votes}
    </div>
  </div>
  )

const MostVotesAnecdote = ({quote, votes}) => {
  if (votes > 0) {
    return <Anecdote quote={quote} votes={votes} />
  } else {
    return <div>No votes have been given</div>
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const random_index = () => Math.floor(Math.random() * anecdotes.length)

  const votes = anecdotes.map(() => 0);
  const [voted, setVoted] = useState(votes)

  const [selected, setSelected] = useState(random_index())

  const add_vote = () => {
      const vote_copy = [...voted]
      vote_copy[selected] += 1;
      setVoted(vote_copy)
  }

  const most_votes_index = voted.indexOf(Math.max(...voted));
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote quote={anecdotes[selected]} votes={voted[selected]} />
      <div>
        <Button text="vote" onClick={add_vote} />
        <Button text="next anecdote" onClick={() => setSelected(random_index)} />
      </div>
      <h2>Anecdote with most votes</h2>
      <MostVotesAnecdote quote={anecdotes[most_votes_index]} votes={voted[most_votes_index]} />
    </div>
  )
}

export default App
