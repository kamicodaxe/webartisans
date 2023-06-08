import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { cartActions } from '../features/cart/cartSlice'
import formatPrice from '../lib/formatPrice'

import Product from "../models/IProduct"
interface Props {
  products: Product[],
  hideTitle?: boolean
}

export default function Products({ products, hideTitle }: Props) {
  const router = useRouter()
  const dispatch = useDispatch()

  function addToCart(p: Product) {
    return () => dispatch(cartActions.add(p))
  }

  return (
    <section className="text-gray-600 body-font py-8 lg:py-12">
      {
        !hideTitle && (
          <h3 className="sm:text-4xl text-3xl text-center font-medium title-font mb-8 text-gray-900">Découvrez les nouveaux produits &quot;Made in Ivory Cost&quot;</h3>
        )
      }
      <div className="container px-4 pt-0 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product, i) => (
            <div key={product.id + '' + i} className="lg:w-1/4 md:w-1/2 p-4 w-full group/product">
              <a
                className="block relative h-48 rounded overflow-hidden"
                href={`/boutique_atelier/${product.id}`} onClick={(e) => {
                  e.preventDefault()
                  router.push(`/boutique_atelier/${product.id}`)
                }}
              >
                <img alt={product.imageAlt} className="object-cover object-center w-full h-full block" src={product.imageSrc || ''} />
              </a>
              <div className="mt-4 relative">
                <div className='flex flex-row justify-between'>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Nom de l&apos;artisan</h3>
                  <h2 className="text-gray-500 text-xs text-right tracking-widest title-font mb-1"><i>Marque</i></h2>
                </div>
                <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                <p className="">{formatPrice(product.price)}</p>
                <span className="absolute right-0 bottom-0 md:invisible group-hover/product:visible">
                  <button
                    type='button'
                    onClick={addToCart(product)}
                    className='font-medium text-sm text-center w-full bg-[#663300] text-white p-2 rounded'
                  >
                    ajouter au panier
                  </button>
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
