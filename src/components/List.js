import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';
import './List.scss';
import './Button.scss';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

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

  useEffect(() => {
    localStorage.setItem(listHeading, JSON.stringify(cardList));
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
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver && 'lightblue',
  });
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging && 'lightgreen',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    // result[droppableSource.droppableId] = sourceClone;
    // result[droppableDestination.droppableId] = destClone;
    console.log('sourceClone', sourceClone);
    console.log('destClone', destClone);
    return result;
  };

  const getList = (id) => cardList[id];

  const onDragEnd = (result) => {
    const { source, destination } = result;

    console.log('fjdkhf');
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(cardList, source.index, destination.index);
      console.log(items);
      console.log('HIii');
      setCardList(items);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      // this.setState({
      //   items: result.droppable,
      //   selected: result.droppable2,
      // });
    }
  };
  console.log(cardList, 'sjdhskjd');
  return (
    // <div ref={drop}>
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={idx + 'ab'}>
            {(provided, snapshot) => (
              <div
                className="cards"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {cardList &&
                  cardList.length > 0 &&
                  cardList.map((card, key) => (
                    <Draggable key={key} draggableId={key + 'aa'} index={key}>
                      {(provided, snapshot) => (
                        <div
                          className="design-cards"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
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
            )}
          </Droppable>
        </DragDropContext>
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
