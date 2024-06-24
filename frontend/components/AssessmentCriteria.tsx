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
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { getColorForScore } from '@/lib/utils';
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
        <TableRow className="border-none hover:bg-transparent">
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
        {assessments.map((assessment, index) => {
          const scoreColor = getColorForScore(assessment.score);
          return (
            <TableRow key={index} className="border-none">
              <TableCell>{assessment.criteria}</TableCell>
              <TableCell>
                <Badge
                  className={`${scoreColor} text-white w-[77px] justify-center`}
                >
                  {assessment.score}
                </Badge>
              </TableCell>
              <TableCell>{assessment.weightage}</TableCell>
              <TableCell className="w-[410px]">
                <p>{assessment.justification}</p>
                <a href="#" className="text-blue-500">
                  View in Resume
                </a>
                <div className="flex space-x-2 mt-2">
                  <Button className=" text-yellow-500 bg-transparent border-blue-500 border-[1px]">
                    <ThumbsUpIcon className="h-4 w-4" />
                  </Button>
                  <Button className=" text-yellow-500 bg-transparent border-[1px] border-blue-500">
                    <ThumbsDownIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </div>
);

export default AssessmentCriteria;
