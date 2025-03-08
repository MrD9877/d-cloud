import SelectDropDown from "@/components/SelectDropDown";
import { AlignJustify, CheckCircle2, Trash2 } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import DeletePromt from "./DeletePromt";
import { ViewFilesBTNPropsType } from "@/app/files/[type]/page";

export type ViewStateType = {
  view: number;
  setView: React.Dispatch<React.SetStateAction<number>>;
};

type TopFilesNavType = {
  loadImage?: boolean;
  setViewSelect: React.Dispatch<React.SetStateAction<boolean>>;
  viewSelectBox: boolean;
  ViewFilesBTNProps?: ViewFilesBTNPropsType;
};

function ViewFilesBTN({ ViewFilesBTNProps, viewSelectBox }: { viewSelectBox: boolean; ViewFilesBTNProps: ViewFilesBTNPropsType | undefined }) {
  if (!ViewFilesBTNProps) return <></>;
  const { view, setView, selected, setSelected } = ViewFilesBTNProps;
  return (
    <div>
      {viewSelectBox ? (
        <DeletePromt urls={selected}>
          <Trash2 stroke="red" />
        </DeletePromt>
      ) : (
        <>{view && setView && <SelectDropDown setView={setView} view={view} />}</>
      )}
    </div>
  );
}

function UploadFilesBTN({ viewSelectBox }: { viewSelectBox: boolean }) {
  return (
    <>
      {viewSelectBox && (
        <DeletePromt urls={[]}>
          <Trash2 stroke="red" />
        </DeletePromt>
      )}
    </>
  );
}

export function TopFilesNav({ ViewFilesBTNProps, loadImage = false, viewSelectBox, setViewSelect }: TopFilesNavType & Partial<ViewStateType>) {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="w-screen h-12 mb-4">
      <div className="w-screen px-4 h-12 flex  items-center justify-between fixed top-0 z-10 bg-white">
        <button onClick={() => toggleSidebar()}>
          <AlignJustify className="h-[30px] w-[30px]" />
        </button>
        {loadImage ? <ViewFilesBTN viewSelectBox={viewSelectBox} ViewFilesBTNProps={ViewFilesBTNProps} /> : <UploadFilesBTN viewSelectBox={viewSelectBox} />}
        <CheckCircle2 fill={viewSelectBox ? "brown" : "none"} stroke={viewSelectBox ? "white" : "black"} onClick={() => setViewSelect((pre: boolean) => !pre)} />
      </div>
    </div>
  );
}
