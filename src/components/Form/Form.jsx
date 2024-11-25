import { useState, useEffect } from "react";

const initialFormData = {
    title: '',
    content: '',
    image: '',
    category: '',
    tags: [],
    published: false
}  
  
export default function Form({
  // INPUT
  handleOverlay,
  uri,

  // OUTPUT
  returnNewPosts}) {

  
  const [tagsList, setTagsList] = useState([])
  const [categoriesList, setCategoriesList] = useState([])
  const [formData, setFormData] = useState(initialFormData);


  // to handle form submit
  function handleSubmit(e, uri) { 
    e.preventDefault()      
    
    const url = `${uri}posts`

    // const url = "http://localhost:3000/posts"
    const slug = formData.title.trim().toLowerCase()
    
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        slug
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(resp => resp.json())
      .then(data => returnNewPosts(data.posts))
    
    setFormData(initialFormData)

  }

  //to handle all Form Data
  function handleFormData(e) {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    // console.log(value)
    setFormData(
        {
          ...formData,
          [e.target.name]: value
        }
      )    
  }

  //to handle just tags checkboxes
  function handleFormTags(e) {
    const isChecked = e.target.checked
    const value = e.target.value

    if (!formData.tags.includes(value) && isChecked) {
      setFormData({
        ...formData,
        tags:[...formData.tags, value]
      })
    } else if (formData.tags.includes(value) && !isChecked) {
      const newTags = formData.tags.filter(tag => tag != value)
      setFormData({
        ...formData,
        tags: newTags
      })
    }
    // console.log(formTags);
    
  }


  //ajax call function for tags and categories
  function fetchSet(uri, set, slug) {
    const url = `${uri}${slug}`
    console.log(url);
    

    fetch(url)
      .then(resp => resp.json())
      .then(data => set(data[slug]))
  }

  //get tags
  useEffect(() => fetchSet(uri, setTagsList, 'tags'),[])
  
  //get categories
  useEffect(() => fetchSet(uri, setCategoriesList, 'categories'), [])
    


  return (
    <form
      className="form-control bg-dark text-white py-3 px-5"
      onSubmit={(e) => handleSubmit(e, uri)} id="offCanvas" >

      {/* TITLE INPUT */}
      <label htmlFor="title">Inserisci titolo del post</label>
      <input type='text'
        title="Titolo"
        placeholder="Inserisci il titolo"
        id='newFormData-title'
        name="title"
        value={formData.title}
        onChange={handleFormData}
      />

      {/* CONTENT INPUT */}
      <label htmlFor="content">Inserisci descrizione del post</label>
      <input type='text'
        title="Contenuto"
        placeholder="Inserisci descrizione"
        id='newFormData-content'
        value={formData.content}
        onChange={handleFormData}
        name="content"
      />

      {/* IMAGE PATH INPUT */}
      <label htmlFor="image">Inserisci percorso immagine</label>
      <input type='text'
        title="Immagine"
        placeholder="Inserisci Percorso dell'immagine"
        id='newFormData-content'
        value={formData.image}
        onChange={handleFormData}
        name="image"
      />

      {/* CATEGORY SELECT */}
      <select name="category" id="category" value={formData.category} onChange={handleFormData}>
        {categoriesList.map((cat, index) =>
          <option key={index} value={cat}>{cat}</option>
        )}
      </select>


      {/* TAGS CHECKBOXS */}
      <div className="tags">
        {tagsList.map((tag,index) => 
          <div className="form-check" key={index} >
            <input
              type="checkbox"
              id={tag}
              name={tag}
              value={tag}
              onChange={handleFormTags}
            />

            <label htmlFor={tag}>{tag}</label>
          </div>
        )}
      </div>

      <div className="state">
        <input type="checkbox" name="published" id="" onChange={handleFormData}/>
        <label htmlFor="public">Pubblica</label>
      </div>

      <div className='d-flex justify-content-center gap-5 my-4'>
        <button className="btn btn-primary" type="submit">Aggiungi nuovo articolo</button>

        <button
          type="button"
          className='btn btn-light'
          popovertarget="offCanvas"
          onClick={handleOverlay} 
          popoveraction="hide"
        >
          Chiudi
        </button>
      </div>

    </form>
  )
}