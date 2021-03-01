import React, { useState, useEffect } from 'react';
import './List.scss';
import Popup from './Popup';

const Card = ({
  card,
  setEditCardHeading,
  idx,
  saveData,
  editCardHeading,
  listHeading,
}) => {
  const [cardHeading, setCardHeading] = useState(card.cardHeading);
  const [openModal, setOpenModal] = useState(false);
  // const [editCardHeading, setEditCardHeading] = useState(false);
  const [cardImage, setCardImage] = useState('');
  const [data, setData] = useState({});
  useEffect(() => {
    if (card.data) {
      console.log(card.data);
      card.data &&
        card.data.cardImages &&
        card.data.cardImages.length > 0 &&
        setCardImage(card.data.cardImages[0].base64);
      setData(card.data);
    }
  }, [card]);
  const onEditCardHeading = (e) => {
    setEditCardHeading((prev) => !prev);
  };
  const onChangeCardHeading = (e) => {
    setCardHeading(e.target.value);
  };
  const onSaveCardHeading = (e) => {
    if (e.keyCode === 13) setEditCardHeading(false);
  };
  const handleModal = (val) => {
    console.log('im in handel', val);
    setOpenModal(val);
  };

  return (
    <>
      {openModal && (
        <Popup
          openModal={handleModal}
          setImage={setCardImage}
          data={card.data}
          setData={setData}
          idx={idx}
          saveCardData={saveData}
          cardHeading={cardHeading}
          setCardHeading={setCardHeading}
          listHeading={listHeading}
        />
      )}
      <div
        className="card-style"
        draggable="true"
        onClick={() => handleModal(true)}
      >
        <div>{cardImage && <img className="card-img" src={cardImage} />}</div>
        {editCardHeading ? (
          <input
            className="input-editing"
            value={cardHeading}
            onChange={onChangeCardHeading}
            onKeyDown={onSaveCardHeading}
            autoFocus
          />
        ) : (
          <>
            <div className="crd">
              <p className="cardstyle">{cardHeading} </p>
            </div>
          </>
        )}
        <div className="design-icon">
          {data.cardImages && data.cardImages.length > 0 && (
            <span>
              <i className="fa fa-paperclip"></i>
              {data.cardImages.length}
            </span>
          )}

          {data.description && (
            <span>
              <i className="fas fa-list-alt"></i>
            </span>
          )}
          {data.dueDate && (
            <span>
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              {data.dueDate.startDate && data.dueDate.startDate}-
              {data.dueDate.endDate && data.dueDate.endDate}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
