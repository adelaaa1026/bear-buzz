function Fact(props) {
  var isDisputed = false;
  if (
    props.fact.votesInteresting + props.fact.votesMindblowing <
    props.fact.votesFalse
  ) {
    isDisputed = true;
  }
  return (
    <li className="fact" key={props.fact.id}>
      <p className="fact-text">
        {isDisputed ? (
          <span className="disputed">[⛔⛔⛔Is Disputed]</span>
        ) : null}
        {props.fact.text}
        <a className="source" href={props.fact.source}>
          {" "}
          (Source){" "}
        </a>
      </p>

      <span
        className="tag"
        style={{
          background: props.categories.find((cat) => {
            return cat.name === props.fact.category;
          }).color,
        }}
      >
        {" "}
        {props.fact.category}{" "}
      </span>

      <div className="votes-div">
        <button
          className="vote-btn"
          name="votesInteresting"
          onClick={() => props.handleVote("votesInteresting", props.fact)}
        >
          <strong>👍 {props.fact.votesInteresting}</strong>
        </button>
        <button
          className="vote-btn"
          name="votesMindBlowing"
          id={props.fact.id}
          onClick={() => props.handleVote("votesMindblowing", props.fact)}
        >
          <strong>🤯 {props.fact.votesMindblowing}</strong>
        </button>
        <button
          className="vote-btn"
          name="votesFalse"
          id={props.fact.id}
          onClick={() => props.handleVote("votesFalse", props.fact)}
        >
          <strong>⛔ {props.fact.votesFalse}</strong>
        </button>

        {/* <button
          className="vote-btn delete-btn"
          onClick={() => props.removeFact(props.fact)}
        >
          REMOVE
        </button> */}
      </div>
    </li>
  );
}

export default Fact;
