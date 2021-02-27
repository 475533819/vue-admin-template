import request from '@/utils/request'

export function getAnalysisList(params) {
  return request({
    url: '/analysis/getPage',
    method: 'get',
    params
  })
}
