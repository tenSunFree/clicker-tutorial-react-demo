const Clicker = ({ amount, dispatch }) => (
  <div className="clicker" style={{ backgroundColor: "#0b0ff4eb" }}>
    <h1>{Intl.NumberFormat().format(amount)}</h1>
    <button
      className="buy"
      type="button"
      onClick={() => dispatch({ type: "click" })}
    >
      click button
    </button>
  </div>
);

export default Clicker;
