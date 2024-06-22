import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
type AssessmentCriteriaProps = {
  assessments: {
    criteria: string;
    score: number;
    weightage: string;
    justification: string;
  }[];
};

const AssessmentCriteria: React.FC<AssessmentCriteriaProps> = ({
  assessments,
}) => (
  <div className="overflow-x-auto mt-[42px]">
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-none">
          <TableHead className="text-black font-medium text-xl">
            Assessment Criteria
          </TableHead>
          <TableHead className="text-black font-medium text-xl">
            Score
          </TableHead>
          <TableHead className="text-black font-medium text-xl">
            Weightage
          </TableHead>
          <TableHead className="text-black font-medium text-xl">
            Justification
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assessments.map((_, index) => (
          <TableRow key={index} className="border-none">
            <TableCell>Compliance with the Rubric</TableCell>
            <TableCell>
              <Badge className="bg-green-500 text-white">16</Badge>
            </TableCell>
            <TableCell>50%</TableCell>
            <TableCell className="w-[410px]">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the
              </p>
              <a href="#" className="text-blue-500">
                View in Resume
              </a>
              <div className="flex space-x-2 mt-2">
                <Button className="bg-yellow-500 text-white">
                  <ThumbsUpIcon className="h-4 w-4" />
                </Button>
                <Button className="bg-red-500 text-white">
                  <ThumbsDownIcon className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default AssessmentCriteria;

function ThumbsDownIcon(props: any) {
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
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function ThumbsUpIcon(props: any) {
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
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}
