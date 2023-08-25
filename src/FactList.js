import Fact from "./Fact.js";

function FactList(props) {
  return (
    <section className="factList">
      <ul>
        {props.facts.map((fact) => (
          <Fact
            fact={fact}
            categories={props.categories}
            fullFactList={props.fullFactList}
            setFactList={props.setFactList}
            handleVote={props.handleVote}
            removeFact={props.removeFact}
          />
        ))}
      </ul>
    </section>
  );
}

export default FactList;
