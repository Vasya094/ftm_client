import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { myApplications, deleteApplication } from "../actions/applications"
import { toast } from "react-toastify"
import { NewApplicationTypes, UserInStoreTypes } from "../types"
import SmallCard from "../components/SmallAppCard"
import { useTranslation } from "react-i18next"

const MyAppliactions = () => {
  const { auth } = useSelector((state) => ({ ...state })) as {
    auth: UserInStoreTypes
  }
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadMyApplications()
  }, [])

  const loadMyApplications = async () => {
    setLoading(true)
    try {   
      let { data } = await myApplications(auth.token)
      setApplications(data)
    } catch (error) {
        console.error(error)
    } finally {
      setLoading(false)
    }

  }

  const handleApplicationDelete = async (hotelId) => {
    deleteApplication(auth.token, hotelId).then((res) => {
      toast.success("Hotel Deleted")
      loadMyApplications()
    })
  }

  const { t } = useTranslation()

  return (
    <>
      <div className='container-fluid'>
        <div className='row mt-4 mb-12'>
          <div className='text-center'>
            <h1>{t("YourApplications")}</h1>
            <Link to='/application/new' className='btn btn-primary'>
              {t('AddNew')}
            </Link>
 
        </div>
        </div>

        <div className='row'>
          {applications.map((appl: NewApplicationTypes) => (
            <SmallCard
              key={appl._id}
              appl={appl}
              showViewMoreButton={false}
              owner={true}
              handleApplicationDelete={handleApplicationDelete}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default MyAppliactions
