'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react'; // Import useEffect
import { Fragment } from 'react';
import basicInfoIcon from '../public/basicInfo.svg';  // Replace with your actual image paths
import characteristicsIcon from '../public/characteristics.svg';
import metricsIcon from '../public/metrics.svg';
import specialTraitsIcon from '../public/dna.svg';
import externalLinksIcon from '../public/externalLink.svg';


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

  const renderFields = (fields: string[], isMetricsOrSpecialTraits: boolean = false) => {
    return fields.map((field) => {
      const value = (cat as any)[field];  // We use 'as any' here for dynamic property access; be cautious
      if (field === 'weight') {
        return (
          <div className='flex flex-col justify-between gap-1 w-full text-left' key={field}>
            <h4 className='text-grey capitalize'>{field}</h4>
            <p className='text-black-100 font-semibold'>
              {`${value.imperial} lbs / ${value.metric} kg`}
            </p>
          </div>
        );
      } else if (isMetricsOrSpecialTraits) { // Check if it's a metrics or special traits field
        return (
          <div className='flex flex-col gap-1 w-full text-left' key={field}>
            <h4 className='text-grey capitalize'>{field.split('_').join(' ')}</h4>
            <div className='flex items-center'> {/* Flex Row Container */}
              <p className='text-black-100 font-semibold'>{value}</p>
              <p className='text-black-100 font-semibold'>/5</p>
            </div>
          </div>
        );
      }
      else {
        return (
          <div className='flex flex-col justify-between gap-1 w-full text-left' key={field}>
            <h4 className='text-grey capitalize'>{field.split('_').join(' ')}</h4>
            <p className='text-black-100 font-semibold'>{value}</p>
          </div>
        );
      }
    });
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
                      <div className='flex flex-col gap-3 p-5'>
                        {/* Basic Info */}
                        <div className="section flex justify-between items-center">
                          <h3 className='text-xl font-bold'>Basic Info</h3>
                          <Image src={basicInfoIcon} alt="Basic Info Icon" width={24} height={24} /> {/* Icon */}
                        </div>
                        {renderFields(['weight', 'description', 'origin'])}

                        {/* Characteristics */}
                        <div className="section flex justify-between items-center">
                          <h3 className='text-xl font-bold'>Characteristics</h3>
                          <Image src={characteristicsIcon} alt="Characteristics Icon" width={24} height={24} /> {/* Icon */}
                        </div>
                        {renderFields(['temperament', 'life_span', 'indoor', 'lap'])}

                        {/* Metrics */}
                        <div className="section flex justify-between items-center">
                          <h3 className='text-xl font-bold'>Metrics</h3>
                          <Image src={metricsIcon} alt="Metrics Icon" width={24} height={24} /> {/* Icon */}
                        </div><div className='flex gap-5 content-between'>
                          {renderFields(['adaptability', 'affection_level', 'child_friendly', 'dog_friendly', 'energy_level'], true)} {/* Added true flag */}
                        </div>
                        {/* Special Traits */}
                        <div className="section flex justify-between items-center">
                          <h3 className='text-xl font-bold'>Special Traits</h3>
                          <Image src={specialTraitsIcon} alt="Special Traits Icon" width={24} height={24} /> {/* Icon */}
                        </div>
                        <div className='flex gap-5'>
                          {renderFields(['experimental', 'hairless', 'natural', 'rare'], true)} {/* Added true flag */}
                        </div>
                        {/* External Links */}
                        <div className="section flex justify-between items-center">
                          <h3 className='text-xl font-bold'>External Links</h3>
                          <Image src={externalLinksIcon} alt="External Links Icon" width={24} height={24} /> {/* Icon */}
                        </div>
                        {renderFields(['cfa_url', 'vetstreet_url', 'vcahospitals_url', 'wikipedia_url'])}
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