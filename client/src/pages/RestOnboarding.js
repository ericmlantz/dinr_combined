import {useState} from "react";
import Nav from "../components/Nav";
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {BACKEND} from "../globals";

const RestOnboarding = () => {

//States
  const [cookies, setCookie, removeCookie] = useCookies(['rest']);
  const [restaurantFormData, setRestaurantFormData] = useState({
    rest_id: cookies.RestId,
    rest_name: '',
    rest_logo: '',
    rest_photo1: '',
    rest_description: '',
    rest_url: '',
    rest_phone: '',
    food_type: '',
    rest_street: '',
    rest_apt: '',
    rest_city: '',
    rest_state: '',
    zipcode: '',
    matches: [],
  })

//Uses
  const navigate = useNavigate()

//Handles
  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setRestaurantFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    console.log('Restaurant submitted')
    e.preventDefault();

    try {
      const response = await axios.put(`${BACKEND}/rest`, {restaurantFormData})
      const success = response.status === 200
      if (success) navigate('/rest/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Nav
        minimal={true}
        setShowModal={() => { }}
        showModal={false}
      />
      <div className='onboarding'>
        <h2>CREATE ACCOUNT</h2>
        <form className="restaurant_form" onSubmit={handleSubmit}>
          <section>
            <label htmlFor="rest_name">Restaurant Name</label>
            <input
              type="text"
              id="rest_name"
              name="rest_name"
              placeholder="Restaurant Name"
              required={true}
              value={restaurantFormData.rest_name}
              onChange={handleChange}
            />
            <label htmlFor="rest_logo">Upload Logo</label>
            <input
              type="text"
              id="rest_logo"
              name="rest_logo"
              required={true}
              value={restaurantFormData.rest_logo}
              onChange={handleChange}
            />
            <label htmlFor="rest_description">Description</label>
            <input
              type="text"
              id="rest_description"
              name="rest_description"
              placeholder="An eating establishment your taste buds will want forever more!"
              required={true}
              value={restaurantFormData.rest_description}
              onChange={handleChange}
            />
            <label htmlFor="rest_url">Website</label>
            <input
              type="url"
              id="rest_url"
              name="rest_url"
              placeholder="https://www.dinr.com"
              value={restaurantFormData.rest_url}
              onChange={handleChange}
            />
            <label htmlFor="rest_phone">Phone Number</label>
            <input
              type="tel"
              id="rest_phone"
              name="rest_phone"
              placeholder="123-456-7890"
              value={restaurantFormData.rest_phone}
              onChange={handleChange}
            />
          </section>
          <section className='loc-section'>
            <label htmlFor="food_type">Type of Cuisine:</label>
            <select  multiple name="food_type" id="food_type" required={true}> //NEED SOME WAY TO MAKE THIS APPEAR IN RESTAURANT DATA UPDATE
              <option value="">Select an option</option>
              <option value="chinese">Chinese</option>
              <option value="italian">Italian</option>
              <option value="spanish">Mexican/Spanish</option>
              <option value="japanese">Japanese</option>
              <option value="american">American</option>
              <option value="thai">Thia</option>
              <option value="indian">Indian</option>
              <option value="french">French</option>
              <option value="greek">Greek</option>
              <option value="german">German</option>
              <option value="british">British</option>
              <option value="other">Other</option>
            </select>
            <label>Location</label>
            <input
              type="text"
              id="rest_street"
              name="rest_street"
              placeholder="123 Main Street"
              required={true}
              value={restaurantFormData.rest_street}
              onChange={handleChange}
            />
            <input
              type="text"
              id="rest_apt"
              name="rest_apt"
              placeholder="Apt/P.O. Box/Suite"
              required={false}
              value={restaurantFormData.rest_apt}
              onChange={handleChange}
            />
            <div className='loc-city-state-zip'>
              <input
                type="text"
                id="rest_city"
                name="rest_city"
                placeholder="Atlanta"
                required={true}
                value={restaurantFormData.rest_city}
                onChange={handleChange}
              />
              <input
                type="text"
                id="rest_state"
                name="rest_state"
                placeholder="Georgia"
                required={true}
                value={restaurantFormData.rest_state}
                onChange={handleChange}
              />
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                placeholder="12345"
                required={true}
                value={restaurantFormData.zipcode}
                onChange={handleChange}
              />
            </div>
            <input
              type='submit' value="submit"
            />
          </section>
        </form>
      </div>
    </>
  )
}
export default RestOnboarding