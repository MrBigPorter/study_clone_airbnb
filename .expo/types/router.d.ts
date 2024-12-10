/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/messages` | `/(tabs)/profile` | `/(tabs)/trips` | `/(tabs)/wishlists` | `/_sitemap` | `/messages` | `/profile` | `/screens/home` | `/trips` | `/wishlists`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
