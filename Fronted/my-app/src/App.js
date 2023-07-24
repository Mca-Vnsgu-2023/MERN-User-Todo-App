
import { useEffect } from 'react';
import './App.css';
import MainRoutes from './component/Routes/routes';
import { useNavigate } from 'react-router-dom';


function App() {
  
  const navigate=useNavigate()
  const UserAuth=localStorage.getItem('UserToken')

useEffect(()=>{
    if(!UserAuth){
      navigate('/login')
    }
},[])

  return (
    <div className="App">
      <MainRoutes/>
    </div>
  );
}

export default App;
