import { useState } from "react"
import { createApplication } from "../actions/applications"
import { useSelector } from "react-redux"
import { ApplicationCreateForm } from "../components/forms/ApplicationCreateForm"
import { LocationTypes, NewApplicationTypes, UserInStoreTypes } from "../types"
import { useTranslation } from "react-i18next"
import "react-toastify/dist/ReactToastify.css"
import "react-notifications/lib/notifications.css"
import { NotificationContainer, NotificationManager } from "react-notifications"

const NewApplication = () => {
  // redux
  const { auth } = useSelector((state) => ({ ...state })) as {
    auth: UserInStoreTypes
  }
  const { token } = auth
  // state
  const [values, setValues] = useState<NewApplicationTypes>({
    title: "",
    description: "",
    pricePerKg: undefined,
    addedBy: "",
    travelDate: "",
    communicationWays: "",
  })
  const [typeOfApplication, setTypeOfApplication] = useState<boolean>(true)
  const { t } = useTranslation()

  const [startLocation, setStartLocation] = useState<
    LocationTypes | undefined
  >()
  const [finishLocation, setFinishLocation] = useState<
    LocationTypes | undefined
  >()

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()

    const newApplicationInfoObject = {
      ...values,
      type: typeOfApplication ? "take" : "send",
      startLocation,
      finishLocation,
    }

    if (
      newApplicationInfoObject.type === "take" &&
      (!newApplicationInfoObject.startLocation ||
        !newApplicationInfoObject.finishLocation)
    ) {
      NotificationManager.warning(
        t("select_start_and_finish"),
        t("WarningMessage"),
        3000
      )
    } else if (
      (newApplicationInfoObject.startLocation?.types[0] !== "locality" &&
        newApplicationInfoObject.startLocation?.types[0] !== "neighborhood") ||
      (newApplicationInfoObject.finishLocation?.types[0] !== "locality" &&
        newApplicationInfoObject.finishLocation?.types[0] !== "neighborhood")
    ) {
      NotificationManager.warning(
        t("make_sure_that_city"),
        t("WarningMessage"),
        3000
      )
    } else {
      try {
        let newAppToReq = {
          ...newApplicationInfoObject,
          startLocation: {
            placeId: newApplicationInfoObject.startLocation.place_id,
            namesInLangs: {},
          },
          finishLocation: {
            placeId: newApplicationInfoObject.finishLocation.place_id,
            namesInLangs: {},
          },
        }
        let res = await createApplication(token, newAppToReq)
        NotificationManager.success(
          t("applicatiob_success_created"),
          t("SuccessMessage"),
          3000
        )
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleChange = (e: any) => {
    if (e._isAMomentObject) {
      setValues({ ...values, travelDate: e._d.toString() })
    } else {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
  }

  return (
    <>
      <div className='container-fluid pt-4 pb-4 text-center'>
        <h1>{t("addNewApplication")}</h1>
      </div>

      <div className='container'>
        <div className='row'>
          <ApplicationCreateForm
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            startLocation={startLocation}
            finishLocation={finishLocation}
            setStartLocation={setStartLocation}
            setFinishLocation={setFinishLocation}
            typeOfApplication={typeOfApplication}
            setTypeOfApplication={setTypeOfApplication}
          />
        </div>
      </div>
      <NotificationContainer />
    </>
  )
}

export default NewApplication
