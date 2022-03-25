import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import SelectCity from "./SelectCity"

function FilterModal({
  show,
  setShow,
  startLocation,
  setStartLocation,
  finishLocation,
  setFinishLocation,
  typeOfApplication,
  setTypeOfApplication,
  handleFilterSubmit,
}) {
  const handleClose = () => setShow(false)
  const { t } = useTranslation()
  const [booleanTypeOfApp, setBooleanTypeOfApp] = useState(
    typeOfApplication === "take"
  )

  useEffect(() => {
    setBooleanTypeOfApp(!booleanTypeOfApp)
  }, [typeOfApplication])

  const resetFilters = () => {
    setStartLocation("")
    setFinishLocation("")
    setTypeOfApplication("")
    handleClose()
  }

  const selectHandler = (event) => {
    setTypeOfApplication(event.target.value)
  }

 const submitInComponent = () => {
    handleFilterSubmit()
    handleClose()
 }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Filters')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>{t("type_of_app")}</Form.Label>
              <Form.Select
                onChange={selectHandler}
                aria-label='Default select example'
              >
                <option value=''>{t('Unset')}</option>
                <option value='send'>{t("iWillSend_short")}</option>
                <option value='take'>{t("iWillTake_short")}</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className='my-3' controlId='exampleForm.ControlInput1'>
              <SelectCity
                location={startLocation}
                placeholder='from'
                setLocation={setStartLocation}
                justPlaceId={true}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <SelectCity
                location={finishLocation}
                placeholder='to'
                setLocation={setFinishLocation}
                justPlaceId={true}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            {t('Close')}
          </Button>
          <Button variant='primary' onClick={resetFilters}>
            {t('ResetFilters')}
          </Button>
          <Button variant='primary' onClick={submitInComponent}>
            {t('SaveChanges')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default FilterModal
