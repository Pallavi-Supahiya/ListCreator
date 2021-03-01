import React, { useState, useEffect } from 'react';

import Card from './Card';
import './List.scss';
import './Button.scss';

const List = ({ heading }) => {
  const [listHeading, setListHeading] = useState('');
  const [editListHeading, setEditListHeading] = useState(false);
  const [editCardHeading, setEditCardHeading] = useState(false);
  const [addCard, setAddCard] = useState(true);
  const [cardList, setCardList] = useState([]);
  const [cardHeading, setCardHeading] = useState('');

  useEffect(() => {
    setListHeading(heading);
  }, [heading]);

  const handelAddCard = () => {
    setAddCard((prev) => !prev);
  };
  const handelCardHeading = (e) => {
    setCardHeading(e.target.value);
  };

  const onClickAddCard = () => {
    let tempCards = [...cardList];
    tempCards.push(cardHeading);
    setCardHeading('');
    setCardList(tempCards);
  };
  const onClickListHeading = () => {
    setEditListHeading((prev) => !prev);
  };
  const onChangeListHeading = (e) => {
    setListHeading(e.target.value);
  };
  const onSaveListHeading = (e) => {
    if (e.keyCode === 13) {
      setEditListHeading((prev) => !prev);
    }
  };
  const onDragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.key);
    console.log(e);
  };
  /*const onClickCardHeading = () => {
    setEditCardHeading((prev) => !prev);
  };
  const onChangeCardHeading = (e) => {
    setCardHeading(e.target.value);
  };
  const onSaveCardHeading = (e) => {
    if (e.keyCode === 13) {
      setEditCardHeading((prev) => !prev);
    }
  };*/

  return (
    <div className="divstyle">
      <div className="box">
        {editListHeading ? (
          <input
            value={listHeading}
            onChange={onChangeListHeading}
            onKeyDown={onSaveListHeading}
            autoFocus
          />
        ) : (
          <h4 onClick={onClickListHeading}>{listHeading}</h4>
        )}
        {/* {editCardHeading ? (
            <input
              value={cardHeading}
              onChange={onChangeCardHeading}
              onKeyDown={onSaveCardHeading}
            />
          ) : (
            <p onClick={onClickCardHeading}>{cardHeading}</p>
          )} */}
        <div className="cards">
          {cardList &&
            cardList.length > 0 &&
            cardList.map((card, key) => (
              <div
                className="card-style"
                key={key}
                draggable="true"
                onDragStart={onDragStart}
              >
                <Card card={card} />
              </div>
            ))}
        </div>
        <div>
          {addCard ? (
            <span onClick={handelAddCard}>+ Add a card</span>
          ) : (
            <>
              <input
                className="cardinputstyle"
                placeholder="Enter a title for this card"
                onChange={handelCardHeading}
                value={cardHeading}
                autoFocus
              />
              <br />
              <button className="buttons" onClick={onClickAddCard}>
                Add Card
              </button>
              <button className="cross" onClick={handelAddCard}>
                X
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
