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
    {id: "6", gameTitle:"test_game"},
    {id: "7", gameTitle:"test_game"},
    {id: "8", gameTitle:"test_game"},
    {id: "9", gameTitle:"test_game"},
    {id: "10", gameTitle:"test_game"},
    {id: "11", gameTitle:"test_game"},
  ]

  // isActive, userName, points, profilePicLink
  const playerList = players || [
    {id:"12", isActive:true, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"13", isActive:true, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"14", isActive:true, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"15", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"16", isActive:true, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"17", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"18", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"19", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"20", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"21", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"22", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"23", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"24", isActive:false, userName:"testUser69", points:"10",profilePicLink:null},
    {id:"25", isActive:false, userName:"testUser69", points:"10",profilePicLink:null}
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
