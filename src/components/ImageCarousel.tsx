import React, { useState } from "react";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { RotateCw, Trash2 } from "lucide-react";
import Image from "next/image";
import DownloadButton from "./DownLoadBtn";
import VideoPlayerCarousel from "./VideoPlayer";
import DeletePromt from "./DeletePromt";

type Rotate = {
  [key: number]: number;
};
type ImageCarouselType = {
  fileUrls: string[];
  children: React.ReactElement;
  index: number;
  fileType: string;
  dowload: boolean;
};

export default function ImageCarousel({ fileUrls, children, index, fileType, dowload }: ImageCarouselType) {
  const [rotateDeg, setRotate] = useState<Rotate>({});
  const [loading, setLoading] = useState(false);
  const rotateImg = (index: number) => {
    if (rotateDeg[index]) {
      setRotate({ ...rotateDeg, [index]: rotateDeg[index] + 90 });
    } else {
      setRotate({ ...rotateDeg, [index]: 90 });
    }
  };
  if (loading) return <>Loading...</>;
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
                      {dowload && (
                        <div className="flex gap-4">
                          <DeletePromt urls={[url]} setLoading={setLoading} fileType={fileType}>
                            <Trash2 stroke="red" />
                          </DeletePromt>
                          <DownloadButton imageUrl={url} fileName={`d-cloud-download-${fileType}-${index}.${piptype}`} />
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
