/**
 * 事件分析
 */
export const eventForm = {
  status: 'draft',
  eventList: [
    {
      conditionList: [],
      eventIds: [],
      indicatorValue: [],
      key: Date.now()
    }
  ],
  conditionList: [],
  name: '',
  region: '',
  appList: [],
  viewType: '0',
  dimensionList: []
}

/**
 * 漏斗分析
 */
export const funelForm = {
  status: 'draft',
  name: '',
  appList: [],
  distinctValue: '',
  shareMode: 0,
  conditionList: [],
  eventList: [
    {
      eventIds: [],
      key: Date.now()
    }
  ],
  contrastType: '',
  dimension: [],
  viewType: '0'
}

/**
 * 留存分析
 */
export const retentionForm = {
  status: 'draft',
  name: '',
  appList: [],
  shareMode: 0,
  eventList: [
    {
      eventIds: [],
      conditionList: [],
      key: Date.now()
    }
  ],
  contrastType: '',
  dimension: [],
  viewType: '0',
  showType: ''
}

/**
 * 分布分析
 */
export const DistriForm = {
  status: 'draft',
  name: '',
  appList: [],
  shareMode: 0,
  eventList: [
    {
      conditionList: [],
      eventIds: [],
      indicatorValue: [],
      key: Date.now()
    }
  ],
  contrastType: '',
  dimension: [],
  viewType: '0'
}
