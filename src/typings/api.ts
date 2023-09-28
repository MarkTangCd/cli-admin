export interface ITemplateList {
  count: number;
  list: ITemplate[];
}
export interface ITemplate {
  name: string;
  npmName: string;
  value: string;
  version: string;
  forceInstall: boolean;
}