import { ChevronDownIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
    <header className="flex flex-col items-center px-16 pt-3.5 w-full text-base bg-[linear-gradient(180deg,#1104F3_-1.61%,#0EDEF9_135.26%)] max-md:px-5 max-md:max-w-full xl:px-[218px]">
      <div className="flex gap-5 justify-between items-start w-full max-w-[1489px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2.5 items-center mt-1.5 tracking-normal text-white whitespace-nowrap">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={152}
            height={30}
            className="cursor-pointer"
          />
          <div className="self-stretch my-auto">&gt;</div>
          <div className="self-stretch my-auto">Tally</div>
        </div>
        <nav className="flex gap-5 self-stretch space">
          <div className="my-auto tracking-normal text-white">Home</div>
          <div className="flex flex-auto gap-5 justify-between">
            <div className="my-auto tracking-normal text-white">
              All Projects
            </div>
            <div className="flex overflow-hidden relative flex-col justify-center px-10 py-5 font-bold text-sky-500 aspect-[3] fill-white max-md:px-5 -mb-[2px]">
              <Image
                loading="lazy"
                src="/images/bg-navbar.png"
                className="object-cover absolute inset-0 size-full"
                alt=""
                width={168}
                height={56}
              />
              <span className="text-[#1090F7] z-10 mt-6">Project View</span>P
            </div>
          </div>
        </nav>
        <div className="flex gap-3.5 items-center mt-2 text-white whitespace-nowrap">
          <UserIcon className="h-6 w-6" />
          <div className="self-stretch my-auto">Purvaja</div>
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
