'use client';

import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

export function DocumentDropDown({
  currentDocument,
  documents,
}: {
  currentDocument: any;
  documents: any;
}) {
  const { displayedItems, hasMore, loadingRef } = useInfiniteScroll<any>(
    documents,
    {
      itemsPerBatch: 1000, // adjust in production
      loadingDelay: 500,
    }
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>{currentDocument.name}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-60 overflow-auto">
        {displayedItems.map((doc: any) => (
          <Link
            key={doc.id}
            href={`/projects/${currentDocument.project.id}/${doc.id}`}
          >
            <DropdownMenuRadioItem value={doc.name} className="px-3">
              {doc.name}
            </DropdownMenuRadioItem>
          </Link>
        ))}
        {/* {hasMore && (
          <div ref={loadingRef} className="flex justify-center py-2">
            <Loader className="text-secondary w-8" />
          </div>
        )} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
