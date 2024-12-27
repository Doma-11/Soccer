
const LeagueComponent = ({league,hoverStart,hoverEnd,goToLeaguePage }) => {
  return (
    

  <div className="leagueContainer" onMouseEnter={hoverStart} onMouseLeave={hoverEnd} onClick={goToLeaguePage}> 

    <div className={`league`} 
  >
    <h3 >{league.league.name}</h3>
    <img src={league.league.logo} className="imgTeams"  style={{backgroundColor:"white", borderRadius:"50%"}}></img>
    
    </div>
</div>


  )

}

export default LeagueComponent