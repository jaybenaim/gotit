import React from "react";
import { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import "./autoComplete.scss"
import dataMuse from "api/dataMuse";
import { capitalize } from "helpers/textFunctions";


const AutoComplete = ({
  type = "text",
  name = "search",
  classname = "search",
  placeholder = "Search...",
  label = "Search:",
  handleClick,
  handleTitleChange,
  parentClass,
  isForm = true,
  value,
  disabled = false
}) => {

  const [autoCompleteResults, setAutoCompleteResults] = useState()

  const [query, setQuery] = useState()

  const handleAutoComplete = async (query) => {
    if (!disabled) {
      if (query.length > 3) {

        const results = await dataMuse.get(`sug?s=${query}`)

        if (results) {

          const words = []

          for (const result of results.data) {
            if (result.score > 992) {
              words.push(result)
            }
          }

          setAutoCompleteResults(words)
        }

      } else {
        setAutoCompleteResults([])
      }
    }

  }

  const handleQuery = (e) => {
    e.preventDefault()

    const value = e.target.value
    handleAutoComplete(value)
    setQuery(value)
    handleTitleChange(value)
  }

  const handleResultClick = (result) => {
    if (result) {
      setQuery()
      handleClick(result)
      setAutoCompleteResults([])
    }
  }

  const autoCompleteResultElems = () => {
    return autoCompleteResults && autoCompleteResults.map((result, index) => {
      return (
        <ListGroup key={index}>
          <ListGroup.Item
            onClick={() => handleResultClick(result.word)}
            value={result.word}
          >
            {capitalize(result.word)}
          </ListGroup.Item>
        </ListGroup>
      )
    })
  }

  return (
    <div className="auto-complete">
      {isForm ? (
        <Form className={`auto-complete__form ${parentClass}`}>
          <Form.Group controlId={name}>
            <Form.Label>{label}</Form.Label>

            <Form.Control
              type={type}
              className={`input-group-${type} ${classname}`}
              name={name}
              value={capitalize(query)}
              onChange={(e) => handleQuery(e)}
              placeholder={placeholder}
              onClick={handleClick}
            />
          </Form.Group>
        </Form>
      ) : (
          <div className={parentClass}>
            <Form.Group controlId={name}>
              <Form.Label>{label}</Form.Label>

              <Form.Control
                type={type}
                className={`input-group-${type} ${classname}`}
                name={name}
                value={query ? capitalize(query) : capitalize(value)}
                onChange={(e) => handleQuery(e)}
                placeholder={placeholder}
              />
            </Form.Group>
          </div>
        )}

      {!disabled && (
        <div className="auto-complete__results">
          {autoCompleteResultElems()}
        </div>
      )}
    </div>
  )
}
export default AutoComplete;


