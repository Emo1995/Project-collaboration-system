const express = require('express')
const router = express.Router()

const crypto = require('crypto') // md5 加密
const moment = require('moment')

const model = require('../config/db.js')
const createToken = require('../middleware/createToken.js')
const checkToken = require('../middleware/checkToken.js')
const objectIdToTimestamp = require('objectid-to-timestamp')

const jsonWrite = (res, ret) => {
  if (typeof ret === 'undefined') {
    res.json({
      code: '404',
      msg: 'server is error'
    })
  } else {
    res.json(ret)
  }
}
// 用户注册 
router.post('/useradd', (req, res, next) => {
  const params = req.body

  const id = params.userId
  const pwd = params.userPwd
  const md5 = crypto.createHash('md5')
  const password = md5.update(pwd)
    .digest('hex') //加密后的密码
  const user = new model.User({
    userId: id,
    userPwd: password,
    token: createToken(id)
  })
  user.create_time = moment(objectIdToTimestamp(user._id))
    .format('YYYY-MM-DD HH:mm:ss')

  let reg_pwd = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}$/
  let reg_id = /^([0-9]){9}$/

  if (reg_id.test(id) && reg_pwd.test(pwd)) {
    model.User.findOne({
      userId: user.userId
    }, (err, doc) => {
      if (err) console.log(err)
      if (doc) {
        const result = {
          code: 50,
          msg: '用户ID已存在！',
          tip: '请登录..'
        }
        jsonWrite(res, result)
      } else {
        user.save(err => {
          if (err) {
            const result = {
              code: 100,
              msg: '错误! 用户ID或密码错误',
              tip: '请修改用户ID或密码'
            }
            jsonWrite(res, result)
          } else {
            const result = {
              code: 200,
              msg: '注册成功！',
              tip: '请登录...'
            }
            jsonWrite(res, result)
          }
        })
      }
    })
  } else {
    const result = {
      code: 100,
      msg: 'Error! Error ID or password',
      tip: 'Change your ID or password ...'
    }
    jsonWrite(res, result)
  }
})


// 用户登录
router.post('/login', (req, res, next) => {
  const params = req.body

  const id = params.userId
  const pwd = params.userPwd
  const md5 = crypto.createHash('md5')
  const password = md5.update(pwd)
    .digest('hex') //加密后的密码

  const user = new model.User({
    userId: id,
    userPwd: password,
    token: createToken(id)
  })

  model.User.findOne({
    userId: user.userId
  }, (err, doc) => {
    if (err) console.log(err)
    if (!doc) {
      const result = {
        code: 50,
        msg: '错误！用户ID不存在',
        tip: '请注册...'
      }
      jsonWrite(res, result)
    } else if ( user.userPwd === doc.userPwd) {
      const result = {
        code: 200,
        userId: doc.userId,
        time: moment(objectIdToTimestamp(doc._id))
          .format('YYYY-MM-DD HH:mm:ss'),
        token: createToken(id),
        msg: '登录成功',
        tip: ''
      }
      jsonWrite(res, result)
    } else {
      const result = {
        code: 100,
        msg: '密码错误！',
        tip: '请重新填写密码...'
      }
      jsonWrite(res, result)
    }
  })
})

// 添加需求单
router.post('/demandadd', (req, res, next) => {
  const params = req.body
  const title = params.title
  const project = params.project
  // const content = params.content
  const startdate = params.startdate
  const enddate = params.enddate
  const priority = params.priority
  const owner = params.owner
  const creator = params.creator
  const status = params.status
  const did = params.did

  const demand = new model.Demands({
    title: title,
    project: project,
    // content: content,\
    startdate: startdate,
    enddate: enddate, 
    priority: priority,
    owner: owner,
    creator: creator,
    status: status,
    did: did
  })

  model.Demands.findOne({}, (err, doc) => {
    demand.save(err => {
      if (err) {
        const result = {
          code: 500,
          msg: '异常错误！',
          tip: ''
        }
        jsonWrite(res, result)
      } else {
        const result = {
          code: 200,
          msg: '操作成功！',
          tip: ''
        }
        jsonWrite(res, result)
      }
    })
  })
})


// 获取用户信息
router.get('/getuser', checkToken, (req, res, next) => {
  model.User.find({}, (err, doc) => {
    if (err) console.log(err)
    jsonWrite(res, doc)
  })
})

// 获取需求列表
router.get('/getdemands', checkToken, (req, res, next) => {
  model.Demands.find({}, (err, doc) => {
    if (err) console.log(err)
    jsonWrite(res, doc)
  })
})

// 获取需求列表
// router.get('/getdemand', checkToken, (req, res, next) => {
//   const params = req.body

//   const id = params.did
  
//   const demand = new model.Demands({
//     did: id
//   })
//   model.Demands.findOne({ did: demand.did }, (err, doc) => {
//     if (err) console.log(err)
//     jsonWrite(res, doc)
//   })
// })

router.post('/getdemand', (req, res, next) => {
  const params = req.body

  const did = params.did
  
  const demand = new model.Demands({
    did: did
  })

  model.Demands.findOne({
    did: demand.did
  }, (err, doc) => {
    if (err) console.log(err)
    if (doc) {
      const result = {
        code: 50,
        msg: 'DID存在！'
      }
      jsonWrite(res, doc)
    }
  })
})


// 获取项目列表
router.get('/getprojects', checkToken, (req, res, next) => {
  model.Projects.find({}, (err, doc) => {
    if (err) console.log(err)
    jsonWrite(res, doc)
  })
})

// 获取需求详情页
// router.post('/getdemand', checkToken, (req, res, next) => {
//   const params = req.body

//   const demand = new model.Demands({
//     did: params.did
//   })

//   model.Demands.findOne({ did: demand.did }, (err, doc) => {
//       if (err) console.log(err)
//       jsonWrite(res, doc)
//       // res.status(200).send(doc)
//   })
// })

// router.get('/getdemands', (req, res) => {
    // const page = req.query.payload.page
    // const value =req.query.payload.value
    // const limit = req.query.payload.limit - 0 || 4
    // const skip = limit * (page - 1 )
    // if (value && value !== '全部') {
    //     db.Article.find({tags: value, isPublish: true}).sort({date: -1}).limit(limit).skip(skip).exec()
    //         .then((articles) => {
    //             res.send(articles)
    //     })
    // } else {
    //     db.Article.find({isPublish: true}).sort({date: -1}).limit(limit).skip(skip).exec().then((articles) => {
    //         res.send(articles)
    //     })
    // }

// })

module.exports = router
