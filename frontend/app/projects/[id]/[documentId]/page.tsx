import AssessmentCriteria from '@/components/AssessmentCriteria';
import { DocumentDropDown } from '@/components/DocumentDropDown';
import DocViewer from '@/components/DocViewer';
import ResultItem from '@/components/ResultItem';
import ScoreCard from '@/components/ScoreCard';
import { getColorForScore } from '@/lib/utils';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { redirect } from 'next/navigation';
import * as React from 'react';

export const revalidate = 1;

const DocumentPage = async ({
  params,
}: {
  params: { id: string; documentId: string };
}) => {
  const document = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/documents/${params.documentId}`
  );
  const documentsProject = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/projects/${params.id}/documents?fields=id,name&limit=1000`
  );
  const data = await document.json();
  const projects = await documentsProject.json();

  if (data.detail) return redirect(`/projects/${params.id}`);
  return (
    <div className="flex flex-col bg-white">
      <main className="flex flex-col items-start self-center px-7 pt-7 pb-20 mt-4 max-w-full bg-gray-50 rounded-3xl w-[1300px] max-md:pr-5">
        <section className="py-5 pr-3 pl-6 bg-gray-50 rounded-3xl max-md:pl-5 w-full pb-16">
          <div className="flex gap-5 flex-col xl:flex-row max-md:gap-0">
            <div className="flex flex-col xl:w-[70%] max-md:ml-0 w-full">
              <div className="flex flex-col grow max-md:mt-9 max-md:max-w-full">
                <div className="flex gap-5 items-start self-start text-base text-zinc-700">
                  <h1 className="grow self-stretch">{data.project.name}</h1>

                  <ChevronRight className="h-6 w-6" />

                  <div className="flex gap-1.5 font-medium">
                    <DocumentDropDown
                      currentDocument={data}
                      documents={projects.documents.filter(
                        (doc: any) => doc.id !== data.id
                      )}
                    />
                    <ChevronDown className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex gap-2.5 mt-4 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex overflow-hidden relative flex-col grow shrink-0  text-base text-white basis-0 w-fit max-md:px-5 max-md:max-w-full">
                    <DocViewer id={data.id} />
                  </div>
                </div>
              </div>
            </div>
            <aside className="flex flex-col ml-5 max-md:ml-0 w-full xl:w-[30%] xlg:max-h-[415px]">
              <div className="flex flex-col grow mt-2 max-md:mt-10">
                <ScoreCard
                  title="Document Score"
                  score={data.overall_score}
                  information={[
                    {
                      title: 'Summary',
                      description: data.summary,
                    },
                    {
                      title: 'Feedback',
                      description: data.feedback,
                    },
                  ]}
                />
                <div className="flex gap-2 items-start mt-4 text-base max-h-[347px] overflow-scroll">
                  <div className="flex flex-col grow shrink-0 self-start pt-7 bg-white rounded-3xl basis-0 w-fit">
                    <h3 className="self-start ml-4 text-sm font-semibold text-black max-md:ml-2.5">
                      Result Summary
                    </h3>
                    {data.result_summary.map((result: any) => (
                      <ResultItem
                        key={result.name}
                        title={result.name}
                        score={result.score}
                        color={getColorForScore(result.score, 'bg')}
                      />
                    ))}
                  </div>
                </div>
                <button className="justify-center items-center px-16 py-4 mt-2 text-sm text-center text-white bg-sky-500 rounded-lg border-2 border-sky-500 border-solid max-md:px-5">
                  Download Assessment
                </button>
              </div>
            </aside>
          </div>
        </section>
        <section className="flex gap-5 pt-5 pr-3 pl-11 mt-4 bg-gray-50 rounded-3xl max-md:flex-wrap max-md:pl-5 max-h-[1023px] w-full">
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
                  criteria: data.assessment_data.criteria_1.name,
                  score: data.assessment_data.criteria_1.score,
                  weightage: `${(
                    data.assessment_data.criteria_1.weightage * 100
                  ).toFixed(2)}%`,
                  justification: data.assessment_data.criteria_1.justification,
                },
                {
                  criteria: data.assessment_data.criteria_2.name,
                  score: data.assessment_data.criteria_2.score,
                  weightage: `${(
                    data.assessment_data.criteria_2.weightage * 100
                  ).toFixed(2)}%`,
                  justification: data.assessment_data.criteria_2.justification,
                },
                {
                  criteria: data.assessment_data.criteria_3.name,
                  score: data.assessment_data.criteria_3.score,
                  weightage: `${(
                    data.assessment_data.criteria_3.weightage * 100
                  ).toFixed(2)}%`,
                  justification: data.assessment_data.criteria_3.justification,
                },
                {
                  criteria: data.assessment_data.criteria_4.name,
                  score: data.assessment_data.criteria_4.score,
                  weightage: `${(
                    data.assessment_data.criteria_4.weightage * 100
                  ).toFixed(2)}%`,
                  justification: data.assessment_data.criteria_4.justification,
                },
                {
                  criteria: data.assessment_data.criteria_5.name,
                  score: data.assessment_data.criteria_5.score,
                  weightage: `${(
                    data.assessment_data.criteria_5.weightage * 100
                  ).toFixed(2)}%`,
                  justification: data.assessment_data.criteria_5.justification,
                },
                {
                  criteria: data.assessment_data.criteria_6.name,
                  score: data.assessment_data.criteria_6.score,
                  weightage: `${(
                    data.assessment_data.criteria_6.weightage * 100
                  ).toFixed(2)}%`,
                  justification: data.assessment_data.criteria_6.justification,
                },
              ]}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default DocumentPage;
