import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';
import './List.scss';
import './Button.scss';

const List = ({ heading, idx }) => {
  const [listHeading, setListHeading] = useState('');
  const [editListHeading, setEditListHeading] = useState(false);
  const [addCard, setAddCard] = useState(true);
  const [cardList, setCardList] = useState([]);
  const [cardHeading, setCardHeading] = useState('');
  /////////////////////////////////////////////////////////////
  const [editCardHeading, setEditCardHeading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setListHeading(heading);
    let tempCardList = JSON.parse(localStorage.getItem(heading));
    console.log('hhhhhh', tempCardList);
    if (tempCardList) setCardList(tempCardList);
  }, [heading]);

  const saveData = (data, id) => {
    let tempListData = [...cardList];
    tempListData.splice(id, 1, data);
    setCardList(tempListData);
    localStorage.setItem(listHeading, JSON.stringify(tempListData));
  };
  console.log(cardList);
  const handelAddCard = () => {
    setAddCard((prev) => !prev);
  };
  const handelCardHeading = (e) => {
    setCardHeading(e.target.value);
  };

  const onClickAddCard = () => {
    let tempCards = [...cardList];
    tempCards.push({ cardHeading: cardHeading, data: {} });
    setCardHeading('');
    setCardList(tempCards);
  };
  const onClickListHeading = () => {
    localStorage.removeItem(listHeading);

    setEditListHeading((prev) => !prev);
  };
  const onChangeListHeading = (e) => {
    setListHeading(e.target.value);
  };
  const onSaveListHeading = (e) => {
    if (e.keyCode === 13) {
      setEditListHeading((prev) => !prev);
      let tempLists = JSON.parse(localStorage.getItem('ListsName'));
      tempLists.splice(idx, 1, listHeading);
      localStorage.setItem('ListsName', JSON.stringify(tempLists));
      localStorage.setItem(listHeading, JSON.stringify(cardList));
    }
  };
  /////////////////////////////////////////////////////////////////////////

  const onChangeCardHeading = (e) => {
    setCardHeading(e.target.value);
  };
  const onSaveCardHeading = (e) => {
    if (e.keyCode === 13) {
      setEditCardHeading(false);
    }
  };
  const onClickCardHeading = (e) => {
    setModalOpen(true);
  };
  const onEditCardHeading = (e) => {
    console.log('edit');
  };
  //////////////////////////////////////////////////////////////////////////////
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
  const onDropDiv = (e) => {
    console.log(e);
  };
  //const [collectedProps, drop] = useDrop(() => ({
  // accept
  //}))
  return (
    // <div ref={drop}>
    <div className="divstyle" onDrop={onDropDiv}>
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
              <div className="design-cards">
                <Card
                  card={card}
                  idx={key}
                  saveData={saveData}
                  listHeading={listHeading}
                />
              </div>
            ))}
        </div>
        <div>
          {addCard ? (
            <span className="spn" onClick={handelAddCard}>
              + Add a card
            </span>
          ) : (
            <>
              <input
                className="cardinputstyle"
                type="textarea"
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
