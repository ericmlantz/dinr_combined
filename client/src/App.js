//Library Imports
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useCookies } from "react-cookie";

//Component/Page Imports
import Home from './pages/Home'
import UserOnboarding from './pages/UserOnboarding'
import RestOnboarding from './pages/RestOnboarding'
import RestDashboard from "./pages/RestDashboard"
import UserDashboard from "./pages/UserDashboard"

//API Imports

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {authToken && <Route path='/user/onboarding' element={<UserOnboarding/>}/>}
        {authToken && <Route path='/rest/onboarding' element={<RestOnboarding/>}/>}
        {authToken && <Route path='/user/dashboard' element={<UserDashboard/>}/>}
        {authToken && <Route path='/rest/dashboard' element={<RestDashboard/>}/>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
