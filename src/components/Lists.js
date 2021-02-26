import React, { useState } from 'react';
import List from './List';
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
  return (
    <>
      <div>
        {lists &&
          lists.length > 0 &&
          lists.map((list) => <List heading={list} />)}
      </div>
      <div>
        {addList ? (
          <span onClick={handelAddList}>+ Add Another List</span>
        ) : (
          <>
            <input
              placeholder="Add a list"
              onChange={handelHeading}
              value={heading}
              autoFocus
            />
            <button onClick={onClickAddList}>Add List</button>
            <button onClick={handelAddList}>X</button>
          </>
        )}
      </div>
    </>
  );
};

export default Lists;
