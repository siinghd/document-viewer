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

export function FileUpload({ projectId }: { projectId: number }) {
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
            Make sure that the file is MAXIUM 10MB.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="file" className="text-right">
            File
          </Label>
          <Input id="file" defaultValue="Pedro Duarte" className="col-span-3" />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
