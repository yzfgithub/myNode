const express = require('express');
const router = express.Router();
let dealFn = require('./dealfn.js')
function getDataFn(req,res,filename,obj) {
  let sendData={
    code:0,
    username:'',
    msg:'ok',
    data:{}
  };
  dealFn.readFileData(filename).then((data)=>{
    console.log(data,'data')
    let reqdata=data;
    console.log(reqdata,'data2')
    let bool=false;
    console.log(obj,'sss')
    reqdata.userSql.forEach(function (item,index) {
      console.log(item,obj,'sss')
      if(item.username==obj.username && item.password == obj.password){
        bool=true;
        return false;
      }
    })
    if(bool){
      sendData.username=obj.username;
      res.send(sendData)
    }else{
      sendData.msg='用户名或密码错误'
      res.send(sendData)
    }
  },(msg)=>{
    sendData.errno = -1;
    sendData.msg='暂时没有数据';
    res.send(sendData)
  },(err)=>{
    console.log(err,'err2')
  })
}
function whiteDataFn(req,res,file,obj) {
  let sendData={
    code:0,
    msg:'ok',
    data:{}
  };
  dealFn.readFileData(file).then(function (data) {
    return  dealFn.whiteFileData(file,obj,data).then((data)=>{
      sendData.msg='register success'
        res.send(sendData)
      },(msg)=>{
      sendData.msg='register error'
        res.send(sendData)
    })
  })
}
router.get('/getUser',(req,res,next)=>{
  let query=req.query;
  let obj={
    username:query.username,
    password:query.password,
  }
  getDataFn(req,res,'123.json',obj)

},(err)=>{
  console.log('err',err)
})
router.post('/setUser',(req,res,next)=>{
  const body=req.body;
  let obj={
    username : body.username,
    password : body.password,
  }
  whiteDataFn(req,res,'123.json',obj);
},(err)=>{
  console.log(err,'err')
})
module.exports = router
