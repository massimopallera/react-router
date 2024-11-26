import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"

export default function SinglePost({uri, resourcePath}) {
  const params = useParams()
  const [post, setPost] = useState({image: ''})
  const [next, setNext] = useState(null)
  const [prev, setPrev] = useState(null)

  function fetchPost(slug = params.slug) {
    fetch(`${uri}/${slug}`)
     .then(response => response.json())
      .then(data => {
        // console.log(data);
        
        setNext(data?.next)
        setPrev(data?.prev)
        setPost(data.data)
      })
     .catch(err => console.error(err))
  }
  
  const navigate = useNavigate()

  useEffect(() => {
    fetchPost()
  },[])

  // console.log(`${uri}/${next}`)

  // console.log(`${uri}/${prev}`)


   return(
     <>
        <div className="container">
         <div className="card p-4 bg-dark text-white">
           <div className="card-title d-flex justify-content-center">

              <h2 className="">{post?.title}</h2>
           </div>

            <div className="card-body d-flex flex-column align-items-center gap-3">
             <img src={resourcePath+post?.image} className="" alt="..." />
              <p className="card-text">{post?.content}</p>
            </div>
         </div>
         
         <div className="position-relative w-100 p-4">
           {prev != undefined ? (
             
             <Link className="btn btn-info text-dark left" to={"/posts/" + prev} onClick={() => fetchPost(prev) }>
              <i className="bi bi-arrow-left"></i>             
              <span className="ml_3">Post Precedente</span>
           </Link>
          ) : null
           }
           

           {next != undefined ? (
             
             <Link className="btn btn-info text-dark right" to={"/posts/" + next} onClick={() => fetchPost(next)}>
               <span className="ml_3">Post Successivo</span>
               <i className="bi bi-arrow-right"></i>
             </Link>
           ) : null}

          </div>

        </div>
      </>
  )
}