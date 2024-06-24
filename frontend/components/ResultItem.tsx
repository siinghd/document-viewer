type ResultItemProps = {
  title: string;
  score: number;
  color: string;
};

const ResultItem: React.FC<ResultItemProps> = ({ title, score, color }) => (
  <div className="flex gap-5 justify-between py-6 pr-9 pl-4 border-b border-solid border-zinc-100 max-md:pr-5">
    <div className="font-semibold text-black">{title}</div>
    <div
      className={`justify-center px-8 py-2 my-auto font-medium text-center text-white whitespace-nowrap ${color} rounded-3xl max-md:px-5`}
    >
      {score}
    </div>
  </div>
);

export default ResultItem;