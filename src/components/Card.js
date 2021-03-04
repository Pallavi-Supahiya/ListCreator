import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import './List.scss';
import Popup from './Popup';

const Card = ({ card, idx, saveData, listHeading }) => {
  const [cardHeading, setCardHeading] = useState('');
  const [openModal, setOpenModal] = useState(false);
  // const [editCardHeading, setEditCardHeading] = useState(false);
  const [cardImage, setCardImage] = useState('');
  const [data, setData] = useState({});
  const [editCardHeading, setEditCardHeading] = useState(false);
  useEffect(() => {
    if (card.data) {
      console.log(card.data);
      card.data &&
        card.data.cardImages &&
        card.data.cardImages.length > 0 &&
        setCardImage(card.data.cardImages[0].base64);
      setData(card.data);
    }
    setCardHeading(card.cardHeading);
    console.log('jhdskd', card, idx);
  }, [card]);
  // const onEditCardHeading = (e) => {
  //   setEditCardHeading((prev) => !prev);
  // };
  const onChangeCardHeading = (e) => {
    setCardHeading(e.target.value);
  };
  const onSaveCardHeading = (e) => {
    if (e.keyCode === 13) setEditCardHeading(false);
  };
  const handleModal = (val) => {
    console.log('im in handle', val);
    setOpenModal(val);
  };

  const onEditCardHeading = (e) => {
    setEditCardHeading((prev) => !prev);
  };
  //const [collected, drag, dragPreview] = useDrag(() => ({
  //   item: { id, card },
  // }));
  return (
    <>
      <button className="iconbtn" onClick={onEditCardHeading}>
        <i className="fas fa-pencil-alt"></i>
      </button>

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
      {/* collected.isDragging ?
    <div ref={dragPreview> : (
    <div ref={drag} {...collected}>
      ...
    </div> */}
      <div className="card-style" onClick={() => handleModal(true)}>
        <div className="image-editor">
          {cardImage && <img className="card-img" src={cardImage} />}
        </div>
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
              <p className="cardstyle"> {cardHeading} </p>
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

          {data.dueDate && Object.keys(data.dueDate).length > 0 && (
            <span className="date-design">
              <span className="clock-icon">
                {' '}
                <i className="fa fa-clock-o" aria-hidden="true"></i>
              </span>

              {data.dueDate.startDate && (
                <span>
                  <Moment format="MMM DD,YYYY">{data.dueDate.startDate}</Moment>
                </span>
              )}

              {data.dueDate.startDate && data.dueDate.endDate && (
                <p className="hyphen">{' - '}</p>
              )}

              {data.dueDate.endDate && (
                <Moment format="MMM DD,YYYY">{data.dueDate.endDate}</Moment>
              )}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
