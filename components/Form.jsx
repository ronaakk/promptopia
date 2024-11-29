"use client"

import React from 'react'
import Link from 'next/link'
function Form({ type, post, setPost, submitting, handleSubmit }) {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>
          {type} Post
        </span>
      </h1>

      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your imagination guide you to leverage any AI-powered platform!
      </p>

      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI Prompt</span>
          <textarea required value={post} onChange={(e) => setPost({ ...post, prompt: e.target.value })}>

          </textarea>
        </label>


        <button>Post</button>

      </form>
        

    </section>
  )
}

export default Form