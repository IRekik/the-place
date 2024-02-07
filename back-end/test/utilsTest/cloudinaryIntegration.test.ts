import { v2 as cloudinary } from "cloudinary";
import uploadBase64Image from "../../src/utils/cloudinaryIntegration";

jest.mock("cloudinary");

describe("uploadBase64Image", () => {
  const base64Image = "base64-encoded-image";
  const mockApiResponse = {
    public_id: "sample_public_id",
    version: 1,
    signature: "sample_signature",
    width: 800,
    height: 600,
    format: "jpg",
    resource_type: "image",
    created_at: "2022-01-01T12:00:00Z",
    tags: ["sample_tag"],
    pages: 1,
    bytes: 1024,
    type: "upload",
    etag: "sample_etag",
    placeholder: false,
    url: "https://sample-url.com/image.jpg",
    secure_url: "https://secure-url.com/image.jpg",
    access_mode: "public",
    original_filename: "sample_image.jpg",
    moderation: [],
    access_control: [],
    context: {},
    metadata: {},
    colors: [["#ffffff", 1]],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should upload a base64 image and return the URL", async () => {
    (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(
      mockApiResponse
    );

    const result = await uploadBase64Image(base64Image);

    expect(cloudinary.uploader.upload).toHaveBeenCalledWith(base64Image, {});

    expect(result).toEqual(mockApiResponse.url);
  });

  it("should handle upload failure and throw an error", async () => {
    (cloudinary.uploader.upload as jest.Mock).mockRejectedValue(
      new Error("Upload failed")
    );

    await expect(uploadBase64Image(base64Image)).rejects.toThrowError(
      "Upload failed"
    );
  });
});
