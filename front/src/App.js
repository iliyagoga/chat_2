import { BrowserRouter} from "react-router-dom";
import Router from "./Router";
import { observer } from "mobx-react-lite";

const App =observer(()=> {
    //axios.post(config.backHost+config.apiCheck,{token:t})
  return <BrowserRouter>
    <Router></Router>
  </BrowserRouter>
  
})

export default App;
