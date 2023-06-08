import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { cartActions } from '../features/cart/cartSlice'

import Product from "../models/IProduct"
interface Props {
  title: string,
  slug: string,
  products: Product[]
}

export default function CategoryPreview({ title, slug, products }: Props) {
  const router = useRouter()
  const dispatch = useDispatch()

  function addToCart(p: Product) {
    return () => dispatch(cartActions.add(p))
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className='flex flex-row'>
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 flex-1">
            {title}
          </h2>
          <button className='text-yellow-600'><Link href={`/categories/${slug}`}>Voir plus</Link></button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full max-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none lg:relative">
                {
                  product.imageSrc &&
                  <Image
                    // height={420}
                    // width={320}
                    layout='fill'
                    src={product.imageSrc || ''}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full mx-auto"
                  />
                }
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">

                    <a href={`/p/${product.name}`} onClick={(e) => {
                      e.preventDefault()
                      router.push(`/p/${product.name}`)
                    }}>
                      <span aria-hidden="true" className="absolute inset-0 bottom-8" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
              <button
                type='button'
                onClick={addToCart(product)}
                className='font-medium text-sm text-center w-full text-indigo-600 hover:text-indigo-500'
              >
                add
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}