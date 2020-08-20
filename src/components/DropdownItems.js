import React from "react";
import 'bootswatch/dist/minty/bootstrap.min.css';
import "../App.css";
import Dropdown from "react-bootstrap/Dropdown";

export default function DropdownItems(props){
    return(
    props.grids.map((grid, index) => <Dropdown.Item onClick={props.function(index)} id={"Grid-"+index}>{"Map " + (index + 1)}</Dropdown.Item>)

        
    )
}