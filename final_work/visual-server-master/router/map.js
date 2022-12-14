let express = require('express')
let router = express.Router()
// 数据引入
let mapData = require('../mock/world.json')
let ppData = require('../mock/worldp.json')
router.get('/data', (req, res) => {
    res.send({msg:"我是map的路由地址", chartMap: mapData,chartp: ppData})
    // res.send({msg:"我是co2的路由地址", chartco2: co2Data})// 返回数据给前端
})
module.exports = router;