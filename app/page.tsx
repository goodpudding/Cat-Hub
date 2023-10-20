import { Hero, SearchBar, CustomFilter, CatCard } from '@/components'
import Image from 'next/image'
import { fetchCatBreeds } from '@/utils'
import { breedInfo, furLengthOptions } from '@/constants'

export default async function Home() {
  const allCats = await fetchCatBreeds()

  const isDataEmpty = !Array.isArray(allCats) || allCats.length < 1 || !allCats;
  return (
    <main className='overflow-hidden'>
      <Hero/>
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
      <div className='home__text-container'>
        <h1 className='text-4xl font-extrabold'>Cat Catalog</h1>
        <p>
          Explore the cats you might like
        </p>
      </div>
      <div className='home__filters'>
        <SearchBar />
        <div className='home__filter-container'>
          <CustomFilter title="Breed Origin" options={breedInfo}/>
          <CustomFilter title="Fur Length" options={furLengthOptions}/>
        </div>
      </div>

      {!isDataEmpty ? (
        <section>
          <div className='home__cats-wrapper'>
          {allCats?.map((cat) => 
            (<CatCard cat={cat} />
            ))}
          </div>
        </section>
      ) : (
        <div className='home__error-container'>
          <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
          <p>{allCats?.message}</p>
          </div>
          )
          }

      </div>
    </main>

  )
}
