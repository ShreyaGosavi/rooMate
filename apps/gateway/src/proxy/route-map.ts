export interface ServiceRoute {
  prefix: string;
  serviceUrlEnvKey: string;
}

export const ROUTE_MAP: ServiceRoute[] = [
  { prefix: 'auth', serviceUrlEnvKey: 'AUTH_SERVICE_URL' },
  { prefix: 'notifications', serviceUrlEnvKey: 'NOTIFICATION_SERVICE_URL' },
  { prefix: 'listings', serviceUrlEnvKey: 'LISTING_SERVICE_URL' },
];
