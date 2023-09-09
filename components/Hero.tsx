"use client"
import Image from 'next/image';
import CustomButton from './CustomButton';
const Hero = () => {
  const handleScroll = () => {
  
  }
  return (
    <div className='hero'>
      <div className='flex-1 pt-36 padding-x'>
        <h1 className='hero__title'>
        Know Your Breed, Love Your Cat
        </h1>

        <p className='hero__subtitle'>
        Your Guide to a Pawsitively Perfect Match
        </p>
        <CustomButton
          title='Find a cat'
          containerStyles='bg-orange-400 text-white rounded-full mt-10'
          handleClick={handleScroll}
        />
      </div>
      <div className='hero__image-container'>
        <div className='hero__image'>
          <Image src='/cat-hero.png' alt='hero' fill className='object-contain'/>
          <div className='hero__image-overlay'/>
        </div>
      </div>
    </div>
  )
}

export default Hero