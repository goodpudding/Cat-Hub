"use client"
import { SearchBreed } from "."
import { useState } from "react"

const SearchBar = () => {
  const [breed, setBreed] = useState('')
  const handleSearch = () => {}


  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchBreed 
        breed={breed}
        setBreed={setBreed}
        />
      </div>
    </form>
  )
}

export default SearchBar