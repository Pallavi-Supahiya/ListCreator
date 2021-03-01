import React, { useState } from 'react';
import List from './List';
import './Lists.scss';
import './Button.scss';
const Lists = () => {
  const [addList, setAddList] = useState(true);
  const [heading, setHeading] = useState('');
  const [lists, setLists] = useState([]);
  const handelAddList = (e) => {
    setAddList((prevState) => !prevState);
    console.log(e.target);
  };
  const handelHeading = (e) => {
    setHeading(e.target.value);
  };
  const onClickAddList = () => {
    let tempList = [...lists];
    tempList.push(heading);
    setHeading('');
    setLists(tempList);
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
  return (
    <>
      <div onDrop={onDropIt} onDragOver={allowDrop}>
        {lists &&
          lists.length > 0 &&
          lists.map((list) => <List heading={list} />)}
      </div>
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
    </>
  );
};

export default Lists;
