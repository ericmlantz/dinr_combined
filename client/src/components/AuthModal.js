import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import { useState } from 'react'
import { BACKEND } from "../globals";

const AuthModal = ({setShowModal, isSignUp, identity, setIdentity}) => {

  //States
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies([identity.user_type])

  //Uses
  const navigate = useNavigate()

  //Handles
  const handleClick = () => {
    setShowModal(false)
  }

  const handleIdentityChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setIdentity((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handlePersonSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isSignUp && (password !== confirmPassword) && (identity.user_type='Person')) {
        setError('Passwords need to match!')
        return
      }
      const response = await axios.post(`${BACKEND}/user/${isSignUp ? "signup" : 'login'}`, {email, password})

      setCookie('UserId', response.data.userId)
      setCookie('AuthToken', response.data.token)

      const success = response.status === 201

      if(success && isSignUp) {
        navigate('/user/onboarding')
      }
      if(success && !isSignUp) {
        navigate('/user/dashboard')
      }

      window.location.reload()

      console.log('Make a person POST request to the database')

    } catch (error) {
      console.log(error)
    }
  }

  const handleRestaurantSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isSignUp && (password !== confirmPassword) && (identity.user_type='Restaurant')) {
        setError('Passwords need to match!')
        return
      }
      const response = await axios.post(`${BACKEND}/restaurant/${isSignUp ? "signup" : "login"}`, {email, password})

      setCookie('RestId', response.data.restId)
      setCookie('AuthToken', response.data.token)

      const success = response.status === 201

      if(success && isSignUp) {
        navigate('/rest/onboarding')
      }
      if(success && !isSignUp) {
        navigate('/rest/dashboard')
      }

      window.location.reload()

      console.log('Make a restaurant POST request to the database')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(identity.user_type==='Person') {
      handlePersonSubmit(e)
    }
    if (identity.user_type === 'Restaurant')
      handleRestaurantSubmit(e)
  }


  //Other


  //Render
  return (
    <div className='auth-modal'>
      <div className="close-icon" onClick={handleClick}>ⓧ</div>
      <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
      <p>By clicking Submit, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy</p>
      <form className='identity-form'>
        <label className='identity-form-title'>Type Of User</label>
        <div className='multiple-input-container'>
          <input
            type="radio"
            id="person_identity"
            name="user_type"
            value='Person'
            onChange={handleIdentityChange}
            checked={identity.user_type === 'Person'}
          />
          <label htmlFor="person_identity">Person</label>
          <input
            type="radio"
            id="restaurant_identity"
            name="user_type"
            value='Restaurant'
            onChange={handleIdentityChange}
            checked={identity.user_type === 'Restaurant'}
          />
          <label htmlFor="restaurant_identity">Restaurant</label>
        </div>
      </form>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name='email'
          placeholder='Email'
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name='password'
          placeholder='Password'
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp &&
          <input
            type="password"
            id="password-check"
            name='password-check'
            placeholder='Confirm Password'
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        }
        <input className="secondary-button" type="submit"/>
        <p>{error}</p>
      </form>
    </div>
  )
}

export default AuthModal