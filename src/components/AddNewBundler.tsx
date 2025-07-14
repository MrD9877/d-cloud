"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useActionState } from "react";
import CheckBox from "./ui/CheckBox";
import { toast } from "sonner";
import { addBundler } from "@/app/actions/bundlers/user";

type AddBundlerType = { triggerRef: React.RefObject<HTMLButtonElement | null>; initData: () => Promise<void> };

export default function AddNewBundler({ triggerRef, initData }: AddBundlerType) {
  const [error, submitAction, isPending] = useActionState(async (previousState: unknown, formData: FormData) => {
    const data = Object.fromEntries(formData);
    const name = data.name as string;
    const videoPermission = data["Allow video"] as "on" | undefined;
    const imagePermission = data["Allow image"] as "on" | undefined;
    try {
      const res = await addBundler(name, !!videoPermission, !!imagePermission);
      if (res) {
        await initData();
      } else {
        toast("Error Operation unsuccessfull");
      }
      triggerRef.current?.click();
      console.log(res);
    } catch (err) {
      console.log(err);
      toast("Error Operation unsuccessfull");
    }
    return null;
  }, null);

  void error;

  return (
    <>
      <Dialog>
        <DialogTrigger ref={triggerRef}></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Bundler</DialogTitle>
          </DialogHeader>
          <div className=" max-w-md bg-white rounded-lg shadow-md p-6  border-black border">
            <form className="flex flex-col" action={submitAction}>
              <input placeholder="Bundler Name" className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" name="name" />
              <div className=" flex w-full justify-between">
                <CheckBox name="Allow video" />
                <CheckBox name="Allow image" />
              </div>
              <button disabled={isPending} className="font-bold py-2 px-4 rounded-md mt-4 bg-blue-600 text-white " type="submit">
                Create
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
