// import { diffDays } from "../../actions/hotel";
import { useNavigate } from "react-router-dom"
import { Card, Button } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import moment from "moment"
import i18next from "i18next"

const SmallCard = ({
  appl,
  handleApplicationDelete = (f) => f,
  owner = false,
}) => {
  const currentLanguage = i18next.language || window.localStorage.i18nextLng

  let navigate = useNavigate()
  const goToVievApp = (id: string) => {
    navigate(`/application/${id}`, { state: {}, replace: true })
  }

  const { t } = useTranslation()

  return (
    <div className='mb-4'>
      <Card border={appl.type === "send" ? "primary" : "secondary"}>
        <Card.Header as='h5'>
          {appl.type === "send" ? t("iWillSend") : t("iWillTake")}
        </Card.Header>
        <Card.Body>
          {appl.type === "take" && (
            <Card.Title>
              {moment(appl?.travelDate).format("YYYY-MM-DD")}
            </Card.Title>
          )}
          <Card.Text>
            <span>
              {t("from")} {appl.startCityInfoLoc} (
              {appl.startLocation.namesInLangs[currentLanguage]})
            </span>{" "}
            -{" "}
            <span>
              {t("to")} {appl.finishCityInfoLoc} (
              {appl.finishLocation.namesInLangs[currentLanguage]})
            </span>
          </Card.Text>
          <div className='flex justify-between'>
            <Button onClick={() => goToVievApp(appl._id)} variant='primary'>
              {t("more_info")}
            </Button>
            {owner && (
              <Button
                onClick={() => handleApplicationDelete(appl._id)}
                variant='danger'
              >
                {t("delete_app")}
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SmallCard
