import React from "react";
import "bootstrap/dist/css/bootstrap.css"
// eslint-disable-next-line no-unused-vars
import {Container, Navbar, Row} from "react-bootstrap";
import LeftSection from "./section/left_section";
import RightSection from "./section/right_section";
import {DragDropContext} from "react-beautiful-dnd";
import {AddSingleFile,RemoveSingleFile} from "./redux/carousel/carousel.actions";
import {connect} from "react-redux";
function App({addFile,removeFile}) {
  function onDragEnd(result) {
    const {source, destination} = result;
    // dropped outside the list
    if (!destination) {
      return
    }
    else if (source.droppableId !== destination.droppableId) {
      if(source.droppableId==="CAROUSEL" && destination.droppableId==="FILES")
      {
          removeFile(result.draggableId);
      }else if(source.droppableId==="FILES" && destination.droppableId==="CAROUSEL"){
        addFile(result.draggableId)
      }
    }
  }
  return (
      <>
      <Navbar bg="light" expand="lg">
        <Container className="">
          <Navbar.Collapse className="justify-content-center h4">
            <Navbar.Text>
              Carousel
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <Row>
          <DragDropContext onDragEnd={onDragEnd}>
          <LeftSection />
          <RightSection/>
          </DragDropContext>
        </Row>
      </>
  );
}
const mapDispatchToProps=dispatch=>({
  addFile:(file)=>dispatch(AddSingleFile(file)),
  removeFile:(file)=>dispatch(RemoveSingleFile(file))
});


export default connect(null,mapDispatchToProps)(App);
