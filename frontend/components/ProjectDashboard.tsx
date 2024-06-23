import React, { Fragment } from 'react';
import DashboardSubmissionTable from './DashboardSubmissionTable';
import { ArrowUpDown, Filter, Search } from 'lucide-react';
import SubmissionQualityItem from './SubmissionQualityItem';

const ProjectDashboard = ({ documents, stats }: any) => {
  return (
    <Fragment>
      <section className="flex gap-2 justify-between mt-6 ml-3.5 max-md:flex-wrap max-md:max-w-full max-h-[86px]">
        <div className="flex flex-col justify-center px-14 py-4 text-white whitespace-nowrap rounded-lg bg-[linear-gradient(172deg,#1104F3_-1.61%,#0EDEF9_125.26%)] max-md:px-5">
          <div className="self-center text-sm font-medium tracking-wide">
            Total
          </div>
          <div className="mt-5 text-4xl font-black">{stats.total_score}</div>
        </div>
        <div className="flex flex-col justify-center px-11 py-7 bg-white rounded-lg max-md:px-5">
          <div className="text-sm text-zinc-500">Percentage Assessed</div>
          <div className="flex gap-2 mt-1.5 text-blue-500 whitespace-nowrap">
            <div className="text-4xl font-black">100%</div>
            <div className="justify-center self-start px-2 py-1 mt-5 text-xs font-medium bg-blue-500 bg-opacity-0">
              {stats.percentage_assessed}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center px-7 py-8 bg-white rounded-lg max-md:max-w-full">
          <div className="self-center text-sm text-zinc-500">
            Submission Quality
          </div>
          <div className="flex gap-0 justify-center mt-3 text-xs text-center rounded-md max-md:flex-wrap max-h-[40px]">
            <div className="justify-center px-4 py-1.5 text-rose-600 bg-rose-600 bg-opacity-10">
              Needs Improvement
              <br />
              {stats.submission_quality['0-10']}
            </div>
            <SubmissionQualityItem
              color="red"
              count={stats.submission_quality['0-10']}
              label="Red category"
            />
            <SubmissionQualityItem
              color="orange"
              count={stats.submission_quality['11-20']}
              label="Orange category"
            />
            <SubmissionQualityItem
              color="amber"
              count={stats.submission_quality['21-30']}
              label="Amber category"
            />
            <SubmissionQualityItem
              color="pink"
              count={stats.submission_quality['31-40']}
              label="Pink category"
            />
            <SubmissionQualityItem
              color="purple"
              count={stats.submission_quality['51-60']}
              label="Purple category"
            />
            <SubmissionQualityItem
              color="indigo"
              count={stats.submission_quality['61-70']}
              label="Indigo category"
            />
            <SubmissionQualityItem
              color="blue"
              count={stats.submission_quality['71-80']}
              label="Blue category"
            />
            <SubmissionQualityItem
              color="sky"
              count={stats.submission_quality['81-90']}
              label="Sky category"
            />
            <div className="justify-center px-3 py-1.5 text-emerald-500 whitespace-nowrap bg-green-100 max-md:px-5">
              Excellent
              <br />
              {stats.submission_quality['91-100']}
            </div>
          </div>
        </div>
        <div className="justify-center items-center px-16 py-7 text-4xl font-bold text-blue-500 whitespace-nowrap bg-white rounded-lg max-md:px-5">
          {stats.number_of_documents}
        </div>
      </section>
      <div className="flex gap-5 justify-between self-stretch pr-4 mt-6 w-full max-md:flex-wrap max-md:max-w-full">
        <nav className="flex gap-5 pr-4 text-xs font-medium bg-white rounded-md max-md:flex-wrap">
          <div className="flex gap-4">
            <button className="justify-center px-4 py-2.5 text-white whitespace-nowrap bg-sky-500 rounded-md">
              All
            </button>
            <button className="my-auto text-zinc-500">Top 20</button>
          </div>
          <div className="flex flex-auto gap-5 justify-between my-auto text-zinc-500">
            <button>Excellent</button>
            <button>Good</button>
            <button>Satisfactory</button>
            <button>Needs Improvement</button>
          </div>
        </nav>
        <div className="flex gap-2.5 items-start self-start">
          <button className="flex gap-2.5 justify-between px-2.5 py-2 text-xs whitespace-nowrap bg-white rounded text-zinc-500">
            <Filter className="w-4 h-4 text-sky-500" />
            <span className="my-auto">Filter</span>
          </button>
          <button className="flex justify-center items-center px-2.5 py-2 bg-white rounded">
            <ArrowUpDown className="w-4 h-4 text-sky-500" />
          </button>
          <div className="flex gap-1.5 px-4 py-2 text-xs font-medium whitespace-nowrap bg-white rounded-md text-zinc-500">
            <Search className="w-4 h-4 " />

            <span>Search</span>
          </div>
        </div>
      </div>
      <div className="px-4 flex gap-3.5 justify-between items-start self-center mt-6 max-w-full text-xs font-medium text-zinc-500 w-full max-md:flex-wrap">
        <DashboardSubmissionTable documents={documents} />
      </div>
    </Fragment>
  );
};

export default ProjectDashboard;
