import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Items from './components/Items'
import Popular from './components/Popular'
import RecipeInfo from './components/RecipeInfo'
import ItemInfo from './components/ItemInfo'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/items' element={<Items />}></Route>
        <Route path='/popular' element={<Popular />}></Route>
        <Route path="/:MealId" element={<RecipeInfo />}></Route>
        <Route path='/:idcategory' element={<ItemInfo />}></Route>
      </Routes>
    </>
  )
}

export default App;
