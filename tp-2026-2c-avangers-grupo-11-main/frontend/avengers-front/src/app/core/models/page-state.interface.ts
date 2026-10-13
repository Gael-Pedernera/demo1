export type PageStatus = 'loading' | 'empty' | 'data' | 'error';
export interface PageState {
  status: PageStatus;
  error: string | null;
  errorCode?: string | null;
}
