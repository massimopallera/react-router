import { useEffect, useState } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom"

export default function SinglePost({uri, resourcePath}) {
  const params = useParams()
  const [post, setPost] = useState(null)
  const [next, setNext] = useState(null)
  const [prev, setPrev] = useState(null)

  function fetchPost(slug = params.slug) {
    fetch(`${uri}/${slug}`)
     .then(response => response.json())
      .then(data => {
        // console.log(data);
        
        setNext(data?.next)
        console.log(`${uri}/${next}`)
        setPrev(data?.prev)
        console.log(`${uri}/${prev}`)
        setPost(data.data)
      })
     .catch(err => console.error(err))
  }
  
  const navigate = useNavigate()

  useEffect(() => {
    fetchPost()
  },[])

   return(
     <>
        <div className="container">
         <div className="card p-4 bg-dark text-white">
           <div className="card-title d-flex justify-content-center">

              <h2 className="">{post?.title}</h2>
           </div>

            <div className="card-body d-flex flex-column gap-3">
             <img src={resourcePath+post?.image} className="margin-auto" alt="..." />
              <p className="card-text">{post?.content}</p>
            </div>
         </div>
         
         <div className="d-flex justify-content-between p-3">
           <button onClick={() => redirect(`${uri}/${prev}`)} className="btn btn-info">
             <i className="bi bi-arrow-left"></i>
             
             <span className="ml_3">Post Precedente</span>
           </button>
           <button  onClick={() => redirect(`${uri}/${next}`)} className="btn btn-info">
             
             <span className="ml_3">Post Successivo</span>
             <i className="bi bi-arrow-right"></i>
           </button>
          </div>

        </div>
      </>
  )
}