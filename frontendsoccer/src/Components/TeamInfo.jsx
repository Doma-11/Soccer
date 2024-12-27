import axios from 'axios';
import Spinner from './Spinner';
import {useQuery} from '@tanstack/react-query'
import { useParams ,useLocation} from 'react-router-dom';
import {headers,baseUrlRapidapi} from '../variables';
import { useNavigate } from 'react-router-dom';

import Standings from './Standings';

async function fetchTeam(id) {

  try {
    const response = await axios.get(`${baseUrlRapidapi}/players/squads?team=${id}`,{headers});
    return response.data.response[0]

  } catch (error) {
    console.error(error);
  
  }
}

const TeamInfo =() =>{
  const {id}= useParams()
  const navigate =useNavigate()
  const location = useLocation()
  
  const goToPlayerPage = (id,playernumber)=> {
    navigate(`/player/${id}`, {state:{playernumber:playernumber}})
  }
  const {data, error, isLoading } = useQuery ({
    queryKey: ["squad",id],
    queryFn: ()=> fetchTeam(id),
    staleTime: 1000*5 * 1000,
  })
  if(isLoading){
    return <Spinner/>

  }

  if(error){
    return <p>Error occured. {error.message}</p>
  }

return(

  <div style={{ display:"flex", flexDirection:"column", gap:"1rem", }} className='dashboardLeague'>
  
  
    <div style= {{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
    <img src={data.team.logo} className="imgTeams"></img>
    <p>{data.team.name}</p>
    
    </div>


  <div style={{ display:"flex", flexDirection:"row"}}>
  
    

  <div>
  {data.players.map(item=> 
  
    
  <div onClick={()=>{goToPlayerPage(item.id,item.number)}}  key ={item.id} style={{ display:"flex", flexDirection:"row", gap:"4rem"}}>
      <img src={item.photo} className="imgFlag"></img>
      <p>{item.number}</p>
      <p>{item.name}</p>

    </div>
    
    )}
    
  </div>
  <Stadium id={id}/>
  </div>
<h3>Standings</h3>
  <Standings standings={location.state.data.standings} teamId={id} /> 
    
    
  </div>

)
}
export default TeamInfo




async function fetchStadium(id) {

  try {
    const response = await axios.get(`https://api-football-v1.p.rapidapi.com/v3/teams?id=${id}`
  ,{
    headers:headers
      
    });

    console.log(response)
    return response.data.response[0].venue

  } catch (error) {
    console.error(error);
  
  }
}


const Stadium =({id})=>{

  const {data, error, isLoading } = useQuery ({
    queryKey: ["stadium",id],
    queryFn: ()=> fetchStadium(id),
    staleTime: 1000*5 * 1000,
  })
  if(isLoading){
    return <Spinner/>

  }

  if(error){
    return <p>Error occured. {error.message}</p>
  }
  return(
    <div>
    <img src={data.image} className="imgStadium"></img>
    <p> {data.name}</p>
    <p> Capacity: {data.capacity}</p>
    </div>
  )
}