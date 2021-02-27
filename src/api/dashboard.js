import request from '@/utils/request'

export function getBoardList(params) {
  return request({
    url: '/board/getPage',
    method: 'get',
    params
  })
}
