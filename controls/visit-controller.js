const visitController = {
  increaseVisit: async (req, res, next) => {
    const visitId = req.body.visitId
    console.log('visitId', visitId)
    res.end()
  },
}

module.exports = visitController
