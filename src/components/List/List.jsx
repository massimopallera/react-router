export default function List({post, index, uri, handleDelete, returnNewPosts, imgSrc}) {
  
  function handleDelete(slug) {
    
    const url = `${uri}/${slug}`
    
    fetch(url, {
      method: 'DELETE',
    })
      .then(resp => resp.json())
    .then(data => returnNewPosts(data.data))

  }

  
  return (
    <div key={index} className="col align-self-stretch">
      <div className="card h-100 bg-dark text-white" >
  
        <div className="card-header text-center ">
          <h3>{post.title}</h3>
        </div>
  
        <div className="card-body d-flex gap-3">

            <img src={imgSrc + post.image} alt="" className=""/>
          <p>{post.content}</p>
          <button type="button" className="btn btn-danger align-self-end" onClick={() => handleDelete(post.slug)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      
      </div>
    </div>
  )
}