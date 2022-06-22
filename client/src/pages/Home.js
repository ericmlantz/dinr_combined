import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'
import { useState } from 'react'

const Home = () => {

  //States
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const [identity, setIdentity] = useState({user_type: 'Person'})


  //Handles

  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(true)
  }

  //Other
  const authToken = false
  const minimal = false


  return (
    <div className="overlay">
      <Nav minimal={false} setShowModal={setShowModal} showModal={showModal} setIsSignUp={setIsSignUp} />
      <div className="home">
        <h1 className='primary-title'>Dinr</h1>
        <h2 className='slogan'>Find Hot Plates in Your Area!</h2>
        <button className='primary-button'
                onClick={handleClick}>
          {authToken ? 'Signout' : 'Create Account'}
        </button>

        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} identity={identity} setIdentity={setIdentity}/>
        )}
      </div>
    </div>
  )
}
export default Home