import * as React from "react";
import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { uploadImageBase64 } from "@/lib/uploadImageBase64";

export const ImageUploadNode: React.FC<NodeViewProps> = (props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    try {
      const url = await uploadImageBase64(file);
      const filename = file.name.replace(/\.[^/.]+$/, "") || "image";

      props.updateAttributes({
        src: url,
        alt: filename,
        title: filename,
      });
    } catch (error) {
      console.error("Base64 Upload Error:", error);
    }
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) await handleUpload(file);
  };

  return (
    <NodeViewWrapper className="tiptap-image-upload" tabIndex={0}>
      {!props.node.attrs.src && (
        <div onClick={() => inputRef.current?.click()} style={{
          cursor: "pointer",
          padding: "10px",
          border: "1px dashed gray",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: "none" }}
          />
          <p>Click to upload an image</p>
        </div>
      )}

      {props.node.attrs.src && (
        <img
          src={props.node.attrs.src}
          alt={props.node.attrs.alt || ""}
          style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", marginTop: "10px" }}
        />
      )}
    </NodeViewWrapper>
  );
};
