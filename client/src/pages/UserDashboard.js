// import axios from 'axios'
// import { useCookies } from "react-cookie"
// import {useEffect, useState} from 'react'
// import TinderCard from 'react-tinder-card'
// import ChatContainer from '../components/ChatContainer'

// const UserDashboard = () => {
//   const [user, setUser] = useState(null)
//   const [zipcodeUsers, setZipcodeUsers] = useState(null)
//   const [cookies, setCookie, removeCookie] = useCookies(['user'])
//   const [lastDirection, setLastDirection] = useState()


//   const userId = cookies.UserId


//   const getUser = async () => {
//     try {
//         const response = await axios.get('http://localhost:8000/user', {
//             params: {userId}
//         })
//         setUser(response.data)
//     } catch (error) {
//         console.log(error)
//     }
// }

//   const getZipcodeUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/zipcodeusers', {
//         params: {zipcode: user?.zipcode}
//       })
//       setZipcodeUsers(response.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     getUser()
//   }, [])

//   useEffect(() => {
//     if (user) {
//       getZipcodeUsers()
//     }
//   }, [user])

//   const updateMatches = async (matchedUserId) => {

//     try {
//       await axios.put('http://localhost:8000/addmatch', {
//       userId,
//       matchedUserId
//     })
//     getUser()
//     } catch (error) {
//       console.log(error)
//     }
//   }


//   const swiped = (direction, swipedUser) => {

//     if (direction === 'right') {
//       updateMatches(swipedUser.user_id)
//     }
//     setLastDirection(direction)
//   }

//   const outOfFrame = (name) => {
//     console.log(name + ' left the screen!')
//   }

//   const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

//   const filteredZipcodeUsers = zipcodeUsers?.filter(zipcodeUser => !matchedUserIds.includes(zipcodeUser.user_id))

//   return (
//     <>
//     {user &&
//     <div className='dashboard'>
//       <ChatContainer user={user}/>
//       <div className='swipe-container'>
//         <div className='card-container'>

//           {filteredZipcodeUsers?.map((zipcodeUser) =>
//             <TinderCard className='swipe'
//             key={zipcodeUser.user_id}
//             onSwipe={(dir) => swiped(dir, zipcodeUser.user_id)}
//             onCardLeftScreen={() => outOfFrame(zipcodeUser.first_name)}>
//               <div style={{ backgroundImage: 'url(' + zipcodeUser.profile_photo + ')' }} className='card'>
//               <h3>{zipcodeUser.first_name}</h3>
//               </div>
//             </TinderCard>
//           )}
//           <div className='swipe-info'>
//             {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
//           </div>

//         </div>
//       </div>
//     </div> }
//     </>
//   )
// }
// export default UserDashboard

import axios from 'axios'
import {useCookies} from "react-cookie"
import {useEffect, useState} from 'react'
import TinderCard from 'react-tinder-card'
import ChatContainer from '../components/ChatContainer'
import { BACKEND } from '../globals'

const UserDashboard = () => {
  const [user, setUser] = useState(null)
  const [zipcodeRestaurants, setZipcodeRestaurants] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [lastDirection, setLastDirection] = useState()

  const userId = cookies.UserId

  const getUser = async () => {
    try {
      const response = await axios.get(`${BACKEND}/user`, {
        params: {userId}
      })
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getZipcodeRestaurants = async () => {
    try {
      const response = await axios.get(`${BACKEND}/zipcoderests`, {
        params: {zipcode: user?.zipcode}
      })
      setZipcodeRestaurants(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      getZipcodeRestaurants()
    }
  }, [user])

  const updateMatches = async (matchedRestaurantId) => {
    try {
      await axios.put(`${BACKEND}/addrestmatch`, {
        userId,
        matchedRestaurantId
      })
      getUser()
    } catch (error) {
      console.log(error)
    }

  }


  const swiped = (direction, swipedRestaurantId) => {
    if (direction === 'right') {
      updateMatches(swipedRestaurantId)
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const matchedRestaurantIds = user?.matches.map(({rest_id}) => rest_id).concat(userId)

  const filteredZipcodeRestaurants = zipcodeRestaurants?.filter(zipcodeRestaurant => !matchedRestaurantIds.includes(zipcodeRestaurant.rest_id))

  return (
    <>
      {user &&
        <div className='dashboard overlay'>
          <ChatContainer user={user}/>
          <div className='swipe-container'>
            <div className='card-container'>
              {filteredZipcodeRestaurants ?
                (filteredZipcodeRestaurants.map((zipcodeRestaurant) =>
                  <TinderCard
                    className='swipe'
                    key={zipcodeRestaurant.rest_id}
                    onSwipe={(dir) => swiped(dir, zipcodeRestaurant.rest_id)}
                    onCardLeftScreen={() => outOfFrame(zipcodeRestaurant.rest_name)}>
                    <div
                      className='card'>
                      <div className='card-img-wrapper'>
                        <img className='card-img' src={zipcodeRestaurant.rest_logo}
                             alt={zipcodeRestaurant.rest_name + ' Logo'}/>
                      </div>
                      <div className='card-text'>
                        <h3>{zipcodeRestaurant.rest_name}</h3>
                        <div className='card-location'>
                          <p>{zipcodeRestaurant.rest_street}</p>
                          {zipcodeRestaurant.rest_apt && <p>{zipcodeRestaurant.rest_apt}</p>}
                          <p>{`${zipcodeRestaurant.rest_city}, ${zipcodeRestaurant.rest_state} ${zipcodeRestaurant.zipcode}`}</p>
                        </div>
                        <div className='card-divider'></div>
                        <div className='rest-description'>
                          {zipcodeRestaurant.rest_description}
                        </div>
                        <div className='card-divider'></div>
                        <div className='card-contact-info'>
                          {zipcodeRestaurant.rest_phone &&
                            <p className='card-contact-item'>{zipcodeRestaurant.rest_phone}</p>}
                          <hr className='separator-line'/>
                          {zipcodeRestaurant.rest_phone &&
                            <p className='card-contact-item'>{zipcodeRestaurant.food_type}</p>}
                          <hr className='separator-line'/>
                          {zipcodeRestaurant.rest_url && <button className='card-contact-item card-button'
                                                                 onClick={() => window.open(zipcodeRestaurant.rest_url, '_blank')}>Website</button>}
                        </div>
                      </div>
                    </div>
                    <div className='swipe-info'>
                      {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                    </div>
                  </TinderCard>
                )) : (<TinderCard>
                  <div className='card'>No More Restaurants</div>
                </TinderCard>) //NEED THIS TO APPEAR WHEN NO MORE RESTAURANTS ARE LEFT
              }
            </div>
          </div>
        </div>}
    </>
  )
}
export default UserDashboard