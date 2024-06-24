type SubmissionQualityItemProps = {
  color: string;
  count: number;
  label: string;
};

const SubmissionQualityItem: React.FC<SubmissionQualityItemProps> = ({
  color,
  count,
  label,
}) => (
  <div
    className={`flex flex-col flex-1 justify-center px-3 py-1.5 text-${color}-500 whitespace-nowrap bg-${color}-100`}
  >
    <div
      className={`shrink-0 bg-${color}-500 rounded-full h-[11px] w-[11px]`}
    />
    <div>{count}</div>
    <div className="sr-only">{label}</div>
  </div>
);

export default SubmissionQualityItem;
