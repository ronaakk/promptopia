"use client"
import { useEffect, useState } from "react"


async function Feed() {
  // use a state variable to store all posts
  const [allPosts, setAllPosts] = useState([])

  // search states for search bar
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])

  // get all posts using api
  const fetchAllPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()
    setAllPosts(data)
  }

  // we want to get all posts on intial render of homepage
  useEffect(() => {
    fetchAllPosts()
  }, [])

  // debounce method (reduce api calls and improving performance in search results)
  // will wait for user to stop typing
  const handleSearchChange = (e) => {

    // reset the current search timeout
    setSearchTimeout(0)


  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"

        />
      </form>


    
    </section>
  )
}

export default Feed

