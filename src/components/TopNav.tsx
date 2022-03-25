import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap"
import { UserInStoreTypes } from "../utils/tsTypes"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import MainLogo from "./../images/home_icon.png"

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
  const [show, setShow] = useState(false);
  const handleClose = (val) => setShow(val);

  return (
    <>
    <Navbar bg="light" expand={false}>
  <Container fluid>
    <Link to='/'>
      <Image src={MainLogo} className="w-12" rounded />
      </Link>
    <Navbar.Toggle onClick={() => handleClose(true)} aria-controls="offcanvasNavbar" />
    <Navbar.Offcanvas
      id="offcanvasNavbar"
      show={show}
      onHide={() => handleClose(false)}
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel">{t('Menu')}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          {auth !== null && (
            <>
              <Link onClick={() => handleClose(false)} className='nav-link' to='/my_appliactions'>
                {t('MyApplications')}
              </Link>
              <Link onClick={() => handleClose(false)} className='nav-link' to='/application/new'>
                {t('new_application')}
              </Link>
            </>
          )}
          {auth !== null && (
            <Link className='nav-link pointer' to='/' onClick={logout}>
              {t('logout')} 
            </Link>
          )}
          {auth === null && (
            <>
              <Link onClick={() => handleClose(false)} className='nav-link' to='/login'>
              {t('login')}
              </Link>
              <Link onClick={() => handleClose(false)} className='nav-link' to='/register'>
              {t('registration_lable')}
              </Link>
            </>
          )}
          <NavDropdown id='dropdown-basic-button' title={t('change_lang')}>
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
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Container>
</Navbar>
</>
  )
}

export default TopNav
