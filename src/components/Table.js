import Cosmq, { observe, compute, observableArray } from "cosmq-js";
import Virtualizer from "./Virtualizer";

const columns = ["Id", "Name", "Birth Date", "Profession", "active"];
const firstNames = [
  "Jane",
  "Sally",
  "Mary",
  "Barbara",
  "John",
  "Bob",
  "Rob",
  "Sam",
  "Saul",
  "Walter",
  "Jesse",
];
const lastNames = [
  "Smith",
  "Ross",
  "Doe",
  "Goodman",
  "McGill",
  "White",
  "Pinkman",
];
const professions = [
  "Singer",
  "Love Guru",
  "Painter",
  "Criminal Lawyer",
  "Chemical Engineer",
];

const getRandom = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let currentId = 0;

const makeRow = (columns) => {
  const row = {};
  currentId++;

  columns.forEach((col) => {
    switch (col) {
      case columns[0]:
        row[col] = currentId;
        break;
      case columns[1]:
        row[col] = `${getRandom(firstNames)} ${getRandom(lastNames)}`;
        break;
      case columns[2]:
        const day = randomNumber(1, 27);
        const month = randomNumber(1, 12);
        const year = randomNumber(1980, 2042);

        row[col] = new Date(`${month}-${day}-${year}`).toLocaleDateString();
        break;
      case columns[3]:
        row[col] = getRandom(professions);
        break;
      case columns[4]:
        row[col] = Math.random() >= 0.2;
        break;
    }
  });

  return row;
};

const genRows = (columns, amount) => {
  const rows = [];
  while (rows.length < amount) {
    rows.push(makeRow(columns));
  }
  return rows;
};

const Component_Table = ({}) => {
  const data = observe(genRows(columns, 10));
  const activeCell = observe(null);
  const activeRow = observe(null);
  const amount = observe(data.length);

  const total = compute(data.length);

  const activeUsers = compute(() =>
    data.reduce((sum, curr) => sum + (curr.active ? 1 : 0), 0)
  );

  const handleInput = (e) => {
    amount = e.target.value;
  };

  const editingValue = compute(
    data.find((r) => r.Id === activeRow)?.[activeCell]
  );

  const getColumn = (row, col) => {
    return (
      <td>
        {col === "active" ? (
          <input
            type="checkbox"
            checked={row[col]}
            handle:input={(e) => {
              data = data.map((r) => {
                if (r.Id === row.Id) {
                  return { ...r, [col]: e.target.checked };
                }

                return r;
              });
            }}
          />
        ) : col === "Birth Date" ? (
          <input
            style={{
              background: "transparent",
              border: "none",
              padding: null,
              height: "auto",
              textAlign: "center",
              color: "white",
            }}
            type="date"
            value={row[col]}
            handle:focus={(e) => {
              e.target.select();
              activeRow = row.Id;
              activeCell = col;
            }}
            handle:input={(e) => {
              data = data.map((r) => {
                if (r.Id === row.Id) {
                  return { ...r, [col]: e.target.value };
                }

                return r;
              });
            }}
          />
        ) : (
          <input
            style={{
              background: "transparent",
              border: "none",
              padding: null,
              height: "auto",
              textAlign: "center",
              color: "white",
            }}
            value={row[col]}
            handle:focus={(e) => {
              e.target.select();
              activeRow = row.Id;
              activeCell = col;
            }}
            handle:input={(e) => {
              data = data.map((r) => {
                if (r.Id === row.Id) {
                  return { ...r, [col]: e.target.value };
                }

                return r;
              });
            }}
          />
        )}
      </td>
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          height: "40px",
          marginBottom: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input type="number" value={amount} handle:input={handleInput} />
        <button
          className="alt"
          handle:click={() => {
            data = data.concat(genRows(columns, amount));
          }}
        >
          Add
        </button>
        <button
          handle:click={() => {
            data = data.slice(0, data.length - amount);
          }}
        >
          remove
        </button>
      </div>

      <div style={{ minHeight: "30px", padding: "10px 0" }}>
        {IF(editingValue)(
          <div>
            <label>Editing Value:</label>
            <span>{editingValue}</span>
          </div>
        )}
      </div>
      <div
        virtualContainer
        style={{ height: "300px", marginTop: "25px", overflowY: "auto" }}
      >
        <table
          style={{
            tableLayout: "auto",
          }}
        >
          <thead>
            <tr style={{ zIndex: 1 }}>
              {columns.map((col) => (
                <th>{col}</th>
              ))}
              <th style={{ width: "50px" }}></th>
            </tr>
          </thead>
          <tbody>
            {observableArray(data, { getKey: (row) => row.Id }, (row) => (
              <tr
                key={`${row.Id}`}
                style={{
                  opacity: row.active ? 1 : 0.5,
                }}
              >
                {columns.map((col) => getColumn(row, col))}

                <td>
                  <button
                    handle:click={() => {
                      data = data.filter((r) => r.Id !== row.Id);
                    }}
                  >
                    X
                  </button>

                  {IF(row.Name === "test")(<div>testing</div>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          gap: "20px",
          marginTop: "20px",
          textAlign: "right",
        }}
      >
        <div>
          Active Users <span className="highlight"> {activeUsers} </span>
        </div>

        <div>
          Total <span className="highlight">{total}</span>
        </div>
      </div>
    </div>
  );
};

export default Component_Table;
