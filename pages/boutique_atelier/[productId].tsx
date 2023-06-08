import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'

import { Timestamp } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import api from '../../api'
import { cartActions } from '../../features/cart/cartSlice'
import IProduct from '../../models/IProduct'


interface Props {
  item: IProduct
}

const ProductDetail = ({ item }: Props) => {
  const dispatch = useDispatch()

  function addToCart(p: IProduct) {
    return () => dispatch(cartActions.add(p))
  }

  return (
    <Layout>
      <header className='w-full md:h-[100vh] md:flex'>
        <div className="md:w-1/2 pl-4">
          <div className="w-full h-96 bg-gray-200 flex justify-center">
            <img alt={item.imageAlt} src={item.imageSrc} />
          </div>
          <h1 className='text-xs text-gray-500'>{item.owner.displayName}</h1>
          <h1 className='text-2xl text-gray-500'>{item.name.toUpperCase()}</h1>
          <button
            type='button'
            onClick={addToCart(item)}
            className='font-medium text-sm text-center w-full bg-[#663300] text-white p-4 rounded'
          >
            ajouter au panier
          </button>
        </div>
        <div className="md:h-full m-4">
          <h1 className=' hidden md:block text-2xl text-gray-500'>{item.name.toUpperCase()}</h1>
          <h1 className='text-md text-gray-500'>{item.desc}</h1>
        </div>
      </header>
      {/* <Product /> */}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  let item: IProduct = {} as IProduct;
  try {
    const docSnapshot = await api.products.getProduct(context.params?.productId as string)
    console.log('Product ID is: ' + docSnapshot.id)
    if (!docSnapshot.exists()) {
      console.log('404: NOT FOUND')
      return {
        props: {
          item: {},
          revalidate: 0
        }
      }
    }

    const data = docSnapshot.data() as IProduct
    item = {
      ...data,
      id: docSnapshot.id,
      createdAt: (data.createdAt as Timestamp).toMillis(),
      updatedAt: (data.updatedAt as Timestamp).toMillis(),
    } as unknown as IProduct
  } catch (e) {
    console.log('SERVER ERROR', e)
  }

  return {
    props: {
      item,
      revalidate: 0
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let products: IProduct[] = []
  const productsSnapshot = await api.products.getBestProductsForCategory(20)
  products = productsSnapshot.docs.map($ => ({
    ...$.data(),
    id: $.id,
    createdAt: $.data().createdAt.toMillis(),
    updatedAt: $.data().updatedAt.toMillis(),
  } as unknown as IProduct))

  return {
    paths: products.map($ => ({ 'params': { productId: $.id } })), //OK
    fallback: 'blocking'
  }

}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // ...
// }


export default ProductDetail