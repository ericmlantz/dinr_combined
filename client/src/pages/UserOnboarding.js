import {useState} from "react";
import Nav from "../components/Nav";
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const UserOnboarding = () => {

//States
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [personFormData, setPersonFormData] = useState({
    user_id: cookies.UserId,
    first_name: '',
    email: '',
    hashed_password: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    zipcode: '',
    profile_photo: '',
    matches: [],
  })

//Uses
  const navigate = useNavigate()

//Handles
  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setPersonFormData((prevState) => ({
      ...prevState, [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    console.log('submitted')
    e.preventDefault();

    try {
      const response = await axios.put('https://secret-bastion-87382.herokuapp.com/user', {personFormData})
      const success = response.status === 200
      if (success) navigate('/user/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Nav
        minimal={true}
        setShowModal={() => {
        }}
        showModal={false}
      />
      <div className='onboarding'>
        <h2>CREATE ACCOUNT</h2>
        <form className="person-form" onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={personFormData.first_name}
              onChange={handleChange}
            />
            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                type="number"
                id="dob_month"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={personFormData.dob_month}
                onChange={handleChange}
              />
              <input
                type="number"
                id="dob_day"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={personFormData.dob_day}
                onChange={handleChange}
              />
              <input
                type="number"
                id="dob_year"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={personFormData.dob_year}
                onChange={handleChange}
              />
            </div>
            <label htmlFor="zipcode">Zipcode</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              placeholder="Zip Code"
              required={true}
              value={personFormData.zipcode}
              onChange={handleChange}
            />
            <input
              type='submit'
            />
          </section>
          <section>
            <label htmlFor="profile_photo">Profile Photo</label>
            <input
              type="url"
              name="profile_photo"
              id="profile_photo"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {personFormData.profile_photo &&
                <img className='profile-img-preview' src={personFormData.profile_photo} alt="Profile Pic Preview"/>
              }
            </div>
          </section>
        </form>
      </div>
    </>
  )
}
export default UserOnboarding