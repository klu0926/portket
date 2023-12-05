const { Visit } = require('../../models')
const responseObject = require('../../helper/responseObject')

const visitController = {
  getVisit: async (req, res, next) => {
    const ACTION = 'GET Visit'
    try {
      const visitId = req.params.id
      if (visitId === undefined) {
        throw new Error('missing body visitId!')
      }
      const visit = await Visit.findOne({
        where: { id: visitId },
        attributes: ['id', 'count'],
        raw: true,
      })
      if (!visit) {
        throw new Error(`Cant not find visit record ${visitId}!`)
      }
      const data = {
        id: visit.id,
        count: visit.count,
      }
      const message = `Successfully get visit count`
      res.json(responseObject(true, data, message, ACTION))
    } catch (err) {
      res.json(responseObject(false, null, err.message, ACTION))
    }
  },
  putVisit: async (req, res, next) => {
    const ACTION = 'PUT Visit'
    try {
      const visitId = req.params.id
      if (visitId === undefined) {
        throw new Error('missing params visitId!')
      }
      let visit = await Visit.findOne({
        where: { id: visitId },
        attributes: ['id', 'count'],
      })
      if (!visit) {
        throw new Error(`Cant not find visit record ${visitId}!`)
      }
      await visit.update({
        count: visit.count + 1,
      })
      const data = {
        id: visit.id,
        count: visit.count,
      }
      visit = visit.toJSON()
      const message = `Successfully increase visitId ${visitId} count to ${visit.count}`
      res.json(responseObject(true, data, message, ACTION))
    } catch (err) {
      res.json(responseObject(false, null, err.message, ACTION))
    }
  },
}

module.exports = visitController
