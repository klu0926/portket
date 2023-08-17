const router = require("express").Router()

router.get("", (req, res) => {
  res.send("this is the user get")
})

module.exports = router