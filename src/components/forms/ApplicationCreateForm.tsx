import { DatePicker } from "antd"
import moment from "moment"
import React from "react"
import { ApplicationCreateFormPropsTypes } from "../../types"
import { FloatingLabel, Form } from "react-bootstrap"
import SelectCity from "../SelectCity"
import { useTranslation } from "react-i18next"

export const ApplicationCreateForm: React.FC<ApplicationCreateFormPropsTypes> = ({
  values,
  handleChange,
  handleSubmit,
  startLocation,
  finishLocation,
  setStartLocation,
  setFinishLocation,
  typeOfApplication,
  setTypeOfApplication,
}) => {
  const { t } = useTranslation()

  const { title, description, pricePerKg, travelDate } = values

  const disabledDate = (current) => current < moment().add(-1, "days")

  return (
    <form className='mb-8' onSubmit={handleSubmit}>
      <div className='form-group'>
        <div className='flex flex-row '>
          <span className='text-center'>{t("iWillSend_short")}</span>
          <Form.Check
            type='switch'
            defaultChecked={typeOfApplication}
            className='mx-4'
            onClick={() => setTypeOfApplication(!typeOfApplication)}
            id='custom-switch'
          />
          <span className='text-center'>{t("iWillTake_short")}</span>
        </div>
        <hr />
        <Form.Group className='mb-4' controlId='formBasicEmail'>
          <Form.Label>{t("Title")}</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={title}
            onChange={handleChange}
            required
            placeholder={t("EnterTitle")}
          />
        </Form.Group>
        <FloatingLabel controlId='floatingTextarea2' label={t("Description")}>
          <Form.Control
            as='textarea'
            style={{ height: "100px" }}
            name='description'
            value={description}
            required
            onChange={handleChange}
          />
          <Form.Text id='passwordHelpBlock' muted>
            {t("app_descr_tip")}
          </Form.Text>
        </FloatingLabel>
        {typeOfApplication && (
          <>
            <Form.Label className='mt-4'>
              {t("date_of_trave_shortl")}
            </Form.Label>
            <DatePicker
              name='travelDate'
              className='w-full'
              defaultValue={travelDate ? moment(travelDate) : moment()}
              onChange={handleChange}
              disabledDate={disabledDate}
            />
          </>
        )}
        <div className='mt-4'>
          <SelectCity
            location={startLocation}
            placeholder='from'
            setLocation={setStartLocation}
            justPlaceId={false}
          />
        </div>
        <div className='mt-4'>
          <SelectCity
            location={finishLocation}
            placeholder='to'
            setLocation={setFinishLocation}
            justPlaceId={false}
          />
        </div>
        {typeOfApplication && (
          <div className='mt-4'>
            <Form.Label>{t("PricePerKg")}</Form.Label>
            <Form.Control
              type='number'
              name='pricePerKg'
              onChange={handleChange}
              min='0'
              placeholder='Price Per Kg / $'
              value={pricePerKg}
            />
          </div>
        )}
      </div>

      <button className='btn btn-outline-primary mt-4 m-2' type='submit'>
        {t("save")}
      </button>
    </form>
  )
}


