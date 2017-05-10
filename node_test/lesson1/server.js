var http = require('http');
var url = require('url');

function server(route,handle){
    function onRequest(req,res){
        var postdata ="";
        var pathname = url.parse(req.url).pathname;
        console.log("Request for"+ pathname +"received.");
        //编码哥特式为UTF-8
        req.setEncoding("utf8");
        //注册了data事件的监听器，每次收集赋值给postData
        req.addListener("data",function(postdataChunk){
            postdata += postdataChunk;
            console.log("Received POST data chunk'"+ postdataChunk +"'.");
        });
        //将请求路由的调用
    req.addListener("end",function(){
        route(handle,pathname,res,postdata);
    })
    }

    http.createServer(onRequest).listen(8000);
    console.log("Server hajs started.");
}
exports.server = server;