'use client'
import Image from "next/image";
import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";

import { breeds } from "@/constants";
import { SearchBreedProps } from "@/types";

const SearchBreed = ({ breed, setBreed }: SearchBreedProps) => {
  const [query, setQuery] = useState("");

  const filteredBreeds =
    query === ""
      ? breeds
      : breeds.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-breed">
      <Combobox value={breed} onChange={setBreed}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/cat-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="cat logo"
            />
          </Combobox.Button>

          <Combobox.Input
            className="search-breed__input"
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for breed..."
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options>
              {filteredBreeds.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className="search-breed__option"
                >
                  Create "{query}"
                </Combobox.Option>
              ) : (
                filteredBreeds.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative search-breed__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item}
                        </span>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"
                        }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchBreed;
