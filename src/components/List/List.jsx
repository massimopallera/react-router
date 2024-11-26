import { useNavigate } from "react-router-dom"
import SinglePost from "../../pages/SinglePost"

export default function List({ post, index, uri, handleDelete, returnNewPosts, resourcePath }) {
  
  function handleDelete(slug) {
    
    const url = `${uri}/${slug}`
    
    fetch(url, {
      method: 'DELETE',
    })
      .then(resp => resp.json())
      .then(data => returnNewPosts(data.data))
  }

  // console.log(uri, resourcePath);
  const navigate = useNavigate()
  
  
  return (
    <div key={index} className="col align-self-stretch">
      <div className="card h-100 bg-dark text-white" >
  
        <div className="card-header text-center ">
          <h3>{post.title}</h3>
        </div>
  
        <div className="card-body d-flex gap-3 flex-sm-wrap flex-xl-nowrap">
          <img src={resourcePath + post.image} alt="" className="rounded"/>
          <p>{post.content}</p>
          <div className="d-flex align-items-end w-100 justify-content-end gap-3">

          <button className="btn btn-info" onClick={() => navigate(post.slug)}>
            <i className="bi bi-book"></i>
          </button>
          <button type="button" className="btn btn-danger" onClick={() => handleDelete(post.slug)}>
            <i className="bi bi-trash"></i>
          </button>
          </div>
        </div>
      
      </div>
    </div>
  )
}