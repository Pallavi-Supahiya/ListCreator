import React, { useState, useEffect } from 'react';
import classes from './List.scss';

const List = ({ heading }) => {
  const [listHeading, setListHeading] = useState('');
  const [editListHeading, setEditListHeading] = useState(false);
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
    if (e.keyCode === 'Enter') {
      setEditListHeading((prev) => !prev);
    }
  };
  return (
    <>
      <div class="box">
        {editListHeading ? (
          <input
            value={listHeading}
            onChange={onChangeListHeading}
            onKeyDown={onSaveListHeading}
            autoFocus
          />
        ) : (
          <h3 onClick={onClickListHeading}>{listHeading}</h3>
        )}
        <div>
          {cardList &&
            cardList.length > 0 &&
            cardList.map((card) => <h5>{card}</h5>)}
        </div>
        <div>
          {addCard ? (
            <span onClick={handelAddCard}>+ Add a card</span>
          ) : (
            <>
              <input
                placeholder="Card Name"
                onChange={handelCardHeading}
                value={cardHeading}
                autoFocus
              />
              <button onClick={onClickAddCard}>Add Card</button>
              <button onClick={handelAddCard}>X</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default List;
