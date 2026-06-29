#!/bin/bash
echo "Starting RooMate services..."

for port in 3001 3002 3003 3004 3005 3006 3007 3008; do
  kill $(lsof -ti:$port) 2>/dev/null
done
sleep 2

cd ~/Desktop/RooMate/apps/auth && npx ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/main.ts > /tmp/roomate-auth.log 2>&1 &
echo "auth started"

cd ~/Desktop/RooMate/apps/listing && npx prisma generate && npx ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/main.ts > /tmp/roomate-listing.log 2>&1 &
echo "listing started"

cd ~/Desktop/RooMate/apps/community && npx prisma generate && npx ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/main.ts > /tmp/roomate-community.log 2>&1 &
echo "community started"

cd ~/Desktop/RooMate/apps/chat && npx ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/main.ts > /tmp/roomate-chat.log 2>&1 &
echo "chat started"

cd ~/Desktop/RooMate/apps/notification && npx ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/main.ts > /tmp/roomate-notification.log 2>&1 &
echo "notification started"

cd ~/Desktop/RooMate/apps/admin && npx ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/main.ts > /tmp/roomate-admin.log 2>&1 &
echo "admin started"

cd ~/Desktop/RooMate/apps/gateway && npx ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/main.ts > /tmp/roomate-gateway.log 2>&1 &
echo "gateway started"

echo "All services starting. Logs in /tmp/roomate-*.log"
echo "Gateway: http://localhost:3007"
