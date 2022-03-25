import i18next from "i18next"
import { useState, useEffect } from "react"
import { Button, Spinner } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { Route } from "react-router"
import { allApplications } from "../actions/applications"
import FilterModal from "../components/FilterModal"
import SmallCard from "../components/SmallAppCard"
import { MainFiltersTypes, NewApplicationTypes } from "../utils/tsTypes"
// import SmallCard from "../components/cards/SmallCard";
// import Search from "../components/forms/Search";
import "./../App.css"

const Home = () => {
  const [applications, setApplication] = useState([])
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showLoader, setShowFLoader] = useState(true)

  const { t } = useTranslation()

  const [startLocation, setStartLocation] = useState("")
  const [finishLocation, setFinishLocation] = useState("")
  const [typeOfApplication, setTypeOfApplication] = useState('')

  const currentLanguage = i18next.language || window.localStorage.i18nextLng

  useEffect(() => {
    loadAllApplications(currentLanguage)
  }, [])

  i18next.on("languageChanged", function (lng) {
    loadAllApplications(lng)
  })

  const loadAllApplications = async (currentLng: string, filters?: MainFiltersTypes) => {
    setShowFLoader(true)

    let res = await allApplications(currentLng, filters)

    setApplication(res.data)
    setShowFLoader(false)
  }

  const handleFilterSubmit = async () => {
    console.log({
      startLocation,
      finishLocation,
      type: typeOfApplication,
    })
    loadAllApplications(currentLanguage, {
      startLocation,
      finishLocation,
      type: typeOfApplication,
    })
  }

  return (
    <>
      <div className='container-fluid pt-4 text-center'>
        <h1>{t("allApplications")}</h1>
        <Button
          variant='primary'
          onClick={() => setShowFilterModal((val) => !val)}
        >
          {t("set_filters")}
        </Button>
      </div>
      <div className='col'>
        <br />
        {/* <Search /> */}
      </div>
      <div className='container-fluid'>
        <br />
        {/* <pre>{JSON.stringify(applications, null, 4)}</pre>  */}
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
