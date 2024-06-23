import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';
import dayjs from 'dayjs';
import { getColorForScore, getRating } from '@/lib/utils';
const DashboardSubmissionTable = ({ documents }: any) => {
  return (
    <div className="overflow-x-auto">
      {documents.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No submissions yet
        </div>
      ) : (
        <Table className="min-w-full">
          <TableHeader className="bg-transparent border-none">
            <TableRow className="border-none">
              <TableHead>Name</TableHead>
              <TableHead>Submission Time</TableHead>
              <TableHead>Overall Score</TableHead>
              <TableHead>Overall Rating</TableHead>
              {documents[0].result_summary.map((result: any) => (
                <TableHead key={result.name}>{result.name}</TableHead>
              ))}
              <TableHead>Add to shortlist</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white ">
            {documents.map((document: any) => (
              <TableRow className="border-none" key={document.id}>
                <TableCell>{document.user.fullname}</TableCell>
                <TableCell>
                  {dayjs(document.created_at).format('h:mmA M/D/YY')}
                </TableCell>
                <TableCell>{document.overall_score}</TableCell>
                <TableCell>{getRating(document.overall_score)}</TableCell>
                {document.result_summary.map((result: any) => {
                  const scoreColor = getColorForScore(result.score);
                  return (
                    <TableCell key={result.name}>
                      <span
                        className={`block w-3 h-3 ${scoreColor} rounded-full `}
                      />
                    </TableCell>
                  );
                })}

                <TableCell>
                  <Checkbox defaultChecked />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
export default DashboardSubmissionTable;
