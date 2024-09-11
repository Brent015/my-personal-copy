import { Image } from "antd";
import { useState, useEffect } from "react";

// New Image Preview Component
const ImagePreview: React.FC<{ file: File }> = ({ file }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    return () => {
      reader.abort();
    };
  }, [file]);

  if (!preview) {
    return null;
  }

  return (
    <Image
      src={preview}
      alt={file.name}
      style={{ width: "100%", height: "100px", objectFit: "cover" }}
    />
  );
};

export default ImagePreview;
