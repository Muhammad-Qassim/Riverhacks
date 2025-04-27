import { useState } from "react";
import SafeMoveHome from "./components/SafeMoveHome";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SafeMoveHome />
    </>
  );
}

export default App;
