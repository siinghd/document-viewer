'use client';
import React from 'react';
import { TableCell, TableRow } from '../ui/table';
import dayjs from 'dayjs';
import { getColorForScore, getRating } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import { useRouter } from 'next/navigation';

const TableRowDashBoardClicable = ({ document }: any) => {
  const router = useRouter();
  const handleRowClick = () => {
    router.push(`/projects/${document.project.id}/${document.id}`);
  };
  return (
    <TableRow
      className="border-none cursor-pointer"
      key={document.id}
      onClick={handleRowClick}
    >
      <TableCell>{document.user.fullname}</TableCell>
      <TableCell>{dayjs(document.created_at).format('h:mmA M/D/YY')}</TableCell>
      <TableCell>{document.overall_score}</TableCell>
      <TableCell>{getRating(document.overall_score)}</TableCell>
      {document.result_summary.map((result: any) => {
        const scoreColor = getColorForScore(result.score);
        return (
          <TableCell key={result.name}>
            <span className={`block w-3 h-3 ${scoreColor} rounded-full `} />
          </TableCell>
        );
      })}

      <TableCell>
        <Checkbox defaultChecked />
      </TableCell>
    </TableRow>
  );
};

export default TableRowDashBoardClicable;
