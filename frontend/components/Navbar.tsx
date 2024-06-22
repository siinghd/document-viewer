import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
    <nav
      className="px-4 flex items-center justify-between  h-[69px]  py-4 bg-gradient-to-b from-[#1104F3] to-[#0EDEF9] text-white xl:px-[218px]"
      style={{ gap: '10px' }}
    >
      <div className="flex items-center space-x-2 ">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={213}
          height={30}
          className="cursor-pointer"
        />

        <span className="text-sm">{'> '} Tally</span>
      </div>

      <div className=" hidden md:flex items-center space-x-8 sm:hidden ">
        <div className="relative">
          <a href="#" className="text-sm nav-item">
            Home
          </a>
          <span className=""></span>
        </div>
        <div className="relative">
          <a href="#" className="text-sm nav-item">
            All Projects
          </a>
          <span className=""></span>
        </div>
        <div className="relative">
          <a
            href="#"
            className="relative z-10 px-4 py-2 text-sm bg-white text-blue-600 rounded-md nav-item active"
          >
            Project View
          </a>
          <span className="extra-active-nav"></span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <UserIcon className="h-6 w-6" />
        <span className="text-sm">Purvaja</span>
        <ChevronDownIcon className="h-4 w-4" />
      </div>
    </nav>
  );
};

export default Navbar;

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function LogInIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
