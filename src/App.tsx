// import those pages in App.js
// then based on the path show each childrens <using react-router childrens
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import TopNav from "./components/TopNav"
// import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Registration"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NewApplication from "./pages/NewApplication"
import PrivateRoute from "./components/PrivateRoute"
import ViewApplication from "./pages/VievApplication"
import MyAppliactions from "./pages/MyAppliactions"
// import Dashboard from "./user/Dashboard";
// import DashboardSeller from "./user/DashboardSeller";
// import NewHotel from "./hotels/NewHotel";
// import StripeCallback from "./stripe/StripeCallback";
// import EditHotel from "./hotels/EditHotel";
// import ViewHotel from "./hotels/ViewHotel";
// import StripeSuccess from "./stripe/StripeSuccess";
// import StripeCancel from "./stripe/StripeCancel";
// import SearchResult from "./hotels/SearchResult";

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
