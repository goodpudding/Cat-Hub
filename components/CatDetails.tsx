'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react'; // Import useEffect
import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react'

import { CatBreedProps } from '@/types'

interface CatDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  cat: CatBreedProps;
  catImages: string[];
}
const CatDetails = ({ isOpen, closeModal, cat, catImages }: CatDetailsProps) => {
  const [mainImage, setMainImage] = useState('');

  // Add useEffect as before to initialize mainImage
  useEffect(() => {
    if (catImages.length > 0) {
      setMainImage(catImages[0]); // Set mainImage state to the first image in the updated array
    }
  }, [catImages]);

  const handleImageClick = (url: string) => {
    setMainImage(url); // Update mainImage state
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child as={Fragment}
            enter='east-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0' >
            <div className='fixed inset-0 bg-black opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child as={Fragment} enter='east-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95' >
                <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl flex flex-col gap-5'>
                  <button
                    type='button'
                    className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                    onClick={closeModal} >
                    <Image src='close.svg' alt='close' width={20} height={20} className='object-contain' />
                  </button>
                  <div className='flex-1 flex flex-col gap-3'>
                    <div className='relative w-full h-80 bg-cover bg-center rounded-lg overflow-hidden'>
                      <Image src={mainImage} alt='cat' layout='fill' sizes='100vw' className='object-contain' />
                    </div>
                    <div className='flex gap-3 '> 
                      {catImages.map((url, index) => (
                        <div key={index} className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg' onClick={() => handleImageClick(url)}>
                          <Image src={url} alt='cat' fill priority className='object-contain cursor-pointer' onClick={() => handleImageClick(url)} />
                        </div>
                      ))}
                    </div>
                    <div className='flex flex-col gap-3 p-5'>
                      <h2 className='text-2xl font-bold'>{cat.name}</h2>
                      <div className='mt-3 flex flex-col gap-4'>
                        {Object.entries(cat).map(([key, value]) => {
                          if (key === 'weight') {
                            return (
                              <div className='flex flex-col justify-between gap-1 w-full text-left' key={key}>
                                <h4 className='text-grey capitalize'>{key.split('_').join(' ')}</h4>
                                <p className='text-black-100 font-semibold'>
                                  {`${value.imperial} lbs / ${value.metric} kg`}
                                </p>
                              </div>
                            );
                          } else {
                            return (
                              <div className='flex flex-col justify-between gap-1 w-full text-left' key={key}>
                                <h4 className='text-grey capitalize'>{key.split('_').join(' ')}</h4>
                                <p className='text-black-100 font-semibold'>{value}</p>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition >
    </>
  )
}

export default CatDetails