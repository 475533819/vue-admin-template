const Mock = require('mockjs')

const data = Mock.mock({
  'items|1000': [{
    id: '@increment',
    name: '@sentence(4, 10)',
    'status|1': ['published', 'draft', 'deleted'],
    createName: 'name',
    updateTime: '@datetime',
    pageviews: '@integer(300, 5000)',
    views: '@integer(1, 999)',
    queuePlace: '@integer(0,2)'
  }],
  'list|1000': [{
    id: '@increment',
    name: '@sentence(4, 10)',
    'status|1': ['published', 'draft', 'deleted'],
    createName: 'name',
    updateTime: '@datetime',
    views: '@integer(1, 999)',
    type: '@integer(0,3)',
    inBoard: '@integer(1,10)'
  }]
})

module.exports = [
  {
    url: '/board/getPage',
    type: 'get',
    response: config => {
      const { importance, type, title, pageNum = 1, pageSize = 10, sort } = config.query

      let mockList = data.items.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/analysis/getPage',
    type: 'get',
    response: config => {
      const { importance, type, title, pageNum = 1, pageSize = 10 } = config.query

      const mockList = data.list.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      const pageList = mockList.filter((item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  }
]
