import { setLoading, setSelected, setViewSelect } from "@/utility/reduxFn";
import { Download } from "lucide-react";
type DownBtn = { imageUrl?: string; fileName?: string; urls?: string[]; fileType?: string };
const DownloadButton = ({ imageUrl, fileName, urls, fileType }: DownBtn) => {
  const downloadImage = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl, {
        mode: "cors",
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "download.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  const downLoadFiles = async () => {
    if (urls && fileType) {
      setLoading(true);
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        console.log(url);
        const piptype = fileType === "image" ? "png" : "mp4";
        await downloadImage(url, `d-cloud-download-${fileType}-${url.slice(-10)}.${piptype}`);
      }
      setSelected([]);
      setViewSelect(false);
      setLoading(false);
    } else {
      if (imageUrl && fileName) downloadImage(imageUrl, fileName);
    }
  };

  // Example usage

  return (
    <button onClick={downLoadFiles}>
      <Download />
    </button>
  );
};

export default DownloadButton;
