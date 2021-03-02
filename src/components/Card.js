import React, { useState, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import './List.scss';
import Popup from './Popup';

const Card = ({ card, idx, saveData, moveItem, status, listHeading }) => {
  const [cardHeading, setCardHeading] = useState(card.cardHeading);
  const [openModal, setOpenModal] = useState(false);
  // const [editCardHeading, setEditCardHeading] = useState(false);
  const [cardImage, setCardImage] = useState('');
  const [data, setData] = useState({});
  const [editCardHeading, setEditCardHeading] = useState(false);
  const ref = useRef(null);
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
  // const onEditCardHeading = (e) => {
  //   setEditCardHeading((prev) => !prev);
  // };
  const [, drop] = useDrop({
    accept: 'Card',
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = idx;
      if (dragIndex === hoverIndex) return;
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'Card', ...card, idx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
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

  drag(drop(ref));

  return (
    <div ref={ref}>
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
      <div
        className="card-style"
        draggable="true"
        onClick={() => handleModal(true)}
      >
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

          {data.dueDate && Object.keys(data.dueDate).length > 0 && (
            <span className="date-design">
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              {data.dueDate.startDate && <span>{data.dueDate.startDate}</span>}
              {data.dueDate.startDate && data.dueDate.endDate && (
                <p className="hyphen">{'  to  '}</p>
              )}
              {data.dueDate.endDate && data.dueDate.endDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
