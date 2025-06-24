// lib/uploadImageBase64.ts
export async function uploadImageBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result); // ✅ base64 image string
      } else {
        reject("Failed to convert image to base64");
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
