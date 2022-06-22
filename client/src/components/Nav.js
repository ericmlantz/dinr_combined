import whiteLogo from '../images/DinrLogo+Text-White.png'
import colorLogo from '../images/DinrLogo+Text-Colored.png'


const Nav = ({minimal,setShowModal, showModal, setIsSignUp}) => {

  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(false)
  }
  const authToken = false

  return (
    <nav>
      <div className='logo-container'>
        <img className='logo' src={minimal ? colorLogo : whiteLogo}/>
      </div>
      {!authToken && !minimal &&
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >Log In</button>}
    </nav>
  )
}

export default Nav