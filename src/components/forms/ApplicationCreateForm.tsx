import { DatePicker } from "antd"
import moment from "moment"
import React from "react"
import { useTranslation } from "react-i18next"
import { Form } from "react-bootstrap"

import { ApplicationCreateFormPropsTypes } from "../../types"
import SelectCity from "../SelectCity"

export const ApplicationCreateForm: React.FC<ApplicationCreateFormPropsTypes> =
  ({
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

    const { title, description, pricePerKg, travelDate, communicationWays } =
      values

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
          <Form.Group controlId='floatingTextarea2'>
            <Form.Label>{t("Comments")}</Form.Label>
            <Form.Control
              as='textarea'
              style={{ height: "60px" }}
              name='description'
              value={description}
              required
              onChange={handleChange}
            />
            <Form.Text id='passwordHelpBlock' muted>
              {t("app_descr_tip")}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='floatingTextarea2'>
            <Form.Label className='mt-4'>{t("communicationWays")}</Form.Label>
            <Form.Control
              as='textarea'
              style={{ height: "60px" }}
              name='communicationWays'
              value={communicationWays}
              required
              onChange={handleChange}
            />
            <Form.Text id='passwordHelpBlock' muted>
              {t("app_com_ways_tip")}
            </Form.Text>
          </Form.Group>
          {typeOfApplication && (
            <>
              <Form.Label className='mt-4'>
                {t("date_of_trave_shortl")}
              </Form.Label>
              <DatePicker
                name='travelDate'
                className='w-full'
                placeholder={t("set_travel_date")}
                defaultValue={travelDate ? moment(travelDate) : undefined}
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
                placeholder={t("PricePerKgPlaceholder")}
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
