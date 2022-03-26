// import { diffDays } from "../../actions/hotel";
import { Link, useNavigate } from "react-router-dom"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Card, Button } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import moment from "moment"
import { useEffect, useState } from "react"

const SmallCard = ({
  appl,
  handleApplicationDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const [startCityLocalName, setStartCityLocalName] = useState("")
  const [finishCityLocalName, setFinishCityLocalName] = useState("")

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
          <Card.Title>
            {moment(appl?.travelDate).format("YYYY-MM-DD")}
          </Card.Title>
          <Card.Text>
            <span>
              {t("from")} {appl.startCityInfoLoc} (
              {appl.startLocation.formatted_address})
            </span>{" "}
            -{" "}
            <span>
              {t("to")} {appl.finishCityInfoLoc} (
              {appl.finishLocation.formatted_address})
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
