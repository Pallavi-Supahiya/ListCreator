import React, { useState, useEffect } from 'react';
import './Popup.scss';

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
  const [description, setDescription] = useState('');
  const [cardImages, setCardImages] = useState([]);
  const [editDesc, setEditDesc] = useState(true);
  const [dueDate, setDueDate] = useState();
  const [heading, setHeading] = useState('');
  useEffect(() => {
    setDescription(data.description ? data.description : '');
    setCardImages(data.cardImages ? data.cardImages : []);
    setDueDate(data.dueDate ? data.dueDate : {});
    setHeading(cardHeading);
  }, [data]);
  const onCloseModal = () => {
    const tempData = {
      description: description,
      cardImages: cardImages,
      cardHeading: heading,
      dueDate: dueDate,
    };
    setData(tempData);
    saveCardData(
      { data: tempData, listHeading: listHeading, cardHeading: cardHeading },
      idx
    );
    setCardHeading(heading);
    console.log('im in close');
    openModal(false);
  };
  const onChangeDesc = (e) => {
    setDescription(e.target.value);
  };
  const saveDesc = (e) => {
    console.log(e);
    setEditDesc(false);
  };
  const onChangeStartDate = (e) => {
    setDueDate({ ...dueDate, [e.target.name]: e.target.value });
  };
  const onChangeEndDate = (e) => {
    setDueDate({ ...dueDate, [e.target.name]: e.target.value });
  };
  const editDescChange = () => {
    setEditDesc(true);
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const onSelectImage = (e) => {
    getBase64(e.target.files[0]).then((base64) => {
      let tempCardImages = [...cardImages];
      tempCardImages.push({ base64, name: e.target.files[0].name });
      setCardImages(tempCardImages);
      if (tempCardImages.length === 1) setImage(base64);
    });
    console.log(e.target.files);
  };
  const onChangeHeading = (e) => {
    setHeading(e.target.value);
  };
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
            <label className="Date-button">
              <i class="fa fa-clock-o" aria-hidden="true"></i> Due Date
              <div>
                <input
                  type="date"
                  name="startDate"
                  value={dueDate && dueDate.startDate && dueDate.startDate}
                  onChange={onChangeStartDate}
                />
                <input
                  type="date"
                  name="endDate"
                  value={dueDate && dueDate.endDate && dueDate.endDate}
                  onChange={onChangeEndDate}
                />
              </div>
            </label>
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
  );
};
export default Popup;
