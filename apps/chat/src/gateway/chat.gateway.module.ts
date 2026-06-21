import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ChatGateway } from "./chat.gateway";
import { MessageModule } from "../message/message.module";
import { ConversationModule } from "../conversation/conversation.module";

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET ?? "secret" }),
    MessageModule,
    ConversationModule,
  ],
  providers: [ChatGateway],
})
export class ChatGatewayModule {}
