
const Team =({team,handleSelectTeam,selectedChoice})=>{
  return(
    <div className={`${team == selectedChoice ? "selected-team" : "team" } `} 
    onClick=
    {    
    ()=> {handleSelectTeam(team)} 
    }>
      <p>{team} </p>
    </div>
  )
  
}
export default Team