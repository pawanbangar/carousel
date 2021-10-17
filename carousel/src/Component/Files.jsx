import React from 'react';
import {Container, ListGroup} from 'react-bootstrap'
import {connect} from 'react-redux';
import {selectFilesData} from "../redux/file/file.selectors";
import { Droppable, Draggable} from 'react-beautiful-dnd';

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
                                {files.map((item, index) => {
                                    return (
                                        <Draggable
                                            key={item.rand_id.toString()}
                                            draggableId={item.rand_id.toString()}
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
