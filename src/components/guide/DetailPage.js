import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
    const { id } = useParams();
    useEffect(()=>{
        fetch(`http://localhost:8080/guide/getGuide/${id}`)
    },[])
    return(
        <div>

        </div>
    )
}

export default DetailPage;