import { apiUrl } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export const dynamic = 'force-dynamic'; // for docker else use revalidate

const page = async () => {
  const document = await fetch(
    `${apiUrl}/v1/projects`
  );
  const json = await document.json();

  return (
    <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-3 md:p-6">
      {json.map((project: { name: string; id: number }) => (
        <div
          className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2"
          key={project.id}
        >
          <Link
            href={`/projects/${project.id}`}
            className="absolute inset-0 z-10"
            prefetch={false}
          >
            <span className="sr-only">View Project</span>
          </Link>
          <div className="p-4 bg-background">
            <h3 className="text-lg font-semibold md:text-xl">
              <Link
                href={`/projectss/${project.id}`}
                className="hover:underline"
                prefetch={false}
              >
                {project.name}
              </Link>
            </h3>
          </div>
        </div>
      ))}
    </section>
  );
};

export default page;
