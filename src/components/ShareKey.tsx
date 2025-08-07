import React, { useActionState, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CheckBox from "./ui/CheckBox";
import ExpireInPicker from "./ExpireInPicker";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import ShareURLComponent from "./ShareURLComponent";
import { createBundlerAuthKey } from "@/app/actions/bundlers/key";

type ShareKeyType = { triggerShareRef: React.RefObject<HTMLButtonElement | null>; bundlerId: string | undefined };
type KeyData = {
  key: string | undefined;
  view: boolean;
  upload: boolean;
};
export default function ShareKey({ triggerShareRef, bundlerId }: ShareKeyType) {
  const [keyData, setKeyData] = useState<KeyData>();
  const [shareData, submitAction, isPending] = useActionState(async (previousState: unknown, formData: FormData) => {
    const data = Object.fromEntries(formData);
    const expiresIn = data.expiresIn;
    const view = data["Media Access"];
    const upload = data["Upload Access"];
    if (!bundlerId) return null;
    try {
      const res = await createBundlerAuthKey({ bundlerId, expiresIn: Number(expiresIn), read: view === "on", write: upload === "on" });
      console.log(res);
      if (res.error) {
        toast(res.error);
      } else {
        return { key: res.body?.key, view: view === "on", upload: upload === "on" };
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  }, null);

  useEffect(() => {
    if (shareData) setKeyData(shareData);
  }, [shareData]);

  return (
    <div>
      <Dialog onOpenChange={() => setKeyData(undefined)}>
        <DialogTrigger ref={triggerShareRef}></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Bundler Access</DialogTitle>
          </DialogHeader>
          <div className=" max-w-md bg-white rounded-lg shadow-md p-6  border-black border">
            {keyData && keyData.key ? (
              <ShareURLComponent shareData={keyData} />
            ) : (
              <form className="flex flex-col" action={submitAction}>
                <ExpireInPicker />
                <div className=" flex w-full justify-between text-sm">
                  <CheckBox name="Media Access" />
                  <CheckBox name="Upload Access" />
                </div>
                <button disabled={isPending} className="font-bold py-2 px-4 rounded-md mt-4 bg-blue-600 text-white flex gap-2 items-center justify-center" type="submit">
                  {!isPending ? (
                    "Generate Key"
                  ) : (
                    <>
                      Working
                      <Loader2Icon className="animate-spin w-fit h-fit" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
