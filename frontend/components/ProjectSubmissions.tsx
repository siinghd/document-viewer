import React, { Fragment } from 'react';

import {
  ArrowUpDown,
  LayoutGrid,
  List,
  MousePointer,
  Search,
  Trash,
} from 'lucide-react';
import dayjs from 'dayjs';
import SubmissionCard from './SubmissionCard';
import Pagination from './Pagination';
import Link from 'next/link';
import { getUpdatedUrl } from '@/lib/functions';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Image from 'next/image';
import { getColorForScore, getRating } from '@/lib/utils';
import { FileUpload } from './FileUpload';
import TableRowClickable from './table/TableRowSubmissionClickable';

const ProjectSubmissions = ({ documents, searchParams, projectId }: any) => {
  if (!searchParams.displayType) searchParams.displayType = 'grid';
  return (
    <Fragment>
      <div className="flex gap-5 justify-between mt-10 w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2">
          <button className="flex flex-col justify-center text-sm text-center text-sky-500">
            <FileUpload projectId={projectId} />
          </button>
          <button className="flex justify-center items-center px-3.5 bg-white rounded-md h-[54px] w-[54px]">
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="flex gap-3">
          <Link
            href={getUpdatedUrl(`/projects/${projectId}`, searchParams, {
              displayType: 'list',
            })}
            className={`flex justify-center items-center px-3.5  rounded-md h-[54px] w-[54px] ${
              searchParams.displayType === 'list'
                ? 'bg-sky-100 border-sky-500 '
                : 'bg-white'
            }`}
          >
            <List className="w-5 h-5 text-gray-500" />
          </Link>
          <Link
            href={getUpdatedUrl(`/projects/${projectId}`, searchParams, {
              displayType: 'grid',
            })}
            className={`flex justify-center items-center px-3 rounded-md border border-solid h-[54px] w-[54px] ${
              searchParams.displayType === 'grid'
                ? 'bg-sky-100 border-sky-500 '
                : 'bg-white'
            }`}
          >
            <LayoutGrid className="w-5 h-5 text-gray-500" />
          </Link>
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
      {searchParams.displayType === 'grid' ? (
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
              docid={document.id}
              projectId={document.project_id}
              score={document.overall_score}
              name={document.user.fullname}
              date={dayjs(document.created_at).format('h:mmA M/D/YY')}
              evaluationStatus={document.status}
            />
          ))}
        </section>
      ) : (
        <div className="overflow-x-auto w-full mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm text-black-500 uppercase tracking-wider font-medium pl-0"
                >
                  Document Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-black-500 ppercase tracking-wider pl-0"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-black-500 uppercase tracking-wider pl-0"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-black-500uppercase tracking-wider pl-0"
                >
                  Score
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {documents.documents.map((doc: any) => (
                <TableRowClickable doc={doc} key={doc.id} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination dataLength={documents.documents.length} />
    </Fragment>
  );
};

export default ProjectSubmissions;
