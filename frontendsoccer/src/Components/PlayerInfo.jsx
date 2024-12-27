import axios from 'axios';
import Spinner from './Spinner';
import {useQuery} from '@tanstack/react-query'
import { useParams,useLocation } from 'react-router-dom';
import {headers,baseUrlRapidapi} from '../variables';


async function fetchPlayer(id) {

  try {
    const response = await axios.get(`${baseUrlRapidapi}/players?id=${id}&season=2022`,{headers});

    console.log(response)
    return response.data.response[0]

  } catch (error) {
    console.error(error);
  
  }
}

const PlayerInfo =() =>{
  const {id}= useParams()
  const location = useLocation()
  const  {playernumber } = location.state || { }
  const {data, error, isLoading } = useQuery ({
    queryKey: ["player",id],
    queryFn: ()=> fetchPlayer(id),
    staleTime: 1000*5 * 1000,
  })
  if(isLoading){
    return <Spinner/>

  }

  if(error){
    return <p>Player info unavailabe.</p>
  }

  const {name,photo,age,nationality,number,position,height,weight} = data.player
  const {team,league,games,substitutes,shots,goals,passes,tackles,duels,dribbles,fouls,cards,penalty} = data.statistics[0]
return(
  <div style={{ display:"flex", flexDirection:"row", gap:"1rem", }}>
    <div style= {{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
    <img src={photo} className="imgTeams"></img>
    <p>{name}</p>
    <p>Age: {age}</p>
    <p>Nationality: {nationality}</p>
    <p>Position: {games.position}</p>
    <p>Number: {playernumber}</p>
    <p>Height: {height}</p>
    <p>Weight: {weight}</p>
    </div>


    <div>
      <p >Season 2022 statistics:</p>
      <StatParagraph title="Games" value={games.appearences}/> 
      <StatParagraph title="Minutes" value={games.minutes}/> 
      <StatParagraph title="Rating" value={parseFloat(games.rating).toFixed(2)}/> 
      <StatParagraph title="Goals" value={goals.total}/> 
      <StatParagraph title="Asissts" value={goals.assists}/> 
      
     
      </div>
    
  </div>

)
}


export default PlayerInfo

const StatParagraph = ({title,value})=>{
  return(
  <p> <strong>{title}:</strong> {value}</p>

  )
}