'use client'
import React,{useContext, useEffect, useState} from 'react'
import BookContext from '@/context/BookContext';
import {useRouter} from 'next/navigation';

const page = () => {

  const router=useRouter();

  const [search,setSearch]=useState('');
  const [result,setResult]= useState([]);

  const {booklist,setBookList}=useContext(BookContext);

  const fetchApi=(value)=>{
    fetch(`https://openlibrary.org/search.json?title=${value}&limit=10&page=1`)
    .then(response => response.json())
    .then(data=>setResult(data.docs))
    .catch(err =>console.log(err));
  }

  const handleChange=(e)=>{
    // setSearch(e.target.value);
    fetchApi(e.target.value);
  }

  const addTOShelf=(newitem)=>{
    setBookList([...booklist,newitem]);
  };

  useEffect(()=>{
    localStorage.setItem('bookShelf',JSON.stringify(booklist));
  },[booklist]);


  return (
    <div className='flex flex-col w-[100vw] relative'>
        <div className='flex justify-center my-[10vh]'>
           <input type="text" placeholder='Search Book' name='search'  onChange={handleChange} className='border-2 rounded-md py-[3vh] px-[3vw] text-center' autoComplete='Off'/>
        </div>
        <div className='flex justify-center my-[10vh]'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {result && result.map(item=>{
              return(
                <div className='flex flex-col border-2 justify-evenly border-black rounded-md m-[10%] p-[5%]'>
                  <div className='text-lg'>
                    <h1> <span className='font-semibold'>Book Name: </span> {item.title}</h1>
                    <h1> <span className='font-semibold'>Author Name: </span> {item.author_name && item.author_name[0]}</h1>
                    <h1> <span className='font-semibold'>Publish Year: </span> {item.first_publish_year}</h1>
                  </div>
                  <button className='rounded-lg mt-[5%] py-2 px-5 bottom-[1%] text-white bg-orange-700 hover:bg-orange-950' onClick={()=>addTOShelf({name:item.title,author:item.author_name[0],year:item.first_publish_year})}>Add To Shelf</button>
                </div>
              )
            })}
          </div>
        </div>
        <div className='absolute top-2 right-2'>
          <button className='rounded-lg bg-orange-700 py-[2vh] px-[2vw] text-white font-semibold' onClick={() => router.push('/bookshelf')}>My BookShelf</button>
        </div>
    </div>
  )
}

export default page