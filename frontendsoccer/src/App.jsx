import './App.css'
import Home from './Components/Home'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import TeamInfo from './Components/TeamInfo'
import PlayerInfo from './Components/PlayerInfo'
import LeagueDashboard from './Components/LeagueDashboard'




function App() {
  
  return ( 
  
    <div className="countriesContainer"> 
    <div className="mainMenu">   
    <Router>
      <Routes>
        <Route path="/" element={<Home  />}/>
        <Route path="/team/:id" element={<TeamInfo/>}/>
        <Route path="/player/:id" element ={<PlayerInfo/>}/>
        <Route path="/league/:name" element={<LeagueDashboard/>}></Route>
      </Routes>
    </Router>         
          
    </div>
    </div>  
    
  )
}

export default App









