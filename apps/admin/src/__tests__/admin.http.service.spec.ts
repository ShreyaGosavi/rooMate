import { Test, TestingModule } from "@nestjs/testing";
import { AdminHttpService } from "../admin.http.service";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AdminHttpService", () => {
  let service: AdminHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminHttpService],
    }).compile();
    service = module.get<AdminHttpService>(AdminHttpService);
    jest.clearAllMocks();
  });

  describe("get", () => {
    it("should call axios.get with correct headers and return data", async () => {
      mockedAxios.get.mockResolvedValue({ data: { results: [] } });
      const result = await service.get(
        "http://localhost:3003/api/listings",
        "test-token",
      );
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:3003/api/listings",
        expect.objectContaining({
          headers: { Authorization: "Bearer test-token" },
        }),
      );
      expect(result).toEqual({ results: [] });
    });

    it("should pass params when provided", async () => {
      mockedAxios.get.mockResolvedValue({ data: [] });
      await service.get("http://localhost:3003/api/listings", "token", {
        status: "PENDING",
      });
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ params: { status: "PENDING" } }),
      );
    });
  });

  describe("patch", () => {
    it("should call axios.patch with correct headers and return data", async () => {
      mockedAxios.patch.mockResolvedValue({ data: { success: true } });
      const result = await service.patch(
        "http://localhost:3003/api/listings/123/verify",
        "test-token",
        { status: "VERIFIED" },
      );
      expect(mockedAxios.patch).toHaveBeenCalledWith(
        "http://localhost:3003/api/listings/123/verify",
        { status: "VERIFIED" },
        expect.objectContaining({
          headers: { Authorization: "Bearer test-token" },
        }),
      );
      expect(result).toEqual({ success: true });
    });
  });
});
