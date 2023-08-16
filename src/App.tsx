import { RouterProvider, createBrowserRouter, Routes, Route } from 'react-router-dom'
import AdminLayout from './components/LayoutAdmin/AdminLayout'
import AdminProduct from './page/admin/product'
import AdminProductAdd from './page/admin/product/add'
import AdminProductEdit from './page/admin/product/edit'


function App() {
  return (
    <div>
      <Routes>
        <Route path='admin' element={<AdminLayout />}>
          <Route index element={<AdminProduct />} />
          <Route path='product/add' element={<AdminProductAdd />} />
          <Route path='product/:idProduct/edit' element={<AdminProductEdit />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
