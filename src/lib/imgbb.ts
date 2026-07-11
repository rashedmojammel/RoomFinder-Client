const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

export async function uploadImageToImgbb(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error("Missing NEXT_PUBLIC_IMGBB_API_KEY environment variable");
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${IMGBB_UPLOAD_URL}?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const json = await res.json();

  if (!res.ok || !json?.success) {
    throw new Error(json?.error?.message || "Image upload failed");
  }

  return json.data.url as string;
}