declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const Component: DefineComponent<Record<string, any>>;
  export default Component;
}