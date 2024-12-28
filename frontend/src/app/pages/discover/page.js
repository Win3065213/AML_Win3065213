"use client";

import { useEffect, useState } from 'react'
import SearchBar from '@/components/mediaSearch/SearchBar'
import Card from '@/components/mediaSearch/MediaCards'
import axios from 'axios'

export default function Home() {
  const [mediaList, setMediaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useState(null);

  // const mockMediaData = [
  //   { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", type: "book", year: 1960, isbn: "9780446310789", publisher: "J. B. Lippincott & Co." },
  //   { id: 2, title: "1984", author: "George Orwell", type: "book", year: 1949, isbn: "9780451524935", publisher: "Secker & Warburg" },
  //   { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", type: "book", year: 1925, isbn: "9780743273565", publisher: "Charles Scribner's Sons" },
  //   { id: 4, title: "Pride and Prejudice", author: "Jane Austen", type: "book", year: 1813, isbn: "9780141439518", publisher: "T. Egerton, Whitehall" },
  //   { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", type: "book", year: 1951, isbn: "9780316769174", publisher: "Little, Brown and Company" },
  //   { id: 6, title: "National Geographic", author: "Various", type: "periodical", year: 2023, isbn: "", publisher: "National Geographic Partners" },
  //   { id: 7, title: "Scientific American", author: "Various", type: "periodical", year: 2023, isbn: "", publisher: "Springer Nature" },
  //   { id: 8, title: "The Lord of the Rings", author: "J.R.R. Tolkien", type: "audiobook", year: 1954, isbn: "9780618640157", publisher: "George Allen & Unwin" },
  //   { id: 9, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", type: "ebook", year: 1997, isbn: "9780747532699", publisher: "Bloomsbury" },
  //   { id: 10, title: "The Hobbit", author: "J.R.R. Tolkien", type: "book", year: 1937, isbn: "9780547928227", publisher: "George Allen & Unwin" },
  // ];
  
  const startURL = "http://localhost:8000/media/all"
  const searchURL = "http://localhost:8000/media/search"
  const handleSearch = (params) => {
    // console.log("Input search data: ", searchParams);
    // useEffect( async () => {
    //   const response = await axios.post(searchURL, searchParams);
    //   const data = response.data
    //   setMediaList(data);
    // },[mediaList])
    setSearchParams(params);
    // console.log("Set param", searchParams)
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (searchParams) {
        // console.log(searchParams)
        try {
          const response = await axios.post(searchURL, searchParams);
          setMediaList(response.data);
        } catch (error) {
          console.error("Error fetching media data", error);
        }
      } else {
        try {
          const response = await axios.get(startURL);
          setMediaList(response.data);
        } catch (error) {
          console.error("Error fetching media data", error);
        }
      }
    }
    fetchData();
    setIsLoading(false);
  }, [searchParams]);
  
  // console.log("send data: ", mediaList)
  
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Media Search</h1>
      <SearchBar onSearch={handleSearch} />
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64 text-2xl font-bold">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
            <Card mediaList={mediaList}/>
        </div>
      )}
    </main>
  )
}

