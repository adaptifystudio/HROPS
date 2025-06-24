import { mergeAttributes, Node } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageUploadNode as ImageUploadNodeComponent } from "@/components/tiptap/tiptap-node/image-upload-node/image-upload-node";
import { uploadImageBase64 } from "@/lib/uploadImageBase64"; // ✅ fixed
import type { CommandProps } from "@tiptap/core";

export type UploadFunction = (
  file: File,
  onProgress?: (event: { progress: number }) => void,
  abortSignal?: AbortSignal
) => Promise<string>;

export interface ImageUploadNodeOptions {
  accept?: string;
  limit?: number;
  maxSize?: number;
  upload?: UploadFunction;
  onError?: (error: Error) => void;
  onSuccess?: (url: string) => void;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageUpload: {
      setImageUploadNode: (options?: ImageUploadNodeOptions) => ReturnType;
    };
  }
}

export const ImageUploadNode = Node.create<ImageUploadNodeOptions>({
  name: "imageUpload",

  group: "block",
  draggable: true,
  selectable: true,
  atom: true,

  addOptions() {
    return {
      accept: "image/*",
      limit: 1,
      maxSize: 0,
      upload: (file: File) => uploadImageBase64(file), // ✅ now base64 upload
      onError: undefined,
      onSuccess: undefined,
    };
  },

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      accept: { default: this.options.accept },
      limit: { default: this.options.limit },
      maxSize: { default: this.options.maxSize },
    };
  },

  parseHTML() {
    return [
      { tag: "img[src]" },
      { tag: 'div[data-type="image-upload"]' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(HTMLAttributes, { "data-type": "image-upload" }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadNodeComponent);
  },

  addCommands() {
    return {
      setImageUploadNode:
        (options = {}) =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { selection } = editor.state;
        const { nodeAfter } = selection.$from;

        if (
          nodeAfter &&
          nodeAfter.type.name === "imageUpload" &&
          editor.isActive("imageUpload")
        ) {
          const nodeEl = editor.view.nodeDOM(selection.$from.pos);
          if (nodeEl && nodeEl instanceof HTMLElement) {
            const firstChild = nodeEl.firstChild;
            if (firstChild && firstChild instanceof HTMLElement) {
              firstChild.click();
              return true;
            }
          }
        }
        return false;
      },
    };
  },
});

export default ImageUploadNode;
