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

const DashboardSubmissionTable = ({ documents }: any) => {
    console.log(documents);
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader className="bg-transparent border-none">
          <TableRow className="border-none">
            <TableHead>Name</TableHead>
            <TableHead>Submission Time</TableHead>
            <TableHead>Overall Score</TableHead>
            <TableHead>Overall Rating</TableHead>
            <TableHead>Rag Implementation</TableHead>
            <TableHead>Fine-Tuning</TableHead>
            <TableHead>MultiModal AI</TableHead>
            <TableHead>Python & Libraries</TableHead>
            <TableHead>AI Modeling</TableHead>
            <TableHead>Analyzing User Data</TableHead>
            <TableHead>Problem Solving</TableHead>
            <TableHead>Teamwork</TableHead>
            <TableHead>Motivation</TableHead>
            <TableHead>Add to shortlist</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white ">
          <TableRow className="border-none">
            <TableCell>John Doe</TableCell>
            <TableCell>5:01PM 5/18/23</TableCell>
            <TableCell>00.00</TableCell>
            <TableCell>Needs Improvement</TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-blue-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-green-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-blue-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-orange-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-blue-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-red-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-blue-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-green-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-green-500 rounded-full" />
            </TableCell>
            <TableCell>
              <Checkbox defaultChecked />
            </TableCell>
          </TableRow>
          <TableRow className="border-none">
            <TableCell>John Doe</TableCell>
            <TableCell>5:01PM 5/18/23</TableCell>
            <TableCell>00.00</TableCell>
            <TableCell>Satisfactory</TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-blue-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-green-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-blue-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-orange-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-blue-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-red-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-blue-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-green-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-green-500 rounded-full" />
            </TableCell>
            <TableCell>
              <Checkbox />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>5:01PM 5/18/23</TableCell>
            <TableCell>00.00</TableCell>
            <TableCell>Good</TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-blue-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-green-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-blue-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-orange-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-blue-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-red-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-blue-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-green-500 rounded-full" />
            </TableCell>
            <TableCell>
              <span className="block w-3 h-3 bg-green-500 rounded-full" />
            </TableCell>
            <TableCell>
              <Checkbox />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
export default DashboardSubmissionTable;
