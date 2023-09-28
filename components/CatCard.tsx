"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { calculateCatAdoptionScore, fetchBreedImages } from "@/utils";
import { CatBreedProps } from "@/types";
import CustomButton from "./CustomButton";
import CatDetails from "./CatDetails";

interface CatCardProps {
  cat: CatBreedProps;
}

const CatCard = ({ cat }: CatCardProps) => {
  const { name, temperament, affection_level, intelligence } = cat;
  const [catImages, setCatImages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function loadImages() {
      const breedId = cat.id; // Assuming you have a unique id for each breed
      const storedImages = localStorage.getItem(breedId);

      if (storedImages) {
        setCatImages(JSON.parse(storedImages));
      } else {
        const images = await fetchBreedImages(cat);
        setCatImages(images);
        localStorage.setItem(breedId, JSON.stringify(images));
      }
    }
    
    loadImages();
  }, [cat]);
  // Replace with your actual calculation
  const adoptionScore = calculateCatAdoptionScore(cat);

  return (
    <div className="cat-card group">
      <div className="cat-card__content">
        <h3 className="cat-card__content-title">
          {name}
        </h3>
      </div>
      {cat.alt_names && <span><h3 className="font-bold">Aka:</h3> {cat.alt_names}</span>}
      <span><h3 className="font-bold">Temperament:</h3> {temperament}</span>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold align-middle'>
        <span className='self-start text-[14px] leading-[17px] font-semibold pt-2'>Adoption Score: </span>
        {adoptionScore}
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
      {catImages[0] ? (
        <Image src={catImages[0]} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{objectFit: 'contain'}} alt={name} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <span>Image Not Found</span>
        </div>

      )}
      </div>
      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <span className='flex items-center justify-between w-full'>
            <div className="flex flex-col items-center">
              <Image src='/clipboard-heart.svg' alt='heart' width={16} height={16} />
              <span>{cat.life_span} years</span>
            </div>
            <div className="flex flex-col items-center">
              <Image src='/globe.svg' alt='globe' width={16} height={16} />
              <span>{cat.origin}</span>
            </div>
            <div className="flex flex-col items-center">
              <Image src='/heart-filled.svg' alt='heart' width={16} height={16} />
              <span>{cat.affection_level}/5</span>
            </div>
          </span>
        </div>

        <div className="cat-card__btn-container">
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-orange-400'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CatDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} cat={cat} catImages={catImages} />
    </div >
  );
};

export default CatCard;
