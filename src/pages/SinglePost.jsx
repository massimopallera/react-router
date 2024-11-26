import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function SinglePost({uri, resourcePath}) {
  const params = useParams()
  const [post, setPost] = useState(null)

  function fetchPost() {
    fetch(`${uri}/${params.slug}`)
     .then(response => response.json())
     .then(data => setPost(data.data))
     .catch(err => console.error(err))
  }


  console.log(post);
  
  useEffect(() => {
    fetchPost()
  },[])

   return(
    <>
       <div className="card">
         <img src={resourcePath+post?.image} className="card-img-top" alt="..." />
         <div className="card-body">
           <h5 className="card-title">{post?.title}</h5>
           <p className="card-text">{post?.content}</p>
         </div>
      </div>
    </>
  )
}