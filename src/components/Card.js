import React, { useState } from 'react';
import './List.scss';
import Popup from './Popup';

const Card = ({ card }) => {
  const [cardHeading, setCardHeading] = useState(card);
  const [editCardHeading, setEditCardHeading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [cardImage, setCardImage] = useState('');
  const [data, setData] = useState({});
  const onEditCardHeading = (e) => {
    setEditCardHeading((prev) => !prev);
  };
  const onChangeCardHeading = (e) => {
    setCardHeading(e.target.value);
  };
  const onSaveCardHeading = (e) => {
    if (e.keyCode === 13) setEditCardHeading(false);
  };
  const onClickCardHeading = (e) => {
    setModalOpen(true);
  };
  return (
    <>
      {modalOpen && (
        <Popup
          openModal={setModalOpen}
          setImage={setCardImage}
          data={data}
          setData={setData}
          cardHeading={cardHeading}
          setCardHeading={setCardHeading}
        />
      )}
      {cardImage && <img src={cardImage} />}
      {editCardHeading ? (
        <input
          value={cardHeading}
          onChange={onChangeCardHeading}
          onKeyDown={onSaveCardHeading}
        />
      ) : (
        <>
          <div className="crd">
            <p className="cardstyle" onClick={onClickCardHeading}>
              {cardHeading}{' '}
            </p>
            <button className="iconbtn" onClick={onEditCardHeading}>
              <i className="fas fa-pencil-alt"></i>
            </button>
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
          <span>{data.dueDate.startDate && data.dueDate.startDate}</span>
        )}
      </div>
    </>
  );
};

export default Card;
