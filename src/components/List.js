import React, { useState, useEffect } from 'react';

import Card from './Card';
import './List.scss';
import './Button.scss';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const List = ({ heading, idx, saveListData, listData }) => {
  const [listHeading, setListHeading] = useState('');
  const [editListHeading, setEditListHeading] = useState(false);
  const [addCard, setAddCard] = useState(true);
  const [cardList, setCardList] = useState([]);
  const [cardHeading, setCardHeading] = useState('');
  /////////////////////////////////////////////////////////////
  const [editCardHeading, setEditCardHeading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  let tempCardList = JSON.parse(localStorage.getItem(heading));
  useEffect(() => {
    setCardList(listData ? listData : tempCardList ? tempCardList : []);
  }, [listData]);
  useEffect(() => {
    setListHeading(heading);
    if (tempCardList) setCardList(tempCardList);
  }, [heading]);

  useEffect(() => {
    localStorage.setItem(listHeading, JSON.stringify(cardList));
    saveListData(cardList, listHeading);
  }, [cardList]);
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

  //////////////////////////////////////////////////////////////////////////////

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver && 'lightblue',
  });

  return (
    // <div ref={drop}>
    <Droppable droppableId={listHeading}>
      {(provided, snapshot) => (
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

            <div
              className="cards"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {cardList &&
                cardList.length > 0 &&
                cardList.map((card, key) => (
                  <Draggable
                    key={key}
                    index={key}
                    draggableId={key + `${listHeading}`}
                  >
                    {(provided, snapshot) => (
                      <div
                        className="design-cards"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // style={getItemStyle(
                        //   snapshot.isDragging,
                        //   provided.draggableProps.style
                        // )}
                      >
                        <Card
                          card={card}
                          idx={key}
                          saveData={saveData}
                          listHeading={listHeading}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
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
      )}
    </Droppable>
  );
};

export default List;
