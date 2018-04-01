let fs = require('fs');

let dealFn = {
//  通过promist写入数据
  whiteFileData:(file,obj,data)=>{
    let promise = new Promise((resolve,reject)=>{

        let newObj=obj;
        let newData = data;
        let bool = true;

      newData.userSql.forEach(function (item,index) {
            if(item.username==obj.username){
              bool = false;
                  return false;
            }
          })
        if(bool){
          newData.userSql.push(obj)
          newObj ={
            registerId:newData.registerId+1,
            userSql:newData.userSql
          }
          newObj = JSON.stringify(newObj);
          console.log(newObj,'new')
          fs.writeFile('../database/'+file,newObj,function (err) {
            if(err){
              reject('fail'+err)
            }else{
              resolve('white success');
            }
          })
        }else{
          reject('该用户名已被注册');
        }


    })
    return promise
  },
  readFileData:(file)=>{
    let promise = new Promise((resolve,reject)=>{
      fs.readFile('../database/'+file,'utf-8',(err,data)=>{
        if(err){
          console.log('345')
          console.log(err)
        }else{
          if(data){
            data = JSON.parse(data);
          }else {
            data = {
              registerId:0,
              userSql:[]
            };
          }
          resolve(data)
        }
      })
    })
    return promise
  },

  readDataList:(file)=>{
    let promise = new Promise((resolve,reject)=>{
      fs.readFile('../database/'+file,'utf-8',(err,data)=>{
        if(err){
          console.log('345')
          console.log(err)
        }else{
          // console.log(data,'filedata')
            data = JSON.parse(data);
          resolve(data)
        }
      })
    })
    return promise
  },

}

module.exports = dealFn
