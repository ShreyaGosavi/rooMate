import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { ConversationModule } from "./conversation/conversation.module";
import { MessageModule } from "./message/message.module";
import { ChatGatewayModule } from "./gateway/chat.gateway.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? "mongodb://localhost:27017/chat_db",
    ),
    AuthModule,
    ConversationModule,
    MessageModule,
    ChatGatewayModule,
  ],
})
export class AppModule {}
