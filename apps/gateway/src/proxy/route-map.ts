export interface ServiceRoute {
  prefix: string;
  serviceUrlEnvKey: string;
}

export const ROUTE_MAP: ServiceRoute[] = [
  { prefix: 'auth', serviceUrlEnvKey: 'AUTH_SERVICE_URL' },
];
