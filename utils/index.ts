import axios from 'axios';
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

// Read Cat API key from .env file
const CAT_API_KEY = process.env.CAT_API_KEY || '';

export interface CatBreedProps {
  weight: { imperial: string; metric: string };
  id: string;
  name: string;
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
}

export interface FilterProps {
  origin?: string;
  temperament?: string;
  limit?: number;
}

export const calculateCatAdoptionScore = (cat: CatBreedProps) => {
  const { adaptability, affection_level, child_friendly } = cat;
  
  // Sample scoring formula, can be adjusted as needed
  const adoptionScore = adaptability + affection_level + child_friendly;

  return adoptionScore;
};

export const fetchCatBreeds = async () => {
  // const { origin, temperament, limit } = filters;

  const config = {
    headers: {
      'x-api-key': CAT_API_KEY,
    },
  };

  const response = await axios.get(`https://api.thecatapi.com/v1/breeds`, config);
  return response.data;
};

export const fetchBreedImage = async (cat: CatBreedProps) => {
  // const { origin, temperament, limit } = filters;

  const config = {
    headers: {
      'x-api-key': CAT_API_KEY,
    },
  };

  const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${cat.id}`, config);
  return response.data[0].url;
};

export const generateCatInfoLinks = (cat: CatBreedProps) => {
  const { cfa_url, vetstreet_url, vcahospitals_url, wikipedia_url } = cat;
  return {
    cfa: cfa_url,
    vetstreet: vetstreet_url,
    vca: vcahospitals_url,
    wikipedia: wikipedia_url,
  };
};

export const generateCatProfile = (cat: CatBreedProps) => {
  const {
    name,
    description,
    temperament,
    origin,
    life_span,
    weight,
  } = cat;

  return {
    name,
    description,
    temperament,
    origin,
    lifeSpan: life_span,
    weight: `${weight.imperial} lbs (${weight.metric} kg)`,
  };
};
