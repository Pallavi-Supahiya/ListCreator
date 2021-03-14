import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import List from './List'

import './Lists.scss'
import './Button.scss'
const Lists = () => {
  const [addList, setAddList] = useState(true)
  const [heading, setHeading] = useState('')
  const [lists, setLists] = useState([])
  const [listsData, setListsData] = useState({})
  useEffect(() => {
    let tempLists = JSON.parse(localStorage.getItem('ListsName'))
    console.log(tempLists)
    if (tempLists) setLists(tempLists)
  }, [])
  const handelAddList = (e) => {
    setAddList((prevState) => !prevState)
    console.log(e.target)
  }
  const handelHeading = (e) => {
    setHeading(e.target.value)
  }
  const onClickAddList = (e) => {
    if (heading.length < 3) return alert('Min 4 Char required..!')
    if (lists.includes(heading)) return alert('List Name Already Exists')
    let tempList = [...lists]
    tempList.push(heading)
    setHeading('')
    setLists(tempList)
    localStorage.setItem('ListsName', JSON.stringify(tempList))
  }

  const saveListData = (data, heading) => {
    listsData[heading] = data
    setListsData({ ...listsData })
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = [...source]
    const destClone = [...destination]
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone
    console.log('sourceClone', sourceClone)
    console.log('destClone', destClone)
    return result
  }

  const getList = (id) => listsData[id]

  const onDragEnd = (result) => {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        listsData[source.droppableId],
        source.index,
        destination.index
      )
      listsData[source.droppableId] = items
      setListsData({ ...listsData })
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      )
      console.log('resultresult', result)
      listsData[source.droppableId] = result[source.droppableId]
      listsData[destination.droppableId] = result[destination.droppableId]
      setListsData({ ...listsData })
    }
  }
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="direct">
          {lists &&
            lists.length > 0 &&
            lists.map((list, idx) => (
              <List
                heading={list}
                idx={idx}
                saveListData={saveListData}
                listData={listsData[list]}
              />
            ))}
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
  )
}

export default Lists
