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
    let reqdata=data;
    let bool=false;
    reqdata.userSql.forEach(function (item,index) {
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
  getDataFn(req,res,'userData.json',obj)
},(err)=>{
  console.log('err',err)
})
router.post('/setUser',(req,res,next)=>{
  const body=req.body;
  let obj={
    username : body.username,
    password : body.password,
  }
  whiteDataFn(req,res,'userData.json',obj);
},(err)=>{
  console.log(err,'err')
})


//
function getDetail(req,res,filename,needcity) {
  let query = req.query,
    city=query.city,
    readFileName='',
    sendData={
      code:0,
      data:{},
      msg:''
    };
  if(needcity){
    readFileName = city+filename;
  }else{
    readFileName=filename
  }
  dealFn.readDataList(readFileName).then((data)=>{
    sendData.data = data;
    res.send(sendData)
  },(msg)=>{
    sendData.code=100;
    sendData.msg='error';
    res.send(sendData)
  })

}


//detail
router.get('/bj_cinema',(req,res,next)=>{
  getDetail(req,res,'_cinema.json',true)

},(err)=>{
  console.log('err',err)
})
router.get('/bj_hot',(req,res,next)=>{
  getDetail(req,res,'_hot.json',true)

},(err)=>{
  console.log('err',err)
})

router.get('/movie/hot',(req,res,next)=>{
  getDetail(req,res,'_hot.json',true)

},(err)=>{
  console.log('err',err)
})
router.get('/movie/city',(req,res,next)=>{
  getDetail(req,res,'city.json',false)

},(err)=>{
  console.log('err',err)
})
router.get('/movie/swiper',(req,res,next)=>{
  getDetail(req,res,'swiper.json',false)

},(err)=>{
  console.log('err',err)
})
router.get('/movie/coming',(req,res,next)=>{
  let query = req.query,
    limit = query.limit,
    offset = query.offset;
  if (limit && offset) {
    sendData = {
      errno: 0,
      total: 0,
      limit: limit,
      offset: offset,
      msg: 'ok',
      data: {}
    };
    dealFn.readDataList('coming.json').then((data) => {
      let list = data.data.returnValue
      let sendList = list.slice(offset, offset + limit)
      data.data.returnValue = sendList
      sendData.data = data;
      sendData.total = list.length
      res.send(sendData);
    }, (msg) => {
      sendData.errno = -1;
      sendData.msg = '暂时没有数据';
      res.send(sendData);
    })
  } else {
    getDetail(req,res,'coming.json',false)
  }

})
module.exports = router
