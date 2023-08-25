import { useState } from "react";

function NewFactForm(props) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [cat, setCat] = useState("Choose category");

  function isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  function handleSubmit(evt) {
    console.log("submited!");
    evt.preventDefault();
    if (text && isValidHttpUrl(source) && cat && text.length <= 200) {
      const newFact = {
        id: Math.round(Math.random() * 10000000),
        text: text,
        source: source,
        category: cat,
      };
      props.newFact(newFact);
      setText("");
      setSource("");
      setCat("Choose category");
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <br />
      <input
        type="text"
        value={text}
        onChange={(evt) => {
          setText(evt.target.value);
        }}
        placeholder="Share anything about Brown University!"
        id="post"
      ></input>
      <span>{200 - text.length} chars</span>

      <input
        type="text"
        value={source}
        onChange={(evt) => setSource(evt.target.value)}
        placeholder="Source (a valid url)"
        id="source"
      ></input>

      <select
        value={cat}
        onChange={(evt) => {
          setCat(evt.target.value);
          console.log(evt.target.value);
        }}
      >
        <option value="">Choose category</option>
        {props.categories.map((el) => (
          <option value={el.name}>{el.name.toUpperCase()}</option>
        ))}
      </select>

      <button className="btn post">Post</button>
    </form>
  );
}

export default NewFactForm;
