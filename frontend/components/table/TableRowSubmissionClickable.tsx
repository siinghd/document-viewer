'use client';
import { getColorForScore, getRating } from '@/lib/utils';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { Badge } from '../ui/badge';
import { useRouter } from 'next/navigation';

const TableRowClickable = ({ doc }: any) => {
  const router = useRouter();
  const rating = getRating(doc.overall_score);
  const bgColor = getColorForScore(doc.overall_score);
  const handleRowClick = () => {
    router.push(`/projects/${doc.project.id}/${doc.id}`);
  };
  return (
    <tr onClick={handleRowClick} className="cursor-pointer">
      <td className="px-6 py-4 whitespace-nowrap flex items-center pl-0">
        <Image
          loading="lazy"
          src="/images/pdficon.png"
          className="shrink-0 my-auto w-5 aspect-[1.05]"
          alt={`${doc.name}'s avatar`}
          width={20}
          height={19}
        />
        <span className="ml-4">{doc.user.fullname}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap pl-0">
        {dayjs(doc.created_at).format('h:mmA M/D/YY')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-500 pl-0">
        {doc.status}
      </td>
      <td className="px-6 py-4 whitespace-nowrap pl-0">
        <Badge
          className={`m-auto relative justify-center  py-1.5 mb-3 rounded-xl ${bgColor.replace(
            '500',
            '100'
          )} ${bgColor.replace('bg', 'text')}`}
        >
          {rating}
        </Badge>
      </td>
    </tr>
  );
};

export default TableRowClickable;
