auth:
	cd apps/auth && npx ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/main.ts

listing:
	cd apps/listing && npx ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/main.ts

community:
	cd apps/community && npx ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/main.ts

chat:
	cd apps/chat && npx ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/main.ts

notification:
	cd apps/notification && npx ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/main.ts

admin:
	cd apps/admin && npx ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/main.ts

gateway:
	cd apps/gateway && npx ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/main.ts

web:
	cd apps/web && npm run dev

infra:
	docker compose up postgres redis mongo zookeeper kafka -d
