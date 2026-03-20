export const environment = {
  production: false,
  useMockAuth: true,  // Use mock auth in development (no backend needed)
  apiUrl: 'http://localhost:8080',
  graphqlUrl: 'http://localhost:8080/graphql',
  wsUrl: 'ws://localhost:8080/ws/graphql',
  refreshTokenInterval: 5 * 60 * 1000, // 5 minutes
};
