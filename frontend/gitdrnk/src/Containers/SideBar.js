import React from 'react'
import './Styles/SideBar.scss'
import PlayerListItem from '../components/ListItems/PlayerListItem/PlayerListItem'
import CurrentGameListItem from '../components/ListItems/CurrentGameListItem/CurrentGameListItem'
import GameListItem from '../components/ListItems/GameListItem/GameListItem'


const SideBar = ({currentGame, games, players, onGameJoin}) => {
  console.log(`test${currentGame}`);
  const gameList = games || [
    {_id: "1", game_id:"test_game"},
    {_id: "2", game_id:"test_game"},
    {_id: "3", game_id:"testCurrentGame"},
    {_id: "4", game_id:"test_game"},
    {_id: "5", game_id:"test_game"},
    {_id: "6", game_id:"test_game"},
    {_id: "7", game_id:"test_game"},
    {_id: "8", game_id:"test_game"},
    {_id: "9", game_id:"test_game"},
    {_id: "10",game_id:"test_game"},
    {_id: "11",game_id:"test_game"},
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
      {currentGame != ''
        && <CurrentGameListItem gameTitle={currentGame}/>}
      <div className='SideBar-GameSection'>
        <ul className='SideBar-GameList'>
          {gameList.map(game => {
            return <li key={game._id}>
                     <GameListItem gameTitle={game.game_id} joinCallback={onGameJoin}/>
                   </li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
