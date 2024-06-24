'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { revalidateRouter } from '@/actions';
import { apiUrl } from '@/lib/utils';

export function FileUpload({ projectId }: { projectId: number }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error'
  >('idle');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const bodyContent = new FormData();
    bodyContent.append('file', selectedFile);

    setUploadStatus('uploading');

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL_CLIENT || apiUrl
        }/v1/documents/upload/${projectId}/`,
        {
          method: 'POST',
          body: bodyContent,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text();

      setUploadStatus('success');

      revalidateRouter(`/projects/${projectId}`);
    } catch (error) {
      setUploadStatus('error');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="justify-center px-12 py-4 bg-sky-100 rounded-md border border-sky-500 border-solid max-md:px-5">
          Upload More Data
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>
            Make sure that the file is MAXIMUM 10MB.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="file" className="text-right">
            File
          </Label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="col-span-3"
            accept=".pdf"
          />
        </div>
        <DialogFooter>
          <div className="flex flex-col">
            <Button
              className='bg-sky-500'
              type="button"
              onClick={handleSubmit}
              disabled={uploadStatus === 'uploading'}
            >
              {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload'}
            </Button>
            {uploadStatus === 'success' && (
              <div className="text-green-500">File uploaded successfully!</div>
            )}
            {uploadStatus === 'error' && (
              <div className="text-red-500">
                Error uploading file. Please try again.
              </div>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
