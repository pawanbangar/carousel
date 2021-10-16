import React from 'react';
import {Container, ListGroup} from 'react-bootstrap'
import {connect} from 'react-redux';
import { selectFilesData} from "../redux/file/file.selectors";
const Files = ({files}) => {
    return (
        <Container className="mt-3">
            <h5>Files</h5>
            <ListGroup className="mt-2" style={{maxHeight:"425px",minHeight:"425px",overflow:"scroll"}}>
                {
                    files.map(single=>
                        <ListGroup.Item variant="light" key={single.id}>{single.id+".png"}</ListGroup.Item>
                    )
                }
            </ListGroup>
        </Container>
    );
};
const mapStateToProps=state=>({
    files:selectFilesData(state)
});
export default connect(mapStateToProps)(Files);
