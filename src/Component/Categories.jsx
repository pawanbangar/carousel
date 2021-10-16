import React,{useEffect} from 'react';
import {Container, Form} from "react-bootstrap";
import {fetchCategoriesStart} from "../redux/category/category.actions";
import {fetchFilesStart} from "../redux/file/file.actions";
import {connect} from 'react-redux';
import {selectOnlyCategories} from "../redux/category/category.selectors";
const Categories = ({fetchCategoriesStart,categories,fetchFiles}) => {
    useEffect(()=>{
        fetchCategoriesStart();
    },[fetchCategoriesStart])
    const changedCategory=(event)=>{
        fetchFiles(event.target.value);
    }

    return (
        <Container>
            <h5>Categories</h5>
            <Form.Select aria-label="Default select" onChange={changedCategory}>
                {
                    categories.map((category)=><option key={category} value={category}>{category}</option>)
                }
            </Form.Select>
        </Container>
    );
};
const mapDispatchToProps=dispatch=>({
    fetchCategoriesStart:()=>dispatch(fetchCategoriesStart()),
    fetchFiles:(category)=>dispatch(fetchFilesStart(category))
})

const mapStateToProps=state=>({
    categories:selectOnlyCategories(state)
});

export default connect(mapStateToProps,mapDispatchToProps)(Categories);
