'use client'
import React,{useContext, useEffect, useState} from 'react'
import BookContext from '@/context/BookContext';
import { useRouter } from 'next/navigation';

const MyBookShelf = () => {

    const router=useRouter();

    const {booklist,setBookList}=useContext(BookContext);

    useEffect(()=>{
        let books=JSON.parse(localStorage.getItem('bookShelf'));
        if(books){
            setBookList(books);
        }
    },[]);

  return (
    <div className='flex flex-col w-[100vw] relative'>
        <div className='flex w-full justify-center text-2xl font-semibold my-[5vh]'>
            <h1>My Book Shelf</h1>
        </div>
        <div className=' m-[5vh]'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {booklist && booklist.map(item=>{
              return(
                <div className='flex flex-col w-[20vw] gap-3 border-2 text-lg border-black rounded-md m-[5%] p-[5%]'>
                    <h1> <span className='font-semibold'>Book Name: </span> {item.name}</h1>
                    <h1> <span className='font-semibold'>Author Name: </span> {item.author}</h1>
                    <h1> <span className='font-semibold'>Publish Year: </span> {item.year}</h1>
                </div>
              )
            })}
          </div>
        </div>
        <div className='absolute top-2 right-2'>
          <button className='rounded-lg bg-orange-700 py-[2vh] px-[2vw] text-white font-semibold' onClick={() => router.push('/')}>Main Page</button>
        </div>
    </div>
  )
}

export default MyBookShelf