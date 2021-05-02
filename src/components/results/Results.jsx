import React, {useState} from 'react'
import {Pagination} from 'react-bootstrap'

const Paginator = (props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const previous = pageNumber===1 ? <Pagination.Item key={"Anterior"} disabled></Pagination.Item>:<Pagination.Item key={"Anterior"}></Pagination.Item>;
    return (
        <>
        <Pagination>
            {previous}
            <Pagination.Item key={pageNumber}></Pagination.Item>
            <Pagination.Item key={"Siguiente"}> </Pagination.Item>
        </Pagination>
        </>
    );
};

const Results = () => {
    return (
        <>
        
        <Paginator />
        </>
    );
}

export default Results;