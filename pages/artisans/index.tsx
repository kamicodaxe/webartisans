import type { NextPage } from 'next'
import { useState } from 'react'
import api from '../../api'
import Artisans from '../../components/Artisans'

import { getArtisans } from '../../api/firebase'
import Layout from '../../components/Layout'
import IArtisan from '../../models/IArtisan'

interface Props {
  artisans: IArtisan[]
}

const JOBS_CREATORS = [
  'Bijoutier-joaillier / Bijoutière-joallière',
  'Bottier / Bottière',
  'Bronzier / Bronzière',
  'Céramiste à la main',
  'Costumière / Costumier',
  'Coutelier / Coutelière',
  'Designer de produit de lunetterie',
  'Designer textile',
  'Doreur / Doreuse',
  'Facteur / Factrice d\'orgues',
  'Facteur / Factrice de piano',
  'Ferronnier / Ferronnière d\'art',
  'Graveur',
  'Luthier / Luthière',
  'Maroquinier / Maroquinière',
  'Menuisier / Menuisière',
  'Miroitier / Miroitière',
  'Modéliste / Prototypiste',
  'Modiste - Chapelier / Chapelière',
  'Peintre en décors',
  'Sculpteur',
  'Staffeur ornemaniste / Staffeuse ornemaniste',
  'Styliste',
  'Tailleur / Tailleuse de pierre',
  'Tapissier / Tapissière d\'ameublement',
  'Verrier / Verrière au chalumeau',
  'Vitrailliste',
  'Autre'
];

const JOBS_REPAIRMAN = [
  'Bijoutier-joaillier / Bijoutière-joallière',
  'Bronzier / Bronzière',
  'Cordonnier / Cordonnière',
  'Coutelier / Coutelière',
  'Doreur / Doreuse',
  'Ebéniste',
  'Facteur / Factrice d\'orgues',
  'Facteur / Factrice de piano',
  'Ferronnier / Ferronnière d\'art',
  'Graveur',
  'Horloger / Horlogère',
  'Luthier / Luthière',
  'Menuisier / Menuisière',
  'Miroitier / Miroitière',
  'Modéliste / Prototypiste',
  'Modiste - Chapelier / Chapelière',
  'Réparateur / Réparatrice d\'instruments de musique',
  'Restaurateur d\'œuvres d\'art',
  'Retoucheuse / Retoucheur',
  'Serrurier dépanneur',
  'Staffeur ornemaniste / Staffeuse ornemaniste',
  'Tapissier / Tapissière d\'ameublement',
  'Autre'
];

const Store: NextPage<Props> = ({ artisans }) => {
  const [list, setList] = useState<IArtisan[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Nos Artisans')

  function onCategoryClick(category: string) {
    let filters = [
      {
        field: 'is_pro',
        operator: '==',
        value: true

      },
      {
        field: 'job',
        operator: '==',
        value: category
      }
    ];

    getArtisans(filters).then((data) => {
      if (!data.empty) {
        const filteredList = data.docs.map(docSnapshot => ({
          ...docSnapshot.data(),
          id: docSnapshot.id,
          reviews: docSnapshot.data().reviews.map(($$: any) => ({ ...$$.date.toMillis() })),
          avatarUri: docSnapshot.data()?.avatarUri || '',
        } as unknown as IArtisan))
        setList(filteredList)
        setSelectedCategory(category)
      }

    });
  }

  return (
    <Layout hideFooter>
      <div className='flex'>
        <div className='relative min-w-[320px] mt-16 hidden md:block'>
          <ul className='fixed p-4 pr-0 bottom-0 top-20 left-0 space-y-2 text-base text-gray-700 overflow-y-scroll'>
            <li>
              <h3 className='text-xl font-bold leading-none pb-2'>Categories</h3>
            </li>
            {
              JOBS_CREATORS.map(v => <li onClick={() => onCategoryClick(v)} className='hover:text-[#996600] hover:cursor-pointer' key={v}>{v}</li>)
            }
          </ul>
        </div>
        <Artisans title={selectedCategory} artisans={list.length > 0 ? list : artisans} />
      </div>
    </Layout >
  )
}

export async function getStaticProps() {
  let artisans: IArtisan[] = []
  const artisansSnapshot = await api.artisans.getAll(20)
  for (let i = 0; i < artisansSnapshot.docs.length; i++) {
    const docSnapshot = artisansSnapshot.docs[i];
    let avatarUri = ''
    try {
      // avatarUri = await api.users.getAvatar(getAuth().currentUser?.uid as string)
      avatarUri = ''
    } catch (e) {
      console.log(e)
    }
    artisans.push({
      ...docSnapshot.data(),
      id: docSnapshot.id,
      reviews: docSnapshot.data().reviews.map(($$: any) => ({ ...$$.date.toMillis() })),
      avatarUri: docSnapshot.data()?.avatarUri || '',
    } as unknown as IArtisan)
  }

  return {
    props: {
      artisans,
      revalidate: 60
    }
  }
}

export default Store