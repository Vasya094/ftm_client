import React, { useState, useEffect } from "react"
import { read } from "../actions/applications"
import moment from "moment"
import { ApplicationTypes, NewApplicationTypes } from "../types"
import { RouteProps, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Button } from "react-bootstrap"
import i18next from "i18next"

export const ViewApplication: React.FC<RouteProps> = ({ path }) => {
  const [application, setApplication] = useState<ApplicationTypes>()

  useEffect(() => {
    loadSellerApplication()
  }, [])

  const currentLanguage = i18next.language || window.localStorage.i18nextLng

  const { applicationId } = useParams()

  const loadSellerApplication = async () => {
    let res = await read(applicationId as string)
    setApplication(res.data)
  }

  const { t } = useTranslation()

  return (
    <>
      <div className='container-fluid p-5 text-center'>
        <h1>{application?.title}</h1>
        <h3>
          <b>{t("added_by")}:</b>
          {application?.addedBy.name}
        </h3>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 '>
            <b>
              {t(
                application?.type === "take" ? "iWillTakeBig" : "iWillSendBig"
              )}
            </b>
            <div className='mt-3'>
              <span>
                <b>{t("from")}</b>:{" "}
              </span>
              <span>
                {application?.startLocation?.namesInLangs[currentLanguage]}
              </span>
              <span> - </span>
              <span>
                <b>{t("to")}</b>:{" "}
              </span>
              <span>
                {application?.finishLocation?.namesInLangs[currentLanguage]}
              </span>
            </div>
            {application?.type === "take" && (
              <div className='mt-3'>
                <span>
                  <b>{t("date_of_travel")}</b>:{" "}
                  {moment(application?.travelDate).format("YYYY-MM-DD")}
                </span>
              </div>
            )}
            <div className='mt-3'>
              <span className='flex flex-col'>
                <b>{t("how_to_connect_with_me")}:</b>{" "}
                <span>{application?.communicationWays}</span>
              </span>
            </div>
            <div className='mt-3'>
              <span className='flex flex-col'>
                <b>{t("application_info_comment")}:</b>{" "}
                <span>{application?.description}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
