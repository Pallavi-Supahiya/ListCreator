import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import List from './List';
import { reorderRows, rows } from './reorder';
import './Lists.scss';
import './Button.scss';
const Lists = () => {
  const [addList, setAddList] = useState(true);
  const [heading, setHeading] = useState('');
  const [lists, setLists] = useState([]);
  useEffect(() => {
    let tempLists = JSON.parse(localStorage.getItem('ListsName'));
    console.log(tempLists);
    if (tempLists) setLists(tempLists);
  }, []);
  const handelAddList = (e) => {
    setAddList((prevState) => !prevState);
    console.log(e.target);
  };
  const handelHeading = (e) => {
    setHeading(e.target.value);
  };
  const onClickAddList = (e) => {
    if (heading.length < 3) return alert('Min 4 Char required..!');
    let tempList = [...lists];
    tempList.push(heading);
    setHeading('');
    setLists(tempList);
    localStorage.setItem('ListsName', JSON.stringify(tempList));
  };
  const allowDrop = (e) => {
    e.preventDefault();
  };
  const onDropIt = (e) => {
    e.preventDefault();
    // let sourceId = e.dataTransfer.getData('text/plain');
    // let sourceIdEl = document.getElementById(sourceId);
    // let sourceIdParentEl = sourceIdEl.parentElement;
    console.log(e);
  };
  // const validation = (e) => {
  // if (e.keyCode === 13) {
  // if (e.value == ' ') setHeading(true);
  //  else setHeading(false);
  // }
  // };
  const onDragEnd = (result) => {
    console.log(result, 'hjjfdjf');
    //   const { source, destination, draggableId } = result;
    //   // dropped outside the list
    //   if (!destination) {
    //     return;
    //   }
    //   if (
    //     source.droppableId === destination.droppableId &&
    //     destination.index === source.index
    //   ) {
    //     return
    //   }
    //   const start = lists[source.droppableId]
    //   const finish = lists[destination.droppableId]
    //     const result = move(
    //       this.getList(source.droppableId),
    //       this.getList(destination.droppableId),
    //       source,
    //       destination
    //     );
    //     this.setState({
    //       items: result.droppable,
    //       selected: result.droppable2,
    //     });
    //   }
  };

  return (
    <>
      {/* <DragDropContext
        onDragEnd={({ destination, source }) => {
          // // dropped outside the list
          if (!destination) {
            return;
          }

          setLists(reorderRows(rows, source, destination));
        }}
      > */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="direct">
          {lists &&
            lists.length > 0 &&
            lists.map((list, idx) => <List heading={list} idx={idx} />)}
        </div>
      </DragDropContext>

      <div>
        {addList ? (
          <span className="list" onClick={handelAddList}>
            + Add Another List
          </span>
        ) : (
          <div className="newlist">
            <input
              className="titletext"
              placeholder="Enter list title"
              onChange={handelHeading}
              value={heading}
              autoFocus
              //onKeyDown={validation}
            />
            <br />
            <button className="buttons" onClick={onClickAddList}>
              Add List
            </button>
            <button className="cross" onClick={handelAddList}>
              X
            </button>
          </div>
        )}
      </div>
      {/* </DragDropContext> */}
    </>
  );
};

export default Lists;
