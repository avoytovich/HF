import { T } from '../../index'
import { store } from '../../../index'
import {
  domen,
  api
} from '../../../config'
import { Api} from '../../../utils'

export const diagnosisQuestionCreate = (domenKey, apiKey, body, id) => {
  const domenPath = domen[domenKey];
  const apiPath   = api[apiKey];
  return id ?
    Api.post(`${domenPath}${apiPath}/${id}`, body):
    Api.post(`${domenPath}${apiPath}`, body);
};