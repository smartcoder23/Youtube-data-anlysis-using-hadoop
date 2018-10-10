var express = require('express'),
        app = express(),
        server = require('http').createServer(app);
var io = require("socket.io")(server);		
var searchapi = require('./controllers/searchapi');		
var fs = require('fs');
var exec = require('child_process').exec;
var child;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public');
});

io.sockets.on('connection', function (socket) {
	console.log("Connected using sockets");
		
	socket.on('clickedsearch', function(data){	
		var time = data.timeframe;
		socket.emit('getting data', "fetching data");
		searchapi.clickedSearchButton(time,function(finaldata){
console.log(finaldata);
				if(finaldata == "success"){
console.log("hello");

					child = exec('/home/shubham/YouTube-Data-Analysis-master15/scripts/getdata.sh',function(error,stdout,stderr){
			if (error) {
console.log(error);
				console.error(error);
				socket.emit('getting data', "failed");
				return;
			}
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			socket.emit('getting data', "success");
			});	
			}else{
				socket.emit('getting data', "failed");
			}
			});
	});
	






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	socket.on('clickedlikeanalyze',function(data){
		socket.emit('analyzing like data', "analyzing like data");
		console.log("Analyzing like Data");
		child = exec('/home/shubham/YouTube-Data-Analysis-master15/scripts/likes.sh',function(error,stdout,stderr){
			var resultdata = {};
			if (error) {
				console.error(error);
				resultdata.response = "error";
				socket.emit('analyzing like data', resultdata);
				return;
			}
		//console.log('stdout: ' + stdout); 
		//console.log('stderr: ' + stderr);
		var likestsv = fs.readFileSync('/home/shubham/YouTube-Data-Analysis-master15/output/likes.tsv','utf8');

		var likesheaders = ["Title","Count"];
		var topLiked = tsvJSON(likestsv,likesheaders);
		resultdata.response = "success";
		resultdata.topLiked = topLiked;		
		function tsvJSON(tsv,headers){
			  var lines=tsv.split("\n");
			  var result = [];
			  for(var i=0;i<lines.length-1;i++){
				  var obj = {};
				  lines[i] = lines[i].replace(/\"/g,"");
				  var currentline=lines[i].split("\t");
				  for(var j=0;j<headers.length;j++){
					  obj[headers[j]] = currentline[j];
				  }
				  result.push(obj);
			 
				}
					  
			  return JSON.stringify(result); //JSON
		}
		socket.emit('analyzing like data', resultdata);
		});	
	});


	//////////////////
	socket.on('clickeddislikeanalyze',function(data){
		
		socket.emit('analyzing dislike data', "analyzing dislike data");
		console.log("Analyzing dislike Data");
		//Execute Hadoop script
		 //For shell script 
		
		child = exec('/home/shubham/YouTube-Data-Analysis-master15/scripts/dislikes.sh',function(error,stdout,stderr){
			var resultdata = {};
			if (error) {
				console.error(error);
				resultdata.response = "error";
				socket.emit('analyzing dislike data', resultdata);
				return;
			}
		var likestsv = fs.readFileSync('/home/shubham/YouTube-Data-Analysis-master15/output/dislikes.tsv','utf8');

		var likesheaders = ["Title","Count"];
		var topLiked = tsvJSON(likestsv,likesheaders);
		resultdata.response = "success";
		resultdata.topLiked = topLiked;		
		function tsvJSON(tsv,headers){
			  var lines=tsv.split("\n");
			  var result = [];
			  for(var i=0;i<lines.length-1;i++){
				  var obj = {};
				  lines[i] = lines[i].replace(/\"/g,"");
				  var currentline=lines[i].split("\t");
				  for(var j=0;j<headers.length;j++){
					  obj[headers[j]] = currentline[j];
				  }
				  result.push(obj);
			 
				}
					  
			  return JSON.stringify(result); //JSON
		}
		socket.emit('analyzing dislike data', resultdata);
		});	
	});

//////////////////////////////////////

socket.on('clickedcommentanalyze',function(data){		
	socket.emit('analyzing comment data', "analyzing comment data");
	console.log("Analyzing comment Data");

	child = exec('/home/shubham/YouTube-Data-Analysis-master15/scripts/comments.sh',function(error,stdout,stderr){
		var resultdata = {};
		if (error) {
			console.error(error);
			resultdata.response = "error";
			socket.emit('analyzing comment data', resultdata);
			return;
		}
	//console.log('stdout: ' + stdout); 
	//console.log('stderr: ' + stderr);
	//Execute all command and then read tsv code
	var commtsv = fs.readFileSync('/home/shubham/YouTube-Data-Analysis-master15/output/outcomments.tsv','utf8');
	//var categtsv = fs.readFileSync('./../output/outcategory.tsv','utf8');
	var commheaders = ["Title","Count"];
	var topcomm = tsvJSON(commtsv,commheaders);
	
	resultdata.response = "success";
	resultdata.topcomment = topcomm;	
	function tsvJSON(tsv,headers){
				
		  var lines=tsv.split("\n");
		 
		  var result = [];
		 
		  for(var i=0;i<lines.length-1;i++){
		 
			  var obj = {};
			  lines[i] = lines[i].replace(/\"/g,"");
			  var currentline=lines[i].split("\t");
				
			  for(var j=0;j<headers.length;j++){
				  obj[headers[j]] = currentline[j];
			  }
		 
			  result.push(obj);
		 
			}
	
		  
		  return JSON.stringify(result); //JSON
	}
	socket.emit('analyzing comment data', resultdata);
	});	
});


//////////////////////////////////////////////////////
socket.on('clickedcategoryanalyze',function(data){
		
	socket.emit('analyzing category data', "analyzing category data");
	console.log("Analyzing category Data");

	child = exec('/home/shubham/YouTube-Data-Analysis-master15/scripts/category.sh',function(error,stdout,stderr){
		var resultdata = {};
		if (error) {
			console.error(error);
			resultdata.response = "error";
			socket.emit('analyzing category data', resultdata);
			return;
		}
	console.log('stdout: ' + stdout); 
	console.log('stderr: ' + stderr);
	//Execute all command and then read tsv code
	var categtsv = fs.readFileSync('/home/shubham/YouTube-Data-Analysis-master15/output/outcategory.tsv','utf8');
	//var categtsv = fs.readFileSync('./../output/outcategory.tsv','utf8');
	var categheaders = ["Title","Count"];

// Call tsv to JSOn to send the data
	var topcateg = tsvJSON(categtsv,categheaders);
	//var topuploader = tsvJSON(uploadertsv,uploaderheaders);
	//var topviewed = tsvJSON(viewtsv,viewheaders);
	resultdata.response = "success";
	resultdata.topcategory = topcateg;	
	//resultdata.topuploader = topuploader;
	//resultdata.topviewed = topviewed;		
	// Function to convert TSV to JSON object
	function tsvJSON(tsv,headers){
				
		  var lines=tsv.split("\n");
		 
		  var result = [];
		 
		  for(var i=0;i<lines.length-1;i++){
		 
			  var obj = {};
			  lines[i] = lines[i].replace(/\"/g,"");
			  var currentline=lines[i].split("\t");
				
			  for(var j=0;j<headers.length;j++){
				  obj[headers[j]] = currentline[j];
			  }
		 
			  result.push(obj);
		 
			}
	
		  
		  return JSON.stringify(result); //JSON
	}
	socket.emit('analyzing category data', resultdata);
	});	
});

//////////////////////////////////////////////////////////////////////
socket.on('clickedviewanalyze',function(data){
		
	socket.emit('analyzing view data', "analyzing view data");
	console.log("Analyzing view Data");
	//Execute Hadoop script
	 //For shell script 
	
	child = exec('/home/shubham/YouTube-Data-Analysis-master15/scripts/view.sh',function(error,stdout,stderr){
		var resultdata = {};
		if (error) {
			console.error(error);
			resultdata.response = "error";
			socket.emit('analyzing category data', resultdata);
			return;
		}
	console.log('stdout: ' + stdout); 
	console.log('stderr: ' + stderr);
	//Execute all command and then read tsv code
	//var viewtsv = fs.readFileSync('/home/shubham/YouTube-Data-Analysis-master15/output/outview.tsv','utf8');
	//var categtsv = fs.readFileSync('./../output/outcategory.tsv','utf8');
	//var categheaders = ["Vdeo_name","Count"];
	//var uploadertsv = fs.readFileSync('/home/shubham/YouTube-Data-Analysis-master15/output/outuploader.tsv','utf8');
	//var uploadertsv = fs.readFileSync('./../output/outuploader.tsv','utf8');
	//var uploaderheaders = ["Uploader","Count"];
	var viewtsv = fs.readFileSync('/home/shubham/YouTube-Data-Analysis-master15/output/outview.tsv','utf8');
	//var viewtsv = fs.readFileSync('./../output/outview.tsv','utf8');
	var viewheaders = ["Title","Count"];

// Call tsv to JSOn to send the data
	//var topcateg = tsvJSON(categtsv,categheaders);
	//var topuploader = tsvJSON(uploadertsv,uploaderheaders);
	var topviewed = tsvJSON(viewtsv,viewheaders);
	resultdata.response = "success";
	//resultdata.topcategory = topcateg;	
	//resultdata.topuploader = topuploader;
	resultdata.topviewed = topviewed;		
	// Function to convert TSV to JSON object
	function tsvJSON(tsv,headers){
				
		  var lines=tsv.split("\n");
		 
		  var result = [];
		 
		  for(var i=0;i<lines.length-1;i++){
		 
			  var obj = {};
			  lines[i] = lines[i].replace(/\"/g,"");
			  var currentline=lines[i].split("\t");
				
			  for(var j=0;j<headers.length;j++){
				  obj[headers[j]] = currentline[j];
			  }
		 
			  result.push(obj);
		 
			}
	
		  
		  return JSON.stringify(result); //JSON
	}
	socket.emit('analyzing view data', resultdata);
	});	
});

///////////////////////////////////////////////
socket.on('clickeduploaderanalyze',function(data){
		
	socket.emit('analyzing uploader data', "analyzing uploader data");
	console.log("Analyzing uploader Data");
	//Execute Hadoop script
	 //For shell script 
	
	child = exec('/home/shubham/YouTube-Data-Analysis-master15/scripts/uploaders.sh',function(error,stdout,stderr){
		var resultdata = {};
		if (error) {
			console.error(error);
			resultdata.response = "error";
			socket.emit('analyzing category data', resultdata);
			return;
		}
	console.log('stdout: ' + stdout); 
	console.log('stderr: ' + stderr);
	var uploadertsv = fs.readFileSync('/home/shubham/YouTube-Data-Analysis-master15/output/outuploader.tsv','utf8');
	//var uploadertsv = fs.readFileSync('./../output/outuploader.tsv','utf8');
	var uploaderheaders = ["Title","Count"];
	var topuploader = tsvJSON(uploadertsv,uploaderheaders);
	//var topviewed = tsvJSON(viewtsv,viewheaders);
	resultdata.response = "success";
	//resultdata.topcategory = topcateg;	
	resultdata.topuploader = topuploader;
	//resultdata.topviewed = topviewed;		
	// Function to convert TSV to JSON object
	function tsvJSON(tsv,headers){
				
		  var lines=tsv.split("\n");
		 
		  var result = [];
		 
		  for(var i=0;i<lines.length-1;i++){
		 
			  var obj = {};
			  lines[i] = lines[i].replace(/\"/g,"");
			  var currentline=lines[i].split("\t");
				
			  for(var j=0;j<headers.length;j++){
				  obj[headers[j]] = currentline[j];
			  }
		 
			  result.push(obj);
		 
			}
	
		  
		  return JSON.stringify(result); //JSON
	}
	socket.emit('analyzing uploader data', resultdata);
	});	
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	
	socket.on("disconnect", function () {
        console.log("Disconnected");
    });
	
});

	
	
server.listen(8080);

console.log('Server is running at port 8080');
