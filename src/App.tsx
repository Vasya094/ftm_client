import { BrowserRouter, Routes, Route } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import TopNav from "./components/TopNav"
import Register from "./pages/Registration"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NewApplication from "./pages/NewApplication"
import PrivateRoute from "./components/PrivateRoute"
import {ViewApplication} from "./pages/VievApplication"
import MyAppliactions from "./pages/MyAppliactions"


function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/application/:applicationId'
          element={<ViewApplication />}
        />

        <Route path='/application/new' element={<PrivateRoute />}>
          <Route path='' element={<NewApplication />} />
        </Route>
        <Route path='/my_appliactions' element={<PrivateRoute />}>
          <Route path='' element={<MyAppliactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
