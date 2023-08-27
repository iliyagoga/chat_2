import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import axios from "axios";
import { config } from "./utils/config";
import store from "./store/store";
import { observer } from "mobx-react-lite";

const App =observer(()=> {
  const t=localStorage.getItem('token')
  if(t!=null)
    store.setToken(t)
    //axios.post(config.backHost+config.apiCheck,{token:t})
  return <BrowserRouter>
    <Router></Router>
  </BrowserRouter>
  
})

export default App;
