import AssessmentCriteria from '@/components/AssessmentCriteria';
import DocViewer from '@/components/DocViewer';
import ResultItem from '@/components/ResultItem';
import ScoreCard from '@/components/ScoreCard';
import { ChevronRight, ChevronDown } from 'lucide-react';
import * as React from 'react';

function DocumentPage() {
  return (
    <main className="flex flex-col max-md:max-w-full px-2 mt-[33px] pb-6">
      <section className="py-5 pr-3 pl-6 bg-gray-50 rounded-3xl max-md:pl-5 max-md:max-w-full lg:max-h-[1080px] overflow-hidden">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow max-md:mt-9 max-md:max-w-full">
              <div className="flex gap-5 items-start self-start text-base text-zinc-700">
                <h1 className="grow self-stretch">Hiring UX Designer</h1>

                <ChevronRight className="h-6 w-6" />

                <div className="flex gap-1.5 font-medium">
                  <div className="grow">Bosola Ronke</div>
                 <ChevronDown className="h-6 w-6" />

                </div>
              </div>
              <div className="flex gap-2.5 mt-4 max-md:flex-wrap max-md:max-w-full">
                <div className="flex overflow-hidden relative flex-col grow shrink-0  text-base text-white basis-0 w-fit max-md:px-5 max-md:max-w-full">
                  <DocViewer />
                </div>
                <div className="flex flex-col self-start pb-20 bg-white rounded-md">
                  <div className="shrink-0 bg-gray-300 rounded-md h-[27px]" />
                </div>
              </div>
            </div>
          </div>
          <aside className="flex flex-col ml-5 w-[30%] max-md:ml-0 max-md:w-full max-h-[415px]">
            <div className="flex flex-col grow mt-2 max-md:mt-10">
              <ScoreCard
                title="Document Score"
                score={16}
                information={[
                  {
                    title: 'Summary',
                    description:
                      'Extent to which the technology/product addresses the requirements of the 14 Critical Technology Areas defined by the US DoD.',
                  },
                  {
                    title: 'Feedback',
                    description:
                      'Extent to which the technology/product addresses the requirements of the 14 Critical Technology Areas defined by the US DoD.',
                  },
                ]}
              />
              <div className="flex gap-2 items-start mt-4 text-base max-h-[347px] overflow-scroll">
                <div className="flex flex-col grow shrink-0 self-start pt-7 bg-white rounded-3xl basis-0 w-fit">
                  <h3 className="self-start ml-4 text-sm font-semibold text-black max-md:ml-2.5">
                    Result Summary
                  </h3>
                  <ResultItem
                    title="Relevance to Critical Technology Areas"
                    score={16}
                    color="bg-orange-400"
                  />
                  <ResultItem
                    title="Impact and Value"
                    score={16}
                    color="bg-emerald-500"
                  />
                  <ResultItem
                    title="Innovation"
                    score={16}
                    color="bg-orange-300"
                  />
                  <ResultItem
                    title="Connection to U.S DoD Programs"
                    score={16}
                    color="bg-rose-500"
                  />
                </div>
              </div>
              <button className="justify-center items-center px-16 py-4 mt-2 text-sm text-center text-white bg-sky-500 rounded-lg border-2 border-sky-500 border-solid max-md:px-5">
                Download Assessment
              </button>
            </div>
          </aside>
        </div>
      </section>
      <section className="flex gap-5 pt-5 pr-3 pl-11 mt-4 bg-gray-50 rounded-3xl max-md:flex-wrap max-md:pl-5 max-h-[1023px]">
        <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
          <nav className="flex gap-5 self-center  text-sm bg-white rounded-md border border-solid border-zinc-100 max-md:flex-wrap ">
            <div className="flex flex-1  max-md:justify-between">
              <button className="justify-center px-7 py-2.5 text-white whitespace-nowrap bg-sky-500 rounded-md border border-sky-500 border-solid max-md:px-5">
                Assessment
              </button>
              <button className="justify-center px-7 py-2.5 border-r border-solid border-neutral-100 text-zinc-500 max-md:px-5 md:whitespace-nowrap">
                Rating Scale
              </button>
            </div>
            <div className="flex flex-1  gap-5 justify-between my-auto text-zinc-500 md:whitespace-nowrap">
              <button className="px-7 py-2.5">Document Properties</button>
              <button className="px-7 py-2.5">Comments</button>
            </div>
          </nav>

          <AssessmentCriteria
            assessments={[
              {
                criteria: 'Compliance with the Rubric',
                score: 16,
                weightage: '50%',
                justification:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
              },
              {
                criteria: 'Compliance with the Rubric',
                score: 16,
                weightage: '50%',
                justification:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
              },
              {
                criteria: 'Compliance with the Rubric',
                score: 16,
                weightage: '50%',
                justification:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
              },
              {
                criteria: 'Compliance with the Rubric',
                score: 16,
                weightage: '50%',
                justification:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
              },
              {
                criteria: 'Compliance with the Rubric',
                score: 16,
                weightage: '50%',
                justification:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
              },
              {
                criteria: 'Compliance with the Rubric',
                score: 16,
                weightage: '50%',
                justification:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
              },
              {
                criteria: 'Compliance with the Rubric',
                score: 16,
                weightage: '50%',
                justification:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
              },
              {
                criteria: 'Compliance with the Rubric',
                score: 16,
                weightage: '50%',
                justification:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
              },
              {
                criteria: 'Compliance with the Rubric',
                score: 16,
                weightage: '50%',
                justification:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}

export default DocumentPage;
