export enum TabType {
  dashboard = 'dashboard',
  submissions = 'submissions',
  settings = 'settings',
}

export interface QueryParams {
  limit?: number;
  page?: number;
  tabType?: TabType;
  search?: string;
  date?: string;
}
