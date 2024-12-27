


const Standings = ({standings,teamId} ) =>{

  
  return(
    <div>
    <TableHeadings/>

  {standings[0].map(item=> 
    <TableRow  item={item} teamId={teamId}/>
    )} 

    </div>
  )

}
export default Standings

const TableRow =({item,teamId})=>{
  const {rank,team,points,goalsDiff,form,status,description,all,home,away} = item
  return (
    <div className={`${item.team.id == teamId ? "tableRowCurrent" :"tableRow"}`}> 

      <p>{rank}   </p>
      <p style={{width:"180px",textAlign:"left"}}> {team.name} </p>
      <p> {points}</p>
      <p> {goalsDiff}</p>
      <p>{all.played}</p>
   
      <p>{all.win}</p>
      <p>{all.draw}</p>
      <p>{all.lose}</p> 
    </div>
  )
}

const TableHeadings =()=>{
  
  return (
    <div className="tableRow">
      <p>Rank</p>
      <p style={{width:"180px",textAlign:"left"}}>Team</p>
      <p>Points</p>
      <p>GoalsDiff</p>
      <p>Played</p>
      <p>Win</p>
      <p>Draw</p>
      <p>Lose</p>
    </div>
  )
}