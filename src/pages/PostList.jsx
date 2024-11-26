import { useState,useEffect } from 'react'

import List from '../components/List/List'
import FormComponent from '../components/Form/Form'




export default function PostList({uri, resourcePath}) {


  const [posts, setPosts] = useState([])

  // AJAX call
  function fetchData(url = "http://localhost:3000/posts") {
    fetch(url)
      .then(response => response.json())
      .then(data => setPosts(data.data))
      .catch(err => console.error(err))
  }

  function handleOverlay() { 
    document.querySelector('.overlay').classList.toggle('active')
  }

  useEffect(() => fetchData(uri),[])

  return (
    <>
      <div className="container">

        <div className='buttonContainer'>
          <button className='btn btn-light classeMia' popovertarget="offCanvas" onClick={handleOverlay} >Aggiungi Post</button>
        </div>

        <div className="overlay">
          {/* FORM */}
          <FormComponent uri={resourcePath} handleOverlay={handleOverlay} returnNewPosts={(newPosts) => setPosts(newPosts)} ></FormComponent>
        </div>

        <div className="row row-cols-1 d-flex align-items-stretch g-5 my-3">
          {posts.map((post, index) => <List post={post} index={index} key={index} uri={uri} imgSrc={resourcePath} returnNewPosts={(newPosts) => setPosts(newPosts)}></List>)}
        </div>
          
      </div>
    </>
  )
}