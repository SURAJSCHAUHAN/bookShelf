'use client'
import React, { useState } from "react";
import BookContext from "./BookContext";

const BookContextProvider=({children})=>{
    const [booklist,setBookList]=useState([]);
    return(
        <BookContext.Provider value={{booklist,setBookList}}>
            {children}
        </BookContext.Provider>
    )
}

export default BookContextProvider;