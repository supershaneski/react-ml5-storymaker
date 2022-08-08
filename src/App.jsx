import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './routes/Home'
import Edit from './routes/Edit'
import Story from './routes/Story'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
