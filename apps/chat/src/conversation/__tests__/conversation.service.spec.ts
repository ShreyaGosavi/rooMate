import { Test, TestingModule } from "@nestjs/testing";
import { ConversationService } from "../conversation.service";
import { getModelToken } from "@nestjs/mongoose";
import { Conversation } from "../conversation.schema";
import { Message } from "../../message/message.schema";
import { NotFoundException, ForbiddenException } from "@nestjs/common";

const mockConversation = {
  _id: "conv-1",
  participant1Id: "user-1",
  participant2Id: "user-2",
  lastMessage: null,
  lastMessageAt: null,
};

const mockConversationModel = {
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
  findByIdAndUpdate: jest.fn(),
};

const mockMessageModel = {
  deleteMany: jest.fn(),
};

describe("ConversationService", () => {
  let service: ConversationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationService,
        {
          provide: getModelToken(Conversation.name),
          useValue: mockConversationModel,
        },
        { provide: getModelToken(Message.name), useValue: mockMessageModel },
      ],
    }).compile();

    service = module.get<ConversationService>(ConversationService);
    jest.clearAllMocks();
  });

  describe("getOrCreate", () => {
    it("should return existing conversation", async () => {
      mockConversationModel.findOne.mockResolvedValue(mockConversation);
      const result = await service.getOrCreate("user-1", "user-2");
      expect(result).toEqual(mockConversation);
      expect(mockConversationModel.create).not.toHaveBeenCalled();
    });

    it("should create new conversation if none exists", async () => {
      mockConversationModel.findOne.mockResolvedValue(null);
      mockConversationModel.create.mockResolvedValue(mockConversation);
      const result = await service.getOrCreate("user-1", "user-2");
      expect(result).toEqual(mockConversation);
      expect(mockConversationModel.create).toHaveBeenCalled();
    });

    it("should normalize participant order", async () => {
      mockConversationModel.findOne.mockResolvedValue(null);
      mockConversationModel.create.mockResolvedValue(mockConversation);
      await service.getOrCreate("user-2", "user-1");
      expect(mockConversationModel.findOne).toHaveBeenCalledWith({
        participant1Id: "user-1",
        participant2Id: "user-2",
      });
    });
  });

  describe("getMyConversations", () => {
    it("should return conversations for a user", async () => {
      const sortMock = jest.fn().mockResolvedValue([mockConversation]);
      mockConversationModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({ exec: sortMock }),
      });
      const result = await service.getMyConversations("user-1");
      expect(result).toEqual([mockConversation]);
    });
  });

  describe("deleteConversation", () => {
    it("should delete conversation and messages if user is participant", async () => {
      mockConversationModel.findById.mockResolvedValue(mockConversation);
      mockMessageModel.deleteMany.mockResolvedValue({});
      mockConversationModel.findByIdAndDelete.mockResolvedValue({});

      const result = await service.deleteConversation("conv-1", "user-1");
      expect(result).toEqual({ deleted: true });
      expect(mockMessageModel.deleteMany).toHaveBeenCalledWith({
        conversationId: "conv-1",
      });
    });

    it("should throw NotFoundException if conversation not found", async () => {
      mockConversationModel.findById.mockResolvedValue(null);
      await expect(
        service.deleteConversation("bad-id", "user-1"),
      ).rejects.toThrow(NotFoundException);
    });

    it("should throw ForbiddenException if user is not participant", async () => {
      mockConversationModel.findById.mockResolvedValue(mockConversation);
      await expect(
        service.deleteConversation("conv-1", "user-3"),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
