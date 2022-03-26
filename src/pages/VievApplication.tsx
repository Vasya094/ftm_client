import React, { useState, useEffect } from "react"
import { read } from "../actions/applications"
import moment from "moment"
import { NewApplicationTypes } from "../types"
import { RouteProps, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Button } from "react-bootstrap"

export const ViewApplication: React.FC<RouteProps> = ({ path }) => {
  const [application, setApplication] = useState<NewApplicationTypes>()

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
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 '>
          <b>
              {t(application?.type === 'take' ? 'iWillTakeBig' : 'iWillSendBig',)}
          </b>
          <div className="mt-2">
              <span><b>{t("from")}</b>: </span><span>{application?.startLocation?.formatted_address}</span>
              <span> - </span>
              <span><b>{t("to")}</b>: </span><span>{application?.finishLocation?.formatted_address}</span>
          </div>
          <div  className="mt-2">
              <span>
                  <b>{t('date_of_travel')}</b>: {moment(application?.travelDate).format('YYYY-MM-DD')}
              </span>
          </div>
          <div className="mt-4">
          <Button variant="primary">{t('write_to_app_owner')}</Button>
          </div>
      </div>
      </div>
      </div>
    </>
  )
}


