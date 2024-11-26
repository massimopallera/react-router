import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// In index.js o App.js
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

import PostList from './pages/PostList'
import Home from './pages/Home'
import ChiSiamo from './pages/ChiSiamo'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DefaultLayout from './components/DefaultLayout'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='/' element={<Home />}/>
          <Route path='/posts' element={<PostList />}/>
          <Route path='/chi-siamo' element={<ChiSiamo />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App