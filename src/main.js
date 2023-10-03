import Cosmq, { renderDOM, observe } from "cosmq-js";
import Todo from "./components/Todo";
import Table from "./components/Table";
import Logo from "./assets/Logo.png";
import LogoText from "./assets/logo-text.png";
import Grid from "./assets/grid-bg.png";

const Component_App = ({}) => {
  const activeExample = observe("table")

  const examples = {
    todo: () => <Todo />,
    table: () => <Table />
  }

  return (
    <div className="container">
      <div style={{ marginBottom: "30px", position: "relative" }}>
        <img
          src={Grid}
          style={{
            maxWidth: "850px",
            width: "100%",
            display: "block",
            margin: "0 auto",
            zIndex: -1,
            position: "absolute",
            top: "-50px",
            opacity: 1
          }}
        />
        <img src={Logo} style={{ width: "150px", height: "150px" }} />
        <img
          src={LogoText}
          style={{ width: "400px", display: "block", margin: "0 auto" }}
        />
      </div>

      {IF(activeExample != null)(
        <div>
          <button
            style={{ margin: "10px" }}
            handle:click={() => {
              activeExample = null
            }}
          >
            Go back
          </button>
          {examples[activeExample]?.()}
        </div>
      )}
      {ELSE()(
        <div>
          <p className="tagline" style={{ textAlign: "center", marginBottom: "25px" }}>
            A lightweight, zero dependency, no Virtual DOM,
            <bold className="highlight">{" truely"}</bold> reactive js framework.
          </p>


          <h4>Examples</h4>

          <button
            style={{ margin: "10px" }}
            handle:click={() => {
              activeExample = "todo"
            }}
          >
            Todo
          </button>
          <button
            handle:click={() => {
              activeExample = "table"
            }}
          >
            Table
          </button>
        </div>
      )}

      <footer>
        <a href="https://github.com/DDinenno/cosmq-js">Github</a>
      </footer>
    </div>
  );
};

console.time("render app");
renderDOM(<Component_App />, "root");
console.timeEnd("render app");
