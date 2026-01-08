export const uploadToCloudinarySigned = async (
  file: File,
  signatureData: {
    timestamp: number;
    signature: string;
    cloudName: string;
    apiKey: string;
  }
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signatureData.apiKey);
  formData.append("timestamp", signatureData.timestamp.toString());
  formData.append("signature", signatureData.signature);
  formData.append("folder", "hobhub/profiles");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Signed upload failed");
  }

  const data = await response.json();
  return data.secure_url;
};
