import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table';

import React from 'react';

import TableRowDashBoardClicable from './table/TableRowDashBoardClicable';
const DashboardSubmissionTable = ({ documents }: any) => {

  return (
    <div className="overflow-x-auto">
      {documents.documents.length === 0 ? (
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
              {documents.documents[0].result_summary.map((result: any) => (
                <TableHead key={result.name}>{result.name}</TableHead>
              ))}
              <TableHead>Add to shortlist</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white ">
            {documents.documents.map((document: any) => (
              <TableRowDashBoardClicable
                document={document}
                key={document.id}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
export default DashboardSubmissionTable;
