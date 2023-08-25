function Header(props) {
  return (
    <header className="header">
      <div className="logo">
        <img src="./logo.png" height="75px" />
        <h1>Bear Buzz!</h1>
      </div>
      <button className="btn share" onClick={props.toggleForm}>
        {props.isFormShown ? "Close" : "Share a fact!"}
      </button>
      <br />
    </header>
  );
}

export default Header;
