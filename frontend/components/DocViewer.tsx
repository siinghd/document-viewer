'use client';

import { useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

export default function DocViewer({ id }: { id: number }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = (entries: any) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  };

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, (numPages ?? 1) - 1));
  };
  return (
    <div className="Example max-h-[813px] overflow-y-scroll">
      <div ref={setContainerRef}>
        <Document
          file={`${process.env.NEXT_PUBLIC_API_URL}/v1/documents/${id}/file`}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          <Page
            key={`page_${currentPage + 1}`}
            pageNumber={currentPage + 1}
            width={
              containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
            }
          >
            <div className="z-20 absolute flex items-center justify-between rounded-3xl bg-black bg-opacity-50 max-md:px-5 top-2 left-2 ">
              <button
                disabled={currentPage === 0}
                onClick={goToPreviousPage}
                className="p-3 rounded-l-full  bg-opacity-75 text-white hover:bg-opacity-100 transition-opacity duration-300 "
              >
                &lt;
              </button>

              <span className="px-2  py-3.5 ">
                {currentPage + 1} of {numPages}
              </span>

              <button
                disabled={currentPage === (numPages ?? 1) - 1}
                onClick={goToNextPage}
                className="p-3 rounded-r-full  bg-opacity-75 text-white hover:bg-opacity-100 transition-opacity duration-300"
              >
                &gt;
              </button>
            </div>
          </Page>
        </Document>
      </div>
    </div>
  );
}
