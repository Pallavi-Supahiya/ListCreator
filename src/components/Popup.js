import React, { useState, useEffect } from 'react'
import { DateRangePicker } from 'react-dates'
import Calendar from 'react-calendar'
import moment from 'moment'
import './Popup.scss'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

const Popup = ({
  openModal,
  setImage,
  setData,
  saveCardData,
  data,
  idx,
  cardHeading,
  setCardHeading,
  listHeading,
}) => {
  const [description, setDescription] = useState('')
  const [cardImages, setCardImages] = useState([])
  const [editDesc, setEditDesc] = useState(true)
  const [dueDate, setDueDate] = useState({})
  const [heading, setHeading] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)
  // const [selectionRange, setSelectionRange] = useState({
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   key: 'selection',
  // });
  useEffect(() => {
    setDescription(data.description ? data.description : '')
    setCardImages(data.cardImages ? data.cardImages : [])
    setDueDate(data.dueDate ? data.dueDate : dueDate)
    console.log(data.dueDate)
    setHeading(cardHeading)
  }, [data])
  const onCloseModal = () => {
    const tempData = {
      description: description,
      cardImages: cardImages,
      cardHeading: heading,
      dueDate: dueDate,
    }
    setData(tempData)
    saveCardData(
      { data: tempData, listHeading: listHeading, cardHeading: heading },
      idx
    )
    setCardHeading(heading)
    console.log('im in close')
    openModal(false)
  }
  const onChangeDesc = (e) => {
    setDescription(e.target.value)
  }
  const saveDesc = (e) => {
    console.log(e)
    setEditDesc(false)
  }
  const editDescChange = () => {
    setEditDesc(true)
  }
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }
  const onSelectImage = (e) => {
    getBase64(e.target.files[0]).then((base64) => {
      let tempCardImages = [...cardImages]
      tempCardImages.push({ base64, name: e.target.files[0].name })
      setCardImages(tempCardImages)
      if (tempCardImages.length === 1) setImage(base64)
    })
    console.log(e.target.files)
  }
  const onChangeHeading = (e) => {
    setHeading(e.target.value)
  }

  // const handleDate = (ranges) => {
  //   console.log('djkshdjks', ranges);
  //   if (ranges.selection && ranges.selection.key === 'selection') {
  //     setSelectionRange(ranges.selection);
  //     return;
  //   }
  //   setSelectionRange(ranges.range1);
  // };
  return (
    <div className="modal">
      <div className="modal-styling">
        {' '}
        <div className="banner-div">
          {cardImages && cardImages.length > 0 && (
            <img className="banner" src={cardImages[0].base64} />
          )}
        </div>
        <button className="cross-modal" onClick={onCloseModal}>
          {' '}
          X{' '}
        </button>
        <div class="modal-content">
          <div className="modal-div1">
            <input
              className="cardname"
              value={heading}
              onChange={onChangeHeading}
            />
            <p>
              in list <span className="listHead">{listHeading}</span>
            </p>
            <div className="division">
              <h4>
                <i className="fa fa-list-alt" aria-hidden="true"></i>Description
              </h4>
              <br />
              {!editDesc && (
                <button className="edit-button" onClick={editDescChange}>
                  Edit
                </button>
              )}
            </div>
            {editDesc ? (
              <div className="des-edit">
                <textarea
                  className="des-input"
                  placeholder="Enter the description you would like to add"
                  value={description}
                  onChange={onChangeDesc}
                />
                <button className="save-btn" onClick={saveDesc}>
                  Save
                </button>
              </div>
            ) : (
              <p> {description}</p>
            )}
            {cardImages && cardImages.length > 0 && (
              <div>
                <h4>
                  <i className="fa fa-paperclip" aria-hidden="true"></i>
                  Attachment
                </h4>
                {cardImages.map((image, idx) => (
                  <div key={idx} className="attachments">
                    <img className="img-modal" src={image.base64} />
                    <p className="img-name">{image.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="addition-card">
            <h4>Add to card</h4>
            <DateRangePicker
              startDate={dueDate.startDate ? dueDate.startDate : null} // momentPropTypes.momentObj or null,
              startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
              endDate={dueDate.endDate ? dueDate.endDate : null} // momentPropTypes.momentObj or null,
              endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
              onDatesChange={({ startDate, endDate }) =>
                setDueDate({ startDate, endDate })
              } // PropTypes.func.isRequired,
              focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
              displayFormat={'DD-MM-YYYY'}
              showClearDates={true}
              isOutsideRange={() => false}
              numberOfMonths={1}
            />
            <label class="add-photo-btn">
              <i className="fa fa-paperclip" aria-hidden="true"></i>
              Attachment
              <input
                type="file"
                id="myfile"
                name="myfile"
                onChange={onSelectImage}
                hidden
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Popup
