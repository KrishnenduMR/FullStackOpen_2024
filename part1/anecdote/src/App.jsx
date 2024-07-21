import { useState } from 'react';

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0);
    const [votes, setvotes] = useState(anecdotes.map(_ => 0));
    const [mostvotes, setmostvotes] = useState(0);

    const voteSelected = () => {
        const new_votes = [...votes];
        new_votes[selected] += 1;
        setvotes(new_votes);

        if (new_votes[selected] > votes[mostvotes]) {
            setmostvotes(selected);
        }
    }

    const nextAnec = () => {
        while (true) {
            const next = Math.floor(Math.random() * anecdotes.length);
            if (next !== selected) {
                setSelected(next);
                return next;
            }
        }
    }


    return (
        <div>
            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected]}</div>
            <p>has {votes[selected]} votes</p>
            <div>
                <button onClick={voteSelected}>Vote</button>
                <button onClick={nextAnec}>Next</button>
            </div>
            <h2>{anecdotes[mostvotes]} has most vote with {votes[mostvotes]}</h2>
        </div>
    )
}

export default App;