import { useContext, useEffect } from "react";
import "./App.css";
import Routing from "./Router";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Utility/ActionType";
import { auth } from "./Utility/Firebase";


function App() {
  const[{user},dispatch]=useContext(DataContext)

  useEffect(
    ()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // console.log(authUser);
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else{
        dispatch({
          type:Type.SET_USER,
          user:null
        })
      }
    })
  },[])
  return (
    <div>


               
     
      <Routing />
    </div>
  );
}

export default App;
