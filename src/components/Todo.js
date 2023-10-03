import Cosmq, { observe, observableArray, compute } from "cosmq-js";

const initial = [
  { id: 1, name: "Wake up" },
  { id: 2, name: "Grab a brush" },
  { id: 3, name: "Put on a little makeup" },
  { id: 4, name: "Rinse & repeat all steps above" },
];

const Component_Todo = ({}) => {
  const items = observe(initial);
  const text = observe("");

  const handleSort = () => {
    items = [...items.value].sort(() => (Math.random() > 0.5 ? -1 : 1));
  };

  const handleInput = (e) => {
    text = e.target.value ?? "";
  };

  const handleClick = () => {
    items = items.concat({ id: Math.random() * 100000, name: text });
    text = "";
  };

  return (
    <div
      style={{
        padding: "20px",
        boxSizing: "border-box",
        color: items.length === 0 && text === "true" ? "red" : "blue",
      }}
    >
      <h2>Todo</h2>
      <div
        style={{
          display: "flex",
          gap: "20px",
          height: "40px",
          marginBottom: "10px",
        }}
      >
        <input
          style={{
            flex: "1 1 auto",
          }}
          value={text}
          handle:input={handleInput}
        />
        <button
          handle:click={handleClick}
          // disabled={compute(text === "" || text === null)}
          disabled={compute(text === ("" || null))}
        >
          Add Item
        </button>
        <button handle:click={handleSort}>sort</button>
      </div>

      {IF(items.length === 0)(<div>no items</div>)}
      {ELSE()(
        <div style={{ margin: "30px 0px", textAlign: "Center" }}>
          {`Item count = `}
          <span className="highlight">{`${items.length}`}</span>
        </div>
      )}

      <ul>
        {observableArray(
          items,
          {
            getKey: (item) => item.id,
          },
          (item, i) => (
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                userSelect: "none",
                width: "100%",
                padding: "5px",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              <span className="highlight">{`${i + 1}`}</span>
              <span
                style={{
                  flex: "1 0 auto",
                  padding: "0 10px",
                }}
              >
                {item.name}
              </span>
              <button
                handle:click={() => {
                  items = items.filter(
                    (filterItem) => filterItem.id !== item.id
                  );
                }}
              >
                X
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Component_Todo;
