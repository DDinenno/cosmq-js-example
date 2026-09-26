import Cosmq, { observe, compute } from "cosmq-js";
import AddUserModal from "./AddUserModal"
import { genRows, getId } from "../utils/random";

const columns = ["Id", "Name", "Birth Date", "Profession", "active"];

const Component_Table = ({ }) => {
  const data = observe(genRows(columns, 4));
  const activeCell = observe(null);
  const activeRow = observe(null);
  const addModalActive = observe(false);

  const total = compute(data.length);

  const activeUsers = compute(() =>
    data.reduce((sum, curr) => sum + (curr.active ? 1 : 0), 0),
  );

  const getColumn = (row, col) => {
    switch (col) {
      case "Id":
        return <span style={{ padding: "0 25px" }}>{row.Id}</span>;
      case "active":
        return (
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
        )
      case "Birth Date":
        const formattedDate = new Date(row[col]).toISOString()?.split('T')?.[0]

        return (
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
            value={formattedDate}
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
        )
      default:
        return (
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
        )
    }
  };

  const handleAddUser = (user) => {
    const newUser = {
      ["Id"]: getId(),
      ["Name"]: user.name,
      ["Birth Date"]: new Date(`${user.birthDay}`).toLocaleDateString(),
      ["Profession"]: user.profession,
      ["active"]: true,
    }

    data = data.concat(newUser);
    addModalActive = false

  }

  const handleRemoveUsers = (amountToRemove) => {
    data = data.slice(0, data.length - amountToRemove);
  }


  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          height: "40px",
          marginBottom: "10px",
          alignItems: "center",
          justifyContent: "cemountNodenter",
        }}
      >
        {IF(addModalActive)(
          <div style={{ position: "absolute", top: 0, left: 0, zIndex: 10000 }}>
            <AddUserModal onSubmit={handleAddUser} onCancel={() => addModalActive = false} />
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", justifyContent: "end", width: "100%" }}>
          <button
            className="alt"
            handle:click={() => { addModalActive = true }}
          >
            Add User
          </button>

          <button
            className=""
            handle:click={() => {
              data = data.concat(genRows(columns, 50));
            }}
          >
            Add 50 Users
          </button>

          <button
            className=""
            handle:click={() => handleRemoveUsers(50)}
          >
            Remove 50 Users
          </button>
        </div>

      </div >

      <div
        className="virtual-container"
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
            {data.$map(row => (
              <tr
                key={`${row.Id}`}
                style={{
                  opacity: row.active ? 1 : 0.5,
                }}
              >
                {columns.map((col) => <td>{getColumn(row, col)}</td>)}

                <td>
                  <button
                    handle:click={() => {
                      data = data.filter((r) => r.Id !== row.Id);
                    }}
                  >
                    X
                  </button>
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
    </div >
  );
};

export default Component_Table;
