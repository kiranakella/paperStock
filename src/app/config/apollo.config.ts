import { Provider } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../environments/environment';

export const apolloConfig = {
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache({
            typePolicies: {
              Query: {
                fields: {
                  portfolio: {
                    merge(existing: any, incoming: any) {
                      return incoming;
                    },
                  },
                  holdings: {
                    merge(existing: any, incoming: any) {
                      return incoming;
                    },
                  },
                  prices: {
                    merge(existing: any, incoming: any) {
                      return incoming;
                    },
                  },
                },
              },
            },
          }),
          link: httpLink.create({
            uri: environment.graphqlUrl,
          }),
          connectToDevTools: !environment.production,
        };
      },
      deps: [HttpLink],
    },
  ],
};
