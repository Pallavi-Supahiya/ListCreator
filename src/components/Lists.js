import React, { useEffect, useState } from 'react';
import List from './List';
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

  return (
    <>
      <div onDrop={onDropIt} onDragOver={allowDrop}>
        <div className="direct">
          {lists &&
            lists.length > 0 &&
            lists.map((list) => <List heading={list} />)}
        </div>
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
    </>
  );
};

export default Lists;
