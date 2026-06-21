import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MessageService } from "../message/message.service";
import { ConversationService } from "../conversation/conversation.service";

@WebSocketGateway({
  cors: { origin: "*" },
  namespace: "/chat",
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly messageService: MessageService,
    private readonly conversationService: ConversationService,
  ) {}

  handleConnection(client: Socket) {
    try {
      const token =
        (client.handshake.auth["token"] as string) ??
        (client.handshake.headers["authorization"] as string)?.replace(
          "Bearer ",
          "",
        );

      const payload = this.jwtService.verify<{ sub: string }>(token, {
        secret: process.env.JWT_SECRET ?? "secret",
      });

      client.data.userId = payload.sub;
      this.logger.log(`Client connected: ${payload.sub}`);
    } catch {
      this.logger.warn("Unauthorized WebSocket connection — disconnecting");
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.data.userId as string}`);
  }

  @SubscribeMessage("join")
  handleJoin(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    void client.join(data.conversationId);
    this.logger.log(
      `User ${client.data.userId as string} joined room ${data.conversationId}`,
    );
    return { event: "joined", data: data.conversationId };
  }

  @SubscribeMessage("message")
  async handleMessage(
    @MessageBody() data: { conversationId: string; text: string },
    @ConnectedSocket() client: Socket,
  ) {
    const senderId = client.data.userId as string;

    const message = await this.messageService.createMessage(
      data.conversationId,
      senderId,
      data.text,
    );

    await this.conversationService.updateLastMessage(
      data.conversationId,
      data.text,
    );

    this.server.to(data.conversationId).emit("message", {
      _id: message._id,
      conversationId: data.conversationId,
      senderId,
      text: data.text,
      read: false,
      createdAt: (message as any).createdAt,
    });

    return message;
  }
}
