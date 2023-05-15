import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import API from "./Data/Api";
import { useState } from "react";

function App() {
  let [api, setApi] = useState(API.listSpecies);
  let [apiChart, setApiChart] = useState(API.chartDetail);
  return (
    <div className="App">
      <Header api={api} setApi={setApi} />
      <Body
        api={api}
        setApi={setApi}
        apiChart={apiChart}
        setApiChart={setApiChart}
      />
      <Footer />
    </div>
  );
}
export default App;
