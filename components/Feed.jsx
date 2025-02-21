"use client"

import { useEffect, useState } from "react"
import PromptCard from '@/components/PromptCard'
import { useSession } from "next-auth/react";

// this component will handle the prompts displayed depending on whether the user has searched anything or not
const PromptCardList = ({ data, handleTagClick }) => {
  if (!Array.isArray(data)) {
    console.error("PromptCardList: data is not an array:", data);
    return null;
  }
  console.log(Array.isArray(data))
  return (
    <div className="mt-15 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  // use a state variable to store all posts
  const [allPosts, setAllPosts] = useState([])

  // search states for search bar
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])

  // ensure session is loaded before fetching all posts
  const { status } = useSession()

  // get all posts
  const fetchAllPosts = async () => {
    try {
      const response = await fetch('/api/prompt')

      // check if the response was successful
      if (!response ){
        throw new Error('Something went wrong, failed to retrieve all posts.')
      }

      // data will return as a json string, need to turn into array
      const postsArray = await response.json()
      console.log("posts retrieved:", postsArray)

      setAllPosts(postsArray)
    } catch (error) {
      console.error('Failed to retrieve all posts: ', error)
    }
  }
  

  // we want to get all posts on initial render of homepage
  useEffect(() => {
    // fetch all posts regardless of session
    fetchAllPosts()
  }, [status])

  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, 'i') // make case insensitive search
    // filter from allPosts
    return allPosts.filter(
      (item) => 
        regex.test(item.creator.username) ||
        regex.test(item.prompt) || 
        regex.test(item.tag)  
    )
  }

  const handleSearchChange = (e) => {
    // reset the current search timeout and update search text
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    // debounce method (reduce api calls and improving performance in search results)
    // will successively retrive results every 0.5 seconds
    setSearchTimeout(
      setTimeout(() => {
        // filter the results
        const results = filterPosts(searchText);
        console.log('results from searching:', results)
        setSearchedResults(results)
      }, 500)
    )
  }

  // this function will be passed into PromptCard
  const handleTagClick = (tagName) => {
    setSearchText(tagName) // this will update the searchText on the next render
    const results = filterPosts(tagName) // Need to use the tagName passed to get the updated value for now
    setSearchedResults(results)
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

      {/* display searched results here */}
      {searchText ? (
        searchedResults.length > 0 ? (
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <p className="orange_gradient mt-10">No posts found.</p> 
        )
      ) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed

