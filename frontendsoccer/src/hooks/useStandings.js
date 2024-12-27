import axios from 'axios';
import {headers,baseUrlRapidapi} from '../variables';
import {useQuery} from '@tanstack/react-query'



async function fetchStandings(selectedLeaugeId) {

  try {
    const response = await axios.get(`${baseUrlRapidapi}/standings?season=2020&league=${selectedLeaugeId}`,{headers});
    return response.data.response[0].league
  } catch (error) {
    console.error(error);
  
  } }

const useStandings= (selectedLeagueId)=>{

  const {data, error, isLoading } = useQuery ({
    queryKey: ["leagues",selectedLeagueId],
    queryFn: ()=> fetchStandings(selectedLeagueId),
    staleTime: 1000*5 * 1000,
  })

  return  {data, error, isLoading }
}

export default useStandings