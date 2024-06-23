import Footer from '@/components/Footer';
import ProjectDashboard from '@/components/ProjectDashboard';

import { getUpdatedUrl } from '@/lib/functions';

import { QueryParams, TabType } from '@/types';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

export const revalidate = 60;

const ProjectPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: QueryParams;
}) => {
  const project = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/projects/${params.id}`
  );
  const jsonProject = await project.json();
  if (jsonProject.detail) return redirect(`/projects`);

  let data;
  let stats;
  if (
    searchParams.tabType === undefined ||
    searchParams.tabType === TabType.dashboard
  ) {
    const [document, statsData] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/projects/${jsonProject.id}/documents`
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/projects/${jsonProject.id}/stats`
      ),
    ]);

    [data, stats] = await Promise.all([document.json(), statsData.json()]);
  }
  if (!data || !stats) {
    return redirect(`/projects`);
  }

  return (
    <div className="flex flex-col bg-white">
      <main className="flex flex-col items-start self-center px-7 pt-7 pb-20 mt-4 max-w-full bg-gray-50 rounded-3xl w-[1300px] max-md:pr-5">
        <div className="flex gap-5 justify-between ml-3.5 w-full  max-md:flex-wrap">
          <h1 className="my-auto text-xl font-medium text-black">
            {jsonProject.name}
          </h1>
          <nav className="flex gap-5 justify-between text-sm whitespace-nowrap bg-white rounded-md border border-solid border-zinc-100">
            <div className="flex gap-0">
              <Link
                className={`justify-center px-7 py-2.5   rounded-l-md border  border-neutral-100 border-solid max-md:px-5 ${
                  searchParams.tabType === TabType.dashboard ||
                  !searchParams.tabType
                    ? 'bg-sky-500 border-sky-500 text-white'
                    : 'text-zinc-500'
                }`}
                href={getUpdatedUrl(
                  `/projects/${jsonProject.id}`,
                  searchParams,
                  {
                    tabType: TabType.dashboard,
                  }
                )}
              >
                Dashboard
              </Link>
              <Link
                className={`justify-center px-7 py-2.5 border-l border-r border-solid border-neutral-100  max-md:px-5 ${
                  searchParams.tabType === TabType.submissions
                    ? 'bg-sky-500 border-sky-500 text-white'
                    : 'text-zinc-500'
                }`}
                href={getUpdatedUrl(
                  `/projects/${jsonProject.id}`,
                  searchParams,
                  {
                    tabType: TabType.submissions,
                  }
                )}
              >
                Submissions
              </Link>
              <Link
                className={`justify-center px-7 py-2.5 rounded-r-md border-l border-solid border-neutral-100  max-md:px-5 ${
                  searchParams.tabType === TabType.settings
                    ? 'bg-sky-500 border-sky-500 text-white'
                    : 'text-zinc-500'
                }`}
                href={getUpdatedUrl(
                  `/projects/${jsonProject.id}`,
                  searchParams,
                  {
                    tabType: TabType.settings,
                  }
                )}
              >
                Settings
              </Link>
            </div>
          </nav>
          <div></div>
        </div>
        {(searchParams.tabType === undefined ||
          searchParams.tabType === TabType.dashboard) && (
          <ProjectDashboard documents={data} stats={stats} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProjectPage;
