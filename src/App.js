import logo from "./logo.svg";
import "./App.css";
import NDJSON from "./NDJSON";
import { JSON } from "./JSON";

function App() {
  return (
    <div className="App" style={{ display: "flex", gap: 40, padding: 20 }}>
      <NDJSON />
      <JSON />
    </div>
  );
}

export default App;
