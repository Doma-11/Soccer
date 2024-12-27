
import { useState } from 'react';

import Standings from './Standings';
import Spinner from './Spinner';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useStandings from '../hooks/useStandings';


const LeagueDashboard= ()=>{
  const location = useLocation()
  const  {selectedState,selectedLeague} = location.state || { }
  const selectedLeagueId= selectedLeague.id
  const {data, error, isLoading } = useStandings(selectedLeagueId)

  const [selectedTeam,setSelectedTeam] = useState("")

  const navigate = useNavigate()
const goToHome=()=>{
  navigate("/")
}
const goToTeamPage = (item)=> {
  navigate(`/team/${item.team.id}`, {state:{data:data}})
}


  if(isLoading){
    return <Spinner/>
  }

  if(error){
    return <p>Error occured. {error.message}</p>
  }

  

 


  const backgroundImageStyle= {
    backgroundSize: '100%  150% ',
    width: '100vw',
    height:'100vh',
    backgroundAttachment: 'fixed'
  }

  
  return(
    
    <div className='dashboardLeague' style={backgroundImageStyle}>        
    <h3>{selectedState}</h3>
    {
      selectedTeam != ""  && <TeamInfo id= {selectedTeam} /> 
    }
    
     <button onClick= {goToHome}>
      Back
    </button>   



    <div className="teamsDiv">
    {data.standings[0].map(item=> 
        (
        <div className="teamDetails" key={item.team.id} onClick={()=>{goToTeamPage(item )}}>
            <img src={item.team.logo} className="imgFlag" alt="Item logo" />
            <p>{item.team.name}</p>
        </div>
        )
       )}
      </div>

 


  </div>

  ) 

}
export default LeagueDashboard


