"use client";

import { useEffect, useState } from 'react'
import SearchBar from '@/components/mediaSearch/SearchBar'
import Card from '@/components/mediaSearch/MediaCards'
import axios from 'axios'

export default function Media() {
  const [mediaList, setMediaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useState(null);
  const [sortBy, setSortBy] = useState('Default');

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
  
  useEffect(() => {
    if (mediaList.length > 0) {
      const sortedResults = [...mediaList].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
      setMediaList(sortedResults);
    }
  }, [sortBy]);

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
          <div className='flex space-x-2 items-center mt-4'>
            <p className="text-lg font-medium">Sort by:</p>
            <select aria-label="sorting options" value={sortBy} onChange={(e) => setSortBy(e.target.value)}className="w-[180px] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-black">
              <option value="mediaID">Default</option>
              <option value="mediaName">Title</option>
              <option value="creator">Creator</option>
              <option value="publisher">Publisher</option>
              <option value="year">Year</option>
            </select>
          </div>
          <Card mediaList={mediaList}/>
        </div>
      )}
    </main>
  )
}

