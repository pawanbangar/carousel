import React from "react";
import "bootstrap/dist/css/bootstrap.css"
import {Container,Navbar,Row} from "react-bootstrap";
import LeftSection from "./section/left_section";
import RightSection from "./section/right_section";
function App() {
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
          <LeftSection/>
          <RightSection/>
        </Row>
      </>
  );
}

export default App;
