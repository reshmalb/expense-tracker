


import UserSignUp from './components/user/userSignup'
import Header from './layout/Header';
import './App.css'
import { useState ,useEffect} from 'react';
import Expense from './components/expenses/expense'





import './App.css';
function App() {
  const [isLoggedin, setIsLoggedin]=useState(false)

  // const handleSignin=(value)=>{
  //   setIsLoggedin(value);     
  //   console.log("propsvalue",isLoggedin)
  // }
  // useEffect(() => {
  //   console.log("propsvalue", isLoggedin);
  // }, [isLoggedin]);
  return (
    < div className='App'>
     <Header/>
    {!isLoggedin  &&(<UserSignUp isUserSignedIn={(value)=>setIsLoggedin(value)}/>)} 
     {isLoggedin && (<Expense/>)}
    </div>
  
   
    
  );
}

export default App;
