'use client'

import Image from 'next/image';
import { Fragment } from 'react';

import{ Dialog, Transition } from '@headlessui/react'

import { CatBreedProps } from '@/types'

interface CatDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  cat: CatBreedProps;
}

const CatDetails = ({ isOpen, closeModal, cat }: CatDetailsProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child as={Fragment} enter='east-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0' >
            <div className='fixed inset-0 bg-black opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child as={Fragment} enter='east-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95' >
            <Dialog.Panel>
              <button type='button' onClick={closeModal} >
                <Image src='/close.svg' alt='close' width={20} height={20} className='object-contain'/>
              </button>
            </Dialog.Panel>
            </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CatDetails