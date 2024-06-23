import React, { Fragment } from 'react';

import {
  ArrowUpDown,
  LayoutGrid,
  List,
  MousePointer,
  Search,
  Trash,
} from 'lucide-react';

type SubmissionCardProps = {
  status: string;
  name: string;
  date: string;
  uploadProgress?: string;
  evaluationStatus?: string;
};

const SubmissionCard: React.FC<SubmissionCardProps> = ({
  status,
  name,
  date,
  uploadProgress,
  evaluationStatus,
}) => {
  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'Very Poor': 'text-rose-600 bg-pink-100',
      Poor: 'text-red-500 bg-rose-100',
      'Needs Improvement': 'text-amber-500 bg-yellow-50',
      Fair: 'text-orange-500 bg-yellow-50',
      Average: 'text-purple-500 bg-purple-100',
      'Above Average': 'text-indigo-500 bg-violet-100',
      Good: 'text-blue-500 bg-sky-100',
      'Very Good': 'text-cyan-500 bg-sky-100',
      Excellent: 'text-emerald-500 bg-green-100',
    };
    return statusColors[status] || 'text-black bg-gray-100';
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col px-2.5 py-3.5 w-full rounded-md bg-neutral-100">
        <div className="flex justify-center items-center text-xs font-semibold bg-gray-200 rounded-md">
          <div className="flex overflow-hidden relative flex-col items-end px-16 pt-1.5 pb-20 aspect-[1.77] w-[214px] max-md:pl-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f79bc9789c45b5f9935321e54a646b96f4ffb7b0b822cc0e8e6451eae6ae5eba?apiKey=4709da0204584435855723131531442a&"
              className="object-cover absolute inset-0 size-full"
              alt={`${name}'s submission`}
            />
            <div
              className={`relative justify-center px-6 py-1.5 mb-3 rounded-xl max-md:px-5 ${getStatusColor(
                status
              )}`}
            >
              {status}
            </div>
          </div>
        </div>
        <div className="flex gap-5 justify-between py-px mt-2 w-full text-center">
          <div className="flex gap-1">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/12bc9ecf40549efbf098cb2150fda091db644e874cbb31e68089184529400129?apiKey=4709da0204584435855723131531442a&"
              className="shrink-0 my-auto w-5 aspect-[1.05]"
              alt={`${name}'s avatar`}
            />
            <div className="flex flex-col">
              <div className="text-xs text-black">{name}</div>
              <div className="text-xs text-neutral-500">
                {uploadProgress
                  ? `Uploading : ${uploadProgress}`
                  : evaluationStatus || ''}
              </div>
            </div>
          </div>
          <div className="my-auto text-xs text-black">{date}</div>
        </div>
      </div>
    </div>
  );
};

type PaginationButtonProps = {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
  children,
  active,
  disabled,
}) => {
  const baseClasses = 'justify-center items-center p-2.5 bg-white rounded-lg';
  const activeClasses =
    'text-white bg-sky-500 border border-sky-500 border-solid';
  const disabledClasses = 'text-stone-300';
  const normalClasses = 'border border-solid border-zinc-100';

  let classes = baseClasses;
  if (active) classes += ` ${activeClasses}`;
  else if (disabled) classes += ` ${disabledClasses}`;
  else classes += ` ${normalClasses}`;

  return (
    <button className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

const ProjectSubmissions = ({ documents }: any) => {
  return (
    <Fragment>
      <div className="flex gap-5 justify-between mt-10 w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2">
          <button className="flex flex-col justify-center text-sm text-center text-sky-500">
            <div className="justify-center px-12 py-4 bg-sky-100 rounded-md border border-sky-500 border-solid max-md:px-5">
              Upload More Data
            </div>
          </button>
          <button className="flex justify-center items-center px-3.5 bg-white rounded-md h-[54px] w-[54px]">
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="flex gap-3">
          <button className="flex justify-center items-center px-3.5 bg-white rounded-md h-[54px] w-[54px]">
            <List className="w-5 h-5 text-gray-500" />
          </button>
          <button className="flex justify-center items-center px-3 bg-sky-100 rounded-md border border-sky-500 border-solid h-[54px] w-[54px]">
            <LayoutGrid className="w-5 h-5 text-gray-500" />
          </button>
          <button className="flex justify-center items-center p-3 bg-white rounded-md h-[54px] w-[54px]">
            <ArrowUpDown className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex gap-3 items-center">
            <button className="flex gap-3 justify-center p-3 text-sm whitespace-nowrap bg-white rounded-md text-zinc-500 items-center  h-[54px]">
              <MousePointer className="w-5 h-5 text-gray-500" />
              <span className="my-auto">Select</span>
            </button>
            <button className="flex justify-center items-center px-3 bg-white rounded-md h-[54px] w-[54px]">
              <Trash className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-center text-black max-md:max-w-full">
        Upload PDF upto 10MB
      </p>
      <section
        className={`mt-5 ${
          true
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5'
            : 'flex flex-col gap-5'
        }`}
      >
        {documents.documents.map((document: any) => (
          <SubmissionCard
            key={document.id}
            status="Very Poor"
            name="Purvija Deshmukh"
            date="May 25, 2024"
            evaluationStatus="70%"
          />
        ))}
      </section>
      <nav className="flex gap-1.5 self-start text-sm font-semibold whitespace-nowrap text-zinc-800">
        <PaginationButton disabled>Prev</PaginationButton>
        <PaginationButton>1</PaginationButton>
        <PaginationButton active>2</PaginationButton>
        <PaginationButton>3</PaginationButton>
        <PaginationButton>...</PaginationButton>
        <PaginationButton>10</PaginationButton>
        <PaginationButton>Next</PaginationButton>
      </nav>
    </Fragment>
  );
};

export default ProjectSubmissions;
