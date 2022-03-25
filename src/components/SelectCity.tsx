import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import useOnclickOutside from "react-cool-onclickoutside"
import { Dropdown, Form } from "react-bootstrap"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const SelectCity = ({ location, placeholder, setLocation, justPlaceId }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  })
  const ref = useOnclickOutside(() => {
    clearSuggestions()
  })

  const { t } = useTranslation()

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false)
      clearSuggestions()

      getGeocode({ address: description })
        .then((results) => {
          console.log(results)
          if (justPlaceId) {
            setLocation(results[0].place_id)
          } else {
            setLocation({
              formatted_address: results[0].formatted_address,
              place_id: results[0].place_id,
              types: results[0].types,
            })
          }
        })
        .catch((error) => {
          console.log("😱 Error: ", error)
        })
    }

  const renderSuggestions = () => {
    const items = data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <Dropdown.Item key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </Dropdown.Item>
      )
    })

    return <Dropdown.Menu show>{items}</Dropdown.Menu>
  }

  return (
    <div ref={ref}>
      <Form.Label>
        {t(placeholder === "to" ? "come_city" : "go_city")}
      </Form.Label>
      <Form.Control
        type='text'
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={t(placeholder)}
      />
      <Form.Text id='passwordHelpBlock' muted>
        {t(
          placeholder === "from"
            ? "select_start_city_tip"
            : "select_finish_city_tip"
        )}
      </Form.Text>
      {status === "OK" && renderSuggestions()}
    </div>
  )
}

export default SelectCity
