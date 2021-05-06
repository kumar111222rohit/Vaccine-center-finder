const newsService=require('../services/newsService.js')
module.exports={
    getLatestNewsFromUK:function (req,res,next) {
        return new Promise((resolve,reject) => {
            newsService.getLatestNewsFromUK(req.query.keyword,req.query.sortby)
                    .then(result=>{
                        res.send({
                            status:200,
                            Response:result
                        })
                    })
                    .catch(error=>{
                        console.log(error)
                        res.send({
                            Status:500,
                            Error:true,
                            ErrMessage:'Trouble fetching news currently'
                        })
                    })
            })
    }
}