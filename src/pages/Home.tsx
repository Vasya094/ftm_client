import i18next from "i18next"
import { useState, useEffect } from "react"
import { Button, Spinner } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { allApplications } from "../actions/applications"
import FilterModal from "../components/FilterModal"
import SmallCard from "../components/SmallAppCard"
import {
  MainFiltersTypes,
  NewApplicationTypes,
  UserInStoreTypes,
} from "../types"
import { Funnel, PlusLg } from "react-bootstrap-icons"

const Home = () => {
  const [applications, setApplication] = useState([])
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showLoader, setShowFLoader] = useState(true)

  const { t } = useTranslation()

  const [startLocation, setStartLocation] = useState("")
  const [finishLocation, setFinishLocation] = useState("")
  const [typeOfApplication, setTypeOfApplication] = useState("")

  const currentLanguage = i18next.language || window.localStorage.i18nextLng

  useEffect(() => {
    loadAllApplications(currentLanguage)
  }, [])

  let navigate = useNavigate()

  const { auth } = useSelector((state) => ({ ...state })) as {
    auth: UserInStoreTypes
  }

  const loadAllApplications = async (filters?: MainFiltersTypes) => {
    setShowFLoader(true)
    try {
      let res = await allApplications(filters)

      setApplication(res.data)
      setShowFLoader(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleFilterSubmit = async () => {
    loadAllApplications({
      startLocation,
      finishLocation,
      type: typeOfApplication,
    })
  }

  const goToAddNewApp = () => {
    navigate("/application/new")
  }

  return (
    <>
      <div className='container-fluid pt-4 mb-12 text-center'>
        <h1>{t("allApplications")}</h1>
        <div className='grid grid-cols-1 phone:grid-cols-2 gap-2'>
          <Button
            variant='outline-success'
            onClick={goToAddNewApp}
          >
            <PlusLg className='w-8 h-6' />
            {t("add_new_app")}
          </Button>
          <Button
            variant='outline-primary'
            onClick={() => setShowFilterModal((val) => !val)}
          >
            <Funnel className='w-8 h-6' />
            {t("set_filters")}
          </Button>
        </div>
      </div>

      <div className='container-fluid grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4'>
        {applications.map((appl: NewApplicationTypes) => (
          <SmallCard key={appl._id} appl={appl} />
        ))}
      </div>
      <FilterModal
        show={showFilterModal}
        startLocation={startLocation}
        setStartLocation={setStartLocation}
        finishLocation={finishLocation}
        setFinishLocation={setFinishLocation}
        setShow={setShowFilterModal}
        typeOfApplication={typeOfApplication}
        setTypeOfApplication={setTypeOfApplication}
        handleFilterSubmit={handleFilterSubmit}
      />
      {showLoader && (
        <span className='spiner-container'>
          <Spinner className='spiner' animation='border' />
        </span>
      )}
    </>
  )
}

export default Home
