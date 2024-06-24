import { getColorForScore, getRating } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';

type SubmissionCardProps = {
  projectId: number;
  docid: number;
  score: number;
  name: string;
  date: string;
  uploadProgress?: string;
  evaluationStatus?: string;
};

const SubmissionCard: React.FC<SubmissionCardProps> = ({
  projectId,
  docid,
  score,
  name,
  date,
  uploadProgress,
  evaluationStatus,
}) => {
  const rating = getRating(score);
  const bgColor = getColorForScore(score);

  return (
    <Link href={`/projects/${projectId}/${docid}`}>
      <div className="flex flex-col justify-center">
        <div className="flex flex-col px-2.5 py-3.5 w-full rounded-md bg-neutral-100">
          <div className="flex justify-center items-center text-xs font-semibold bg-gray-200 rounded-md">
            <div className="flex overflow-hidden relative flex-col items-end px-16 pt-1.5 pb-20 aspect-[1.77] w-[214px] max-md:pl-5">
              <Image
                loading="lazy"
                src="/images/pdf.png"
                className="object-cover absolute inset-0 size-full"
                alt={`${name}'s submission`}
                width={214}
                height={120}
              />
              <Badge
                className={`m-auto relative justify-center  py-1.5 mb-3 rounded-xl ${bgColor.replace(
                  '500',
                  '100'
                )} ${bgColor.replace('bg', 'text')}`}
              >
                {rating}
              </Badge>
            </div>
          </div>
          <div className="flex gap-5 justify-between py-px mt-2 w-full text-center">
            <div className="flex gap-1">
              <Image
                loading="lazy"
                src="/images/pdficon.png"
                className="shrink-0 my-auto w-5 aspect-[1.05]"
                alt={`${name}'s avatar`}
                width={20}
                height={19}
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
    </Link>
  );
};

export default SubmissionCard;
