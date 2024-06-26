import { getColorForScore } from '@/lib/utils';
import { Copy } from 'lucide-react';

type ScoreCardProps = {
  title: string;
  score: number;
  information: {
    title: string;
    description: string;
  }[];
};

const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, information }) => {
  const scoreColorClass = getColorForScore(score, 'txt');

  return (
    <section className="flex flex-col py-6 w-full bg-white rounded-3xl">
      <div className="flex flex-col items-center px-5 font-semibold text-black">
        <h3 className="self-stretch text-sm">{title}</h3>
        <p
          className={`mt-8 text-6xl text-center ${scoreColorClass} max-md:text-4xl`}
        >
          {score}
        </p>
        <p className="mt-1.5 text-base text-center font-[275]">of 100</p>
      </div>
      <div className="flex gap-0.5 pr-4 mt-3 mr-5 ml-5 max-md:mx-2.5 justify-center">
        <div className="shrink-0 h-3 bg-rose-600 rounded-[100px_0px_0px_100px] w-[30px]" />
        <div className="shrink-0 h-3 bg-red-500 w-[30px]" />
        <div className="shrink-0 h-3 bg-orange-500 w-[30px]" />
        <div className="shrink-0 h-3 bg-amber-500 w-[30px]" />
        <div className="shrink-0 h-3 bg-pink-500 w-[30px]" />
        <div className="shrink-0 h-3 bg-purple-500 w-[30px]" />
        <div className="shrink-0 h-3 bg-indigo-500 w-[30px]" />
        <div className="shrink-0 h-3 bg-blue-500 w-[30px]" />
        <div className="shrink-0 h-3 bg-cyan-500 w-[30px]" />
        <div className="shrink-0 h-3 bg-emerald-500  w-[30px] rounded-[0px_100px_100px_0px]" />
      </div>
      {information.map(({ title, description }, index) => (
        <div key={title + index}>
          <div className="flex gap-5 justify-between pr-3 mt-6 mr-5 ml-5 max-w-full text-sm font-semibold text-black whitespace-nowrap  max-md:mx-2.5">
            <h4>{title}:</h4>
            <Copy className="shrink-0 w-6 aspect-square" />
          </div>
          <p className="mt-6 mr-5 ml-5 text-xs font-light text-black max-md:mx-2.5">
            {description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default ScoreCard;
