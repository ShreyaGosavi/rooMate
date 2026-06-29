import { Test, TestingModule } from "@nestjs/testing";
import { AdminHttpService } from "../admin.http.service";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";

const mockHttpService = {
  get: jest.fn(),
  patch: jest.fn(),
};

describe("AdminHttpService", () => {
  let service: AdminHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminHttpService,
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<AdminHttpService>(AdminHttpService);
    jest.clearAllMocks();
  });

  describe("get", () => {
    it("should call httpService.get with correct headers and return data", async () => {
      mockHttpService.get.mockReturnValue(of({ data: { results: [] } }));

      const result = await service.get(
        "http://localhost:3003/api/listings",
        "test-token",
      );

      expect(mockHttpService.get).toHaveBeenCalledWith(
        "http://localhost:3003/api/listings",
        expect.objectContaining({
          headers: { Authorization: "Bearer test-token" },
        }),
      );
      expect(result).toEqual({ results: [] });
    });

    it("should pass params when provided", async () => {
      mockHttpService.get.mockReturnValue(of({ data: [] }));

      await service.get("http://localhost:3003/api/listings", "token", {
        status: "PENDING",
      });

      expect(mockHttpService.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ params: { status: "PENDING" } }),
      );
    });
  });

  describe("patch", () => {
    it("should call httpService.patch with correct headers and return data", async () => {
      mockHttpService.patch.mockReturnValue(of({ data: { success: true } }));

      const result = await service.patch(
        "http://localhost:3003/api/listings/123/verify",
        "test-token",
        { status: "VERIFIED" },
      );

      expect(mockHttpService.patch).toHaveBeenCalledWith(
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
