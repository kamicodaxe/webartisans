import type { NextPage } from 'next'
import api from '../../api'

import Layout from '../../components/Layout'
import Products from '../../components/Products'
import IProduct from '../../models/IProduct'

interface Props {
  products: IProduct[]
}

const Store: NextPage<Props> = ({ products }) => {

  return (
    <Layout>
      <Products hideTitle products={products} />
    </Layout >
  )
}

export async function getStaticProps() {
  let products: IProduct[] = []
  const productsSnapshot = await api.products.getBestProductsForCategory(20)
  products = productsSnapshot.docs.map($ => ({
    ...$.data(),
    id: $.id,
    createdAt: $.data().createdAt.toMillis(),
    updatedAt: $.data().updatedAt.toMillis(),
  } as unknown as IProduct))

  return {
    props: {
      products,
      revalidate: 0
    }
  }
}

export default Store