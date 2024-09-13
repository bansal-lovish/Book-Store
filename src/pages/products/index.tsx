import NavBar from '@/components/navbar'
import withAuth from '@/utils/WithAuth'
import ProductsViewList from '@/views/products/view/ProductsViewList'



const Products = () => {

  return (
    <NavBar>
<ProductsViewList/>
  </NavBar>
  )
}

export default withAuth(Products)