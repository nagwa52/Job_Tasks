import { Route, Routes } from 'react-router-dom'
import ListCountries from '../pages/universities/list_countries'
import ListUniversities from '../pages/universities/list_universities'
import ListAllUniversities from '../pages/universities/AllUniversities'
import CreateUniversity from '../pages/universities/create_university'
import DeleteUniversity from '../pages/universities/delete_university'
const UserRoutes = () => {
  return (
    <Routes>

      <Route path="/countries" element={<ListCountries />} />
      <Route path="/all/universities" element={<ListAllUniversities />} />
      <Route path="/universities" element={<ListUniversities />} />
      <Route path="/university/delete/:id" element={<DeleteUniversity />} />
      <Route path="/university/add" element={<CreateUniversity />} />

    
    </Routes>
  )
}
export default UserRoutes
