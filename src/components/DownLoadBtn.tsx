import { Download } from "lucide-react";

const DownloadButton = ({ imageUrl, fileName }: { imageUrl: string; fileName: string }) => {
  const downloadImage = async () => {
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

  // Example usage

  return (
    <button onClick={downloadImage}>
      <Download />
    </button>
  );
};

export default DownloadButton;
