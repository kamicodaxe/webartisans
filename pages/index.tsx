import { getAuth } from 'firebase/auth'
import type { NextPage } from 'next'
import api from '../api'
import Artisans from '../components/Artisans'
import BlogPreview from '../components/BlogPreview'

import Hero from '../components/Hero'
import Layout from '../components/Layout'
import Pricing from '../components/Pricing'
import Products from '../components/Products'
import Testimonials from '../components/Testimonials'
import IArtisan from '../models/IArtisan'
import ICategory from '../models/ICategory'
import IProduct from '../models/IProduct'

interface Props {
  categories?: ICategory[]
  products: IProduct[]
  artisans: IArtisan[]
}

const Home: NextPage<Props> = ({ products, artisans }) => {

  return (
    <Layout>
      <Hero />
      <Artisans artisans={artisans} />
      <Products products={products} />
      <BlogPreview />
      <Pricing />
      <Testimonials />
    </Layout >
  )
}

export async function getStaticProps() {
  let products: IProduct[] = []
  let artisans: IArtisan[] = []
  const productsSnapshot = await api.products.getBestProductsForCategory(8)
  const artisansSnapshot = await api.artisans.getAll(8)
  products = productsSnapshot.docs.map($ => ({
    ...$.data(),
    id: $.id,
    createdAt: $.data().createdAt.toMillis(),
    updatedAt: $.data().updatedAt.toMillis(),
  } as unknown as IProduct))

  for (let i = 0; i < artisansSnapshot.docs.length; i++) {
    const docSnapshot = artisansSnapshot.docs[i];
    let avatarUri = docSnapshot.data().avatarUri || ''
    try {
      avatarUri = await api.users.getAvatar(getAuth().currentUser?.uid as string)
    } catch (e) {
      console.log(e)
    }
    artisans.push({
      ...docSnapshot.data(),
      id: docSnapshot.id,
      reviews: docSnapshot.data().reviews.map(($$: any) => ({ ...$$.date.toMillis() })),
      avatarUri,
    } as unknown as IArtisan)
  }

  return {
    props: {
      categories: [],
      products,
      artisans,
      revalidate: 60
    }
  }
}

export default Home