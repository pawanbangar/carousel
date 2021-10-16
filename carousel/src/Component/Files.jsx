import React, {useState} from 'react';
import {Container, ListGroup} from 'react-bootstrap'
import {connect} from 'react-redux';
import {selectFilesData} from "../redux/file/file.selectors";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {v4 as uuidv4} from 'uuid';
// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
const grid = 1;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});


const Files = ({files}) => {
    const [fileData, setFiles] = useState(files);
    return (
        <Container className="mt-3">
            <h5>Files</h5>
                <Droppable droppableId={"FILES"} key={"FILES"}>
                    {(provided, snapshot) => {
                        return ( <ListGroup className="mt-2" style={{maxHeight: "425px", minHeight: "425px", overflow: "scroll"}}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {fileData.map((item, index) => {
                                    return (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => {
                                                return (<div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-around"
                                                            }}
                                                        >
                                                            {item.id + ".png"}
                                                        </div>
                                                    </div>
                                                )
                                            }}
                                        </Draggable>
                                    )
                                })
                                }
                                {provided.placeholder}
                            </ListGroup>
                        )
                    }}
                </Droppable>
        </Container>
    );
};
const mapStateToProps = state => ({
    files: selectFilesData(state)
});
export default connect(mapStateToProps)(Files);
