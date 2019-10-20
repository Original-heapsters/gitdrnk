import React from 'react'
import './Styles/SideBar.scss'
import PlayerListItem from '../components/ListItems/PlayerListItem/PlayerListItem'
import CurrentGameListItem from '../components/ListItems/CurrentGameListItem/CurrentGameListItem'
import GameListItem from '../components/ListItems/GameListItem/GameListItem'


const SideBar = ({currentGame, games, players}) => {
  const gameList = games || [
    {id: "1", gameTitle:"test_game"},
    {id: "2", gameTitle:"test_game"},
    {id: "3", gameTitle:"test_game"},
    {id: "4", gameTitle:"test_game"},
    {id: "5", gameTitle:"test_game"},
    {id: "51", gameTitle:"test_game"},
    {id: "52", gameTitle:"test_game"},
    {id: "53", gameTitle:"test_game"},
    {id: "54", gameTitle:"test_game"},
    {id: "55", gameTitle:"test_game"},
    {id: "56", gameTitle:"test_game"},
  ]

  // isActive, userName, points, profilePicLink
  const playerList = players || [
    {id:"6", isActive:true, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"7", isActive:true, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"8", isActive:true, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"9", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"10", isActive:true, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"11", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"a11", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"s11", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"s11", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"1fd1", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"1df1", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"11fd", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"1fd1", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"12", isActive:false, userName:"testUser69", points:"10",profilePicLink:null}
  ]

  return (
    <div className='SideBar'>
      <p>PLAYERS</p>
      <div className='SideBar-PlayerSection'>
        <ul className='SideBar-PlayerList'>
        {playerList.map(player => {
          return <li key={player.id}>
                   <PlayerListItem
                      isActive={player.isActive}
                      userName={player.userName}
                      points={player.points}
                      profilePicLink={player.profilePicLink}
                    />
                  </li>
        })}
        </ul>
      </div>
      <p>GAMES</p>
      {<CurrentGameListItem gameTitle={currentGame}/>}
      <div className='SideBar-GameSection'>
        <ul className='SideBar-GameList'>
          {gameList.map(game => {
            return <li key={game.id}>
                     <GameListItem gameTitle={game.gameTitle}/>
                   </li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
