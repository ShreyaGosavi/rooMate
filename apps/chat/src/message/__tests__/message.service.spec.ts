import { Test, TestingModule } from "@nestjs/testing";
import { MessageService } from "../message.service";
import { getModelToken } from "@nestjs/mongoose";
import { Message } from "../message.schema";
import { Conversation } from "../../conversation/conversation.schema";
import { NotFoundException, ForbiddenException } from "@nestjs/common";

const mockConversation = {
  _id: "conv-1",
  participant1Id: "user-1",
  participant2Id: "user-2",
};

const mockMessage = {
  _id: "msg-1",
  conversationId: "conv-1",
  senderId: "user-1",
  text: "Hello",
  read: false,
};

const mockMessageModel = {
  find: jest.fn(),
  countDocuments: jest.fn(),
  updateMany: jest.fn(),
  create: jest.fn(),
};

const mockConversationModel = {
  findById: jest.fn(),
};

describe("MessageService", () => {
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: getModelToken(Message.name), useValue: mockMessageModel },
        {
          provide: getModelToken(Conversation.name),
          useValue: mockConversationModel,
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    jest.clearAllMocks();
  });

  describe("getMessages", () => {
    it("should return messages for a conversation", async () => {
      mockConversationModel.findById.mockResolvedValue(mockConversation);
      const execMock = jest.fn().mockResolvedValue([mockMessage]);
      mockMessageModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({ exec: execMock }),
          }),
        }),
      });
      mockMessageModel.countDocuments.mockResolvedValue(1);

      const result = await service.getMessages("conv-1", "user-1");
      expect(result.total).toBe(1);
    });

    it("should throw NotFoundException if conversation not found", async () => {
      mockConversationModel.findById.mockResolvedValue(null);
      await expect(service.getMessages("bad-id", "user-1")).rejects.toThrow(
        NotFoundException,
      );
    });

    it("should throw ForbiddenException if user is not participant", async () => {
      mockConversationModel.findById.mockResolvedValue(mockConversation);
      await expect(service.getMessages("conv-1", "user-3")).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe("markAsRead", () => {
    it("should mark messages as read", async () => {
      mockMessageModel.updateMany.mockResolvedValue({});
      await service.markAsRead("conv-1", "user-2");
      expect(mockMessageModel.updateMany).toHaveBeenCalledWith(
        { conversationId: "conv-1", senderId: { $ne: "user-2" }, read: false },
        { read: true },
      );
    });
  });

  describe("createMessage", () => {
    it("should create a message", async () => {
      mockMessageModel.create.mockResolvedValue(mockMessage);
      const result = await service.createMessage("conv-1", "user-1", "Hello");
      expect(result).toEqual(mockMessage);
      expect(mockMessageModel.create).toHaveBeenCalledWith({
        conversationId: "conv-1",
        senderId: "user-1",
        text: "Hello",
      });
    });
  });
});
