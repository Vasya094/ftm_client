import React, { useState, useEffect } from "react"
import { useStore } from "react-redux"
import { read } from "../actions/applications"
import moment from "moment"
import { useSelector } from "react-redux"
import { loadStripe } from "@stripe/stripe-js"
import { NewApplicationTypes, UserInStoreTypes } from "../types"
import { RouteProps, useLocation, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Button } from "react-bootstrap"

const ViewApplication: React.FC<RouteProps> = ({ path }) => {
  const [application, setApplication] = useState<NewApplicationTypes>()
  const [loading, setLoading] = useState(false)

  const { auth } = useSelector((state) => ({ ...state })) as {
    auth: UserInStoreTypes
  }

  useEffect(() => {
    loadSellerApplication()
  }, [])

  const { applicationId } = useParams()

  const loadSellerApplication = async () => {
    let res = await read(applicationId as string)
    console.log(res)
    setApplication(res.data)
  }

  const { t } = useTranslation()

  return (
    <>
      <div className='container-fluid p-5 text-center'>
        <h1>{application?.title}</h1>
      </div>
      <div>
          <div>
              {t(application?.type === 'take' ? 'iWillTakeBig' : 'iWillSendBig',)}
          </div>
          <div>
              <span>{t("from")}: </span><span>{application?.startLocation?.formatted_address}</span>
              <span> - </span>
              <span>{t("to")}: </span><span>{application?.finishLocation?.formatted_address}</span>
          </div>
          <div>
              <span>
                  {t('date_of_travel')}: {moment(application?.travelDate).format('YYYY-MM-DD')}
              </span>
          </div>
          <div>
          <Button variant="primary">{t('write_to_app_owner')}</Button>
          </div>
      </div>
    </>
  )
}

export default ViewApplication
