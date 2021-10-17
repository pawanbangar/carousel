import React from 'react';
import {Col, Image, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {selectCarouselData} from "../redux/carousel/carousel.selectors";
import {Draggable, Droppable} from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';

const LowerCarousel = ({carousels}) => {
    return (
        <div>
                <Droppable droppableId={"CAROUSEL"} key="CAROUSEL">
                    {(provided, snapshot) => {
                        return (<Row className="mx-1 my-2 flex-nowrap overflow-scroll" style={{maxWidth: "1000px"}}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {carousels.map((item, index) => {
                                return (<Col lg={2}  key={uuidv4()} index={index}><Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => {
                                            return (<div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                    <Image rounded fluid src={item.urls.raw}/>

                                            </div>)
                                        }}
                                    </Draggable>
                                    </Col>
                                )
                            })
                            }
                            {provided.placeholder}
                        </Row>)
                    }}
                </Droppable>
        </div>
    );
};
const mapStateToProps = state => ({
    carousels: selectCarouselData(state)
});
export default connect(mapStateToProps)(LowerCarousel);