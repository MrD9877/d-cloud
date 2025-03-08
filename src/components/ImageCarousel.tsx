import React, { useContext, useState } from "react";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Copy, RotateCw, Trash2 } from "lucide-react";
import Image from "next/image";
import DownloadButton from "./DownLoadBtn";
import VideoPlayerCarousel from "./VideoPlayer";
import DeletePromt from "./DeletePromt";
import { FileContext } from "./Gallery";
import { toast } from "sonner";

type Rotate = {
  [key: number]: number;
};
type ImageCarouselType = {
  children: React.ReactElement;
  index: number;
};

export default function ImageCarousel({ children, index }: ImageCarouselType) {
  const [rotateDeg, setRotate] = useState<Rotate>({});
  const files = useContext(FileContext);
  const rotateImg = (index: number) => {
    if (rotateDeg[index]) {
      setRotate({ ...rotateDeg, [index]: rotateDeg[index] + 90 });
    } else {
      setRotate({ ...rotateDeg, [index]: 90 });
    }
  };
  if (!files) return <>{children}</>;
  const { fileUrls, fileType, download } = files;

  const copyURL = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast("Success!!", { description: "Copy TO ClipBoard!!" });
    } catch {
      toast("Error!!", { description: "Fail To Copy!!" });
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <div className="hidden">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </div>
        <DialogContent className="flex justify-center items-center">
          <Carousel index={index} className="w-full mx-auto mt-4">
            <CarouselContent className="min-h-[100vw]">
              {fileUrls.map((url, index) => {
                const piptype = fileType === "image" ? "png" : "mp4";
                return (
                  <CarouselItem key={index || 0}>
                    <div className="w-full h-[6%] flex justify-between px-4 my-2">
                      <button onClick={() => rotateImg(index)}>
                        <RotateCw />
                      </button>
                      {download && (
                        <div className="flex gap-4">
                          <DownloadButton imageUrl={url} fileName={`d-cloud-download-${fileType}-${index}.${piptype}`} />
                          <Copy onClick={() => copyURL(url)} />
                          <DeletePromt urls={[url]}>
                            <Trash2 stroke="red" />
                          </DeletePromt>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center items-center bg-black h-[90%] w-full rounded-lg overflow-clip">{fileType === "video" ? <VideoPlayerCarousel index={index} rotateDeg={rotateDeg} key={index} url={url} /> : <Image style={{ rotate: rotateDeg && (rotateDeg[index] ? `${rotateDeg[index]}deg` : "0deg") }} width={1000} height={1000} src={url} alt="Uploaded" className=" w-full h-full object-contain rounded-lg " />}</div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
}
