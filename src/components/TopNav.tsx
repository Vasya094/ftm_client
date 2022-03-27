import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap"
import { UserInStoreTypes } from "../types"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import MainLogo from "./../images/home_icon.png"
import ChangeLangs from "./../images/change-langs.png"

const TopNav = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector((state) => ({ ...state })) as {
    auth: UserInStoreTypes
  }
  const navigate = useNavigate()

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    })
    window.localStorage.removeItem("auth")
    navigate("/login")
  }

  const { t, i18n } = useTranslation()

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }
  const [show, setShow] = useState(false)
  const handleClose = (val) => setShow(val)

  const Menu = () => {
    return (
      <>
        {auth !== null && (
          <>
              <Link onClick={() => handleClose(false)} className='nav-link' to='/my_appliactions'>
                {t('MyApplications')}
              </Link>
            <Link
              onClick={() => handleClose(false)}
              className='nav-link'
              to='/application/new'
            >
              {t("new_application")}
            </Link>
          </>
        )}
        {auth !== null && (
          <Link className='nav-link pointer' to='/' onClick={logout}>
            {t("logout")}
          </Link>
        )}
        {auth === null && (
          <>
            <Link
              onClick={() => handleClose(false)}
              className='nav-link'
              to='/login'
            >
              {t("login")}
            </Link>
            <Link
              onClick={() => handleClose(false)}
              className='nav-link'
              to='/register'
            >
              {t("registration_lable")}
            </Link>
          </>
        )}

        <NavDropdown id='dropdown-basic-button' title={t("change_lang")}>
          <NavDropdown.Item onClick={() => changeLanguage("en")}>
            English
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => changeLanguage("ru")}>
            Русский
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => changeLanguage("ar")}>
            العربية
          </NavDropdown.Item>
        </NavDropdown>
      </>
    )
  }

  return (
    <>
      <Navbar expand={false}>
        <Container fluid>
          <Link to='/'>
            <Image src={MainLogo} className='w-12' rounded />
          </Link>

          <div className='hidden-md-down flex'>{Menu()}</div>

          <div className='hidden-md-up'>
            <Navbar.Toggle
              onClick={() => handleClose(true)}
              aria-controls='offcanvasNavbar'
            />
            <Navbar.Offcanvas
              id='offcanvasNavbar'
              show={show}
              style={{ border: "none" }}
              onHide={() => handleClose(false)}
              aria-labelledby='offcanvasNavbarLabel'
              placement='end'
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id='offcanvasNavbarLabel'>
                  {t("Menu")}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className='justify-content-end flex-grow-1 pe-3'>
                  {Menu()}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default TopNav
