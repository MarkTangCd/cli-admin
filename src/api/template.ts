import { ITemplate, ITemplateList } from '../typings/api'
import request from "../utils/request";

export async function getTemplateList(): Promise<ITemplateList> {
  return request.get('/template/list')
}

export async function createTemplate(template: ITemplate): Promise<string> {
  return request.post('/template/create', template)
}

export async function updateTemplate(template: ITemplate) {
  return request.post('/template/update', template)
}

export async function deleteTemplate(value: string): Promise<number> {
  return request.get(`/template/delete/${value}`)
}