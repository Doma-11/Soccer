import {useState} from 'react'
import LeagueComponent from './LeagueComponent'
import axios from 'axios';
import Spinner from './Spinner';
import {useQuery} from '@tanstack/react-query'
import {headers,baseUrlRapidapi} from '../variables'
import changeCountrySound from '../audio/changecountry.wav'
import { useNavigate } from 'react-router-dom';
const targetLeagueIds=[39,135,78,140,61,210]

async function fetchData() {
  try {
    const response = await axios.get(baseUrlRapidapi +'/leagues?season=2020&type=league', {headers});
    
    const filteredData= response.data.response.filter((item) => 
    targetLeagueIds.includes(item.league.id))

    return filteredData

  } catch (error) {
    console.error(error);
  
  }
}




const Home=()=>{
  const [selectedState, setSelectedState] = useState("")
  const [hoveredItem, setHoveredItem] = useState()
  const [isPlaying,setIsPlaying] = useState(true)
 
  const {data:leagues, error, isLoading } = useQuery ({
    queryKey: ["leagues"],
    queryFn: fetchData,
    staleTime: 1000 *5 * 1000,
  })

  const navigate =useNavigate()


  if(isLoading){
    return <Spinner/>
  }

  if(error){
    return <p>Error occured. {error.message}</p>
  }


  const handleSelect= (name) =>{
    setSelectedState(name)
    console.log(name)
  }

  const selectedLeague = leagues?.filter(item=>item.league.name=== selectedState) || []
  console.log("SELECTED: ", selectedLeague)
/**
 * Data from here goes to league dashboard
 * @param {*} name 
 * @param {*} item 
 */
  const goToLeaguePage = (name,item
  )=> {
    console.log("go to ", name, item )
    handleSelect(name)
  navigate(`/league/${name}`, {state:{selectedState:name,selectedLeague:item}})
}

  const handleHoverStart=(name)=>{ 
  //playSound()
  setHoveredItem(name)
  }

  const handleHoverEnd=()=>{
    setHoveredItem("")
  }

  const backgroundImageStyle= {
    backgroundSize: '100% 100%',
    width: '100vw',
    height:'100vh',
    backgroundAttachment: 'fixed'
  }


  const getImage=(hoveredItem)=>{
    switch(hoveredItem){
      case "Bundesliga":
      return "leagueGermany" 
      case "Premier League" :
      return "leagueEngland"
      case "HNL":
      return "leagueCroatia"
      case "Ligue 1":
      return "leagueFrance"
      case "Serie A":
      return "leagueItaly"
      case "La Liga":
      return "leagueSpain"
    }
  

  }

 
const playSound=()=>{
  const audio=new Audio(changeCountrySound)
  audio.play().catch((error) => {
    console.error("Audio play error:", error);
  });
  
  
}

  return (

<div className= {`defaultLeague ${getImage(hoveredItem)}`} style={backgroundImageStyle}>

 
  
    <div className="mainDiv">
      
        <div className='leaguesDiv'>
      {leagues?.map(item =>
       
        <LeagueComponent 
        key= {item.league.name}
        league={item} 
        hoverStart={()=>handleHoverStart(item.league.name)}
        hoverEnd={handleHoverEnd}
        goToLeaguePage={()=>goToLeaguePage(item.league.name,item.league)}
        />
             )}
        
      </div>
 
  
    </div>
    </div>
  )
}

export default Home
