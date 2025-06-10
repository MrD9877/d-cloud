import SelectDropDown from "@/components/SelectDropDown";
import { AlignJustify, CheckCircle2, Trash2 } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import DeletePromt from "./DeletePromt";
import { setViewSelect } from "@/utility/reduxFn";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/Silce";
import DownloadButton from "./DownLoadBtn";

export type ViewStateType = {
  view: number;
  setView: React.Dispatch<React.SetStateAction<number>>;
};

function ViewFilesBTN() {
  const { viewSelectBox, selected, fileType } = useSelector((state: StoreState) => state);

  return (
    <div>
      {viewSelectBox ? (
        <div className="flex justify-between gap-8 items-center">
          <DownloadButton urls={selected} fileType={fileType} />

          <DeletePromt urls={selected}>
            <Trash2 stroke="red" />
          </DeletePromt>
        </div>
      ) : (
        <>{<SelectDropDown />}</>
      )}
    </div>
  );
}

function UploadFilesBTN() {
  const { viewSelectBox, selected } = useSelector((state: StoreState) => state);

  return (
    <>
      {viewSelectBox && (
        <DeletePromt urls={selected}>
          <Trash2 stroke="red" />
        </DeletePromt>
      )}
    </>
  );
}

export function TopFilesNav() {
  const { toggleSidebar } = useSidebar();
  const { viewSelectBox, download } = useSelector((state: StoreState) => state);

  return (
    <div className="w-full h-12 mb-4 md:flex justify-end relative">
      <div className="w-full  px-4 h-12 flex  items-center justify-between fixed top-0 z-10 bg-white md:w-[28rem] lg:w-[42rem]">
        <button onClick={() => toggleSidebar()} className="md:invisible">
          <AlignJustify className="h-[30px] w-[30px]" />
        </button>
        {download ? <ViewFilesBTN /> : <UploadFilesBTN />}
        <CheckCircle2 fill={viewSelectBox ? "brown" : "none"} stroke={viewSelectBox ? "white" : "black"} onClick={() => setViewSelect(!viewSelectBox)} />
      </div>
    </div>
  );
}
