'use client';

import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export function DocumentDropDown({
  currentDocument,
  documents,
}: {
  currentDocument: any;
  documents: any;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>{currentDocument.name}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {documents.map((doc: any) => (
          <Link
            key={doc.id}
            href={`/projects/${currentDocument.project.id}/${doc.id}`}
          >
            <DropdownMenuRadioItem value={doc.name} className="px-3">
              {doc.name}
            </DropdownMenuRadioItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
