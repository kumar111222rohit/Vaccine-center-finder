const config=require('../config')
const axios=require('axios')

module.exports= {
    getLatestNewsFromUK:function(keyword,sortby) {
        return new Promise((resolve,reject) => {
            let curDate=(new Date()).toISOString().split('T')[0]; //setting today's date as the free api calls plan works for the most recent date.
            axios.get(config.API_END_POINT+'q='+keyword+'&from='+curDate+'&sortBy='+sortby+'&apiKey='+config.API_KEY)
            .then(result=>{
                resolve(result.data)
            })
            .catch(error=>{
                reject(error)
            })
        })
    }
}
