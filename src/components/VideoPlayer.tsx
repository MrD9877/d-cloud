import { PauseIcon, PlayIcon } from "lucide-react";
import { useRef, useState } from "react";

export default function VideoPlayerCarousel({ url, rotateDeg }: { url: string; rotateDeg: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);
  const [focus, setFocus] = useState(false);
  const timer = useRef<NodeJS.Timeout>(null);
  const playVideo = async () => {
    await videoRef.current?.play();
    setPlay(true);
  };
  const pauseVideo = async () => {
    videoRef.current?.pause();
    setPlay(false);
  };

  const toggleFocus = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setFocus(true);
    timer.current = setTimeout(() => {
      setFocus(false);
    }, 1500);
  };
  return (
    <div className="relative  mx-auto flex justify-center items-center bg-black">
      {(!play || focus) && (
        <div className="absolute flex justify-center items-center bg-black/45 w-full h-full z-10">
          {play ? (
            <button onClick={pauseVideo}>
              <PauseIcon fill="white" stroke="white" />
            </button>
          ) : (
            <button onClick={playVideo}>
              <PlayIcon fill="white" stroke="white" />
            </button>
          )}
        </div>
      )}
      <video ref={videoRef} width={1000} height={1000} src={url} style={{ rotate: `${rotateDeg}deg` }} controls className=" w-full h-full object-contain rounded-lg" onEnded={pauseVideo} onPointerUp={toggleFocus} />
    </div>
  );
}
