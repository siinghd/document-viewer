'use client';
import { ChevronDownIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const BackgroundImage = () => (
  <Image
    loading="lazy"
    src="/images/bg-navbar.png"
    className="object-cover absolute inset-0 size-full"
    alt=""
    width={168}
    height={56}
  />
);

const Navbar = () => {
  const path = usePathname();

  const isActive = (pathname: string) => {
    if (pathname === '/') {
      return path === '/';
    }
    return path.startsWith(pathname);
  };

  return (
    <header className="min-h-[69px] flex flex-col items-center px-16 pt-3.5 w-full text-base bg-[linear-gradient(180deg,#1104F3_-1.61%,#0EDEF9_135.26%)] max-md:px-5 max-md:max-w-full xl:px-[218px]">
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
        <nav className="flex gap-5 self-stretch space space-x-8 lat">
          <button
            className={`relative ${
              isActive('/')
                ? 'flex overflow-hidden flex-col justify-center px-10 font-bold aspect-[3] fill-white -mb-[2px] text-sky-500'
                : 'my-auto tracking-normal text-white'
            }`}
          >
            {isActive('/') && <BackgroundImage />}
            <span className="z-10">Home</span>
          </button>
          {/* <Link
            href="/allprojects"
            className={`relative ${
              isActive('/allprojects')
                ? 'flex overflow-hidden flex-col justify-center px-10 font-bold aspect-[3] fill-white -mb-[2px] text-sky-500'
                : 'my-auto tracking-normal text-white'
            }`}
          >
            {isActive('/allprojects') && <BackgroundImage />}
            <span className="z-10">All projects</span>
          </Link> */}
          <Link
            href="/projects"
            className={`relative ${
              isActive('/projects')
                ? 'flex overflow-hidden flex-col justify-center px-10 font-bold aspect-[3] fill-white -mb-[2px] text-sky-500'
                : 'my-auto tracking-normal text-white'
            }`}
          >
            {isActive('/projects') && <BackgroundImage />}
            <span className="z-10">Project View</span>
          </Link>
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
