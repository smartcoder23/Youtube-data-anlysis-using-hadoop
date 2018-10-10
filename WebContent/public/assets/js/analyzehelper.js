// Helper file to make ajax call to server on various button clicks

window.onload = function(){ 
    	
	var likeButton = document.getElementById("like");
	var dislikeButton = document.getElementById("dislike");
	var commentButton = document.getElementById("comment");
	var categoryButton = document.getElementById("category");
	var viewButton = document.getElementById("view");
	var uploaderButton = document.getElementById("uploader");

	likeButton.onclick = function(e){
		var socket = io.connect();
		e.preventDefault();
		socket.emit('clickedlikeanalyze', "clicked on like analyze");			
		socket.on('analyzing like data',function(data){
		var resp = data;
		if(data =="analyzing like data"){
			$("#ajax_loader").show();
			 d3.select("#toplikedchart").selectAll("svg").remove();
		}else if(resp.response =="success"){
d3.select("#toplikedchart").selectAll("svg").remove();
			 
			$("#ajax_loader").hide();
			//Collect all JSON objects

			var topLiked = resp.topLiked;	
			var toplikedchart = document.getElementById("toplikedchart");				
			drawHorizontalChart(topLiked,toplikedchart);
			var toplikedtable = document.getElementById("toplikedtable");
			//$("#topcategtable tr").remove();
			drawTable(topLiked,toplikedtable,"Top 10 Liked Videos","Video Title");
			$("#display-results").show();
			
		}else if(resp.response =="error"){
			$("#ajax_loader").hide();
			console.log("Some Error occured");
		}
	});

		console.log("I will analyze likes");
	}

	dislikeButton.onclick = function(e){
		var socket = io.connect();
		e.preventDefault();
		socket.emit('clickeddislikeanalyze', "clicked on dislike analyze");	
		socket.on('analyzing dislike data',function(data){
		var resp = data;
		if(data =="analyzing dislike data"){
			
			$("#ajax_loader").show();
			 d3.select("#toplikedchart").selectAll("svg").remove();
		}else if(resp.response =="success"){
			$("#ajax_loader").hide();
			//Collect all JSON objects
d3.select("#toplikedchart").selectAll("svg").remove();
			var topLiked = resp.topLiked;	
			var toplikedchart = document.getElementById("toplikedchart");				
			drawHorizontalChart(topLiked,toplikedchart);
			var toplikedtable = document.getElementById("toplikedtable");
			//$("#topcategtable tr").remove();
			drawTable(topLiked,toplikedtable,"Top 10 DisLiked Videos","Video Title");
			$("#display-results").show();
			
		}else if(resp.response =="error"){
			$("#ajax_loader").hide();
			console.log("Some Error occured");
		}
	});
		console.log("I will analyze dislikes");
	}
	commentButton.onclick = function(e){
		var socket = io.connect();
		e.preventDefault();
		socket.emit('clickedcommentanalyze', "clicked on comment analyze");	
		
		socket.on('analyzing comment data',function(data){
		var resp = data;	
		if(data =="analyzing comment data"){
			
			$("#ajax_loader").show();
			 d3.select("#topcategchart").selectAll("svg").remove();

		}else if(resp.response =="success"){
			$("#ajax_loader").hide();
d3.select("#toplikedchart").selectAll("svg").remove();
			//Collect all JSON objects
			 d3.select("#toplikechart").selectAll("svg").remove();

			var topLiked = resp.topcomment;	
			var toplikedchart = document.getElementById("toplikedchart");				
			drawHorizontalChart(topLiked,toplikedchart);
			var toplikedtable = document.getElementById("toplikedtable");
			//$("#topcategtable tr").remove();
			drawTable(topLiked,toplikedtable,"Highest Commented videos","Video Title");
			$("#display-results").show();			
		}else if(resp.response =="error"){
			$("#ajax_loader").hide();
			console.log("Some Error occured");
		}
	});
		console.log("I will analyze comment");
	}
	categoryButton.onclick = function(e){
		var socket = io.connect();
		e.preventDefault();
		socket.emit('clickedcategoryanalyze', "clicked on category analyze");	
		
		socket.on('analyzing category data',function(data){
		var resp = data;	
		if(data =="analyzing category data"){
			
			$("#ajax_loader").show();
			 d3.select("#topcategchart").selectAll("svg").remove();
			 d3.select("#topviewedchart").selectAll("svg").remove();

		}else if(resp.response =="success"){
d3.select("#toplikedchart").selectAll("svg").remove();
			$("#ajax_loader").hide();			
			var topLiked = resp.topcategory;	
			var toplikedchart = document.getElementById("toplikedchart");				
			drawHorizontalChart(topLiked,toplikedchart);
			var toplikedtable = document.getElementById("toplikedtable");
			drawTable(topLiked,toplikedtable,"Top Categories","Categories");
			$("#display-results").show();
			
		}else if(resp.response =="error"){
			$("#ajax_loader").hide();
			console.log("Some Error occured");
		}
	});
		console.log("I will analyze Category");
	}
	viewButton.onclick = function(e){
		var socket = io.connect();
		e.preventDefault();
		socket.emit('clickedviewanalyze', "clicked on view analyze");	
		
		socket.on('analyzing view data',function(data){
		var resp = data;	
		if(data =="analyzing view data"){
			
			$("#ajax_loader").show();
			 d3.select("#topcategchart").selectAll("svg").remove();
			 d3.select("#topviewedchart").selectAll("svg").remove();

		}else if(resp.response =="success"){
d3.select("#toplikedchart").selectAll("svg").remove();
			$("#ajax_loader").hide();			
			var topLiked = resp.topviewed;	
			var toplikedchart = document.getElementById("toplikedchart");				
			drawHorizontalChart(topLiked,toplikedchart);
			var toplikedtable = document.getElementById("toplikedtable");
			drawTable(topLiked,toplikedtable,"Top 10 Viewed Videos","Video Title");
			$("#display-results").show();
			
		}else if(resp.response =="error"){
			$("#ajax_loader").hide();
			console.log("Some Error occured");
		}
	});
		console.log("I will analyze View");
	}
	uploaderButton.onclick = function(e){
		var socket = io.connect();
		e.preventDefault();
		socket.emit('clickeduploaderanalyze', "clicked on uploader analyze");	
		
		socket.on('analyzing uploader data',function(data){
		var resp = data;	
		if(data =="analyzing uploader data"){
			
			$("#ajax_loader").show();
			 d3.select("#topcategchart").selectAll("svg").remove();
			 d3.select("#topviewedchart").selectAll("svg").remove();

		}else if(resp.response =="success"){
d3.select("#toplikedchart").selectAll("svg").remove();
			$("#ajax_loader").hide();			
			var topLiked = resp.topuploader;	
			var toplikedchart = document.getElementById("toplikedchart");				
			drawHorizontalChart(topLiked,toplikedchart);
			var toplikedtable = document.getElementById("toplikedtable");
			drawTable(topLiked,toplikedtable,"Top Uploaders","Uploader Id");
			$("#display-results").show();
			
		}else if(resp.response =="error"){
			$("#ajax_loader").hide();
			console.log("Some Error occured");
		}
	});
		console.log("I will analyze Uploaders");
	}
	

	//Ajax call to make a request to Run Hadoop Map-Reduce algorithm on the server
	
	
	function drawTable(data,selecter,title,type){
		$(selecter).find("tr").remove();
document.getElementById('analysis-type').innerHTML = title;
document.getElementById('type').innerHTML = type;

		var tabdata = $.parseJSON(data);
		$(function() {
			$.each(tabdata, function(i, item) {
				var $tr = $('<tr>').append(
					$('<td>').text(i+1),
					$('<td>').text(item.Title),
					$('<td>').text(item.Count)
                                       					
				).appendTo(selecter);
				
			});
		});
		
		
		
	}
	
	
	function drawLegendChart(dataset,selecter){
		
		var dataset = $.parseJSON(dataset);
		 var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;                                  
        var legendSpacing = 4;                                    

        var color = d3.scale.category20b();

        var svg = d3.select(selecter)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var arc = d3.svg.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);

        var pie = d3.layout.pie()
          .value(function(d) { return Number(d.Count); })
          .sort(null);

        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) { 
            return color(d.data.Category);
          });

        var legend = svg.selectAll('.legend')                     
          .data(color.domain())                                   
          .enter()                                                
          .append('g')                                            
          .attr('class', 'legend')                                
          .attr('transform', function(d, i) {                     
            var height = legendRectSize + legendSpacing;          
            var offset =  height * color.domain().length / 2;     
            var horz = -2 * legendRectSize;                       
            var vert = i * height - offset;                       
            return 'translate(' + horz + ',' + vert + ')';        
          });                                                     

        legend.append('rect')                                     
          .attr('width', legendRectSize)                          
          .attr('height', legendRectSize)                         
          .style('fill', color)                                   
          .style('stroke', color);                                
          
        legend.append('text')                                     
          .attr('x', legendRectSize + legendSpacing)              
          .attr('y', legendRectSize - legendSpacing)              
          .text(function(d) { return d; });                       		
	}
	
	function drawHorizontalChart(data,selecter){
		
		var tabdata = $.parseJSON(data);
		
		var colors = ['#FF0000','#FFF000','#FFF500','#FFF100','#FF0555','#AB3423','#5413AB','#CCC','#c0c0c0','#F8495C'];
		var w = 800,
		    h = 400;

		var svg = d3.select(selecter)
			.append("svg")
			.attr("width", w)
			.attr("height", h);
	
	
			var max_n = 0;
			for (var d in tabdata) {
				max_n = Math.max(Number(tabdata[d].Count), max_n);
			}
		
			var dx = w / max_n;
			var dy = h / tabdata.length;
			
			var colorScale = d3.scale.quantize()
						.domain([0,tabdata.length])
						.range(colors);
						
			// bars
			var bars = svg.selectAll(".bar")
				.data(tabdata)
				.enter()
				.append("rect")
				.attr("class", function(d, i) {return "bar " + d.Title;})
				.attr("x", function(d, i) {return 0;})
				.attr("y", function(d, i) {return dy*i;})
				.style('fill',function(d,i){ return colorScale(i); })
				.attr("width", function(d, i) {return dx*Number(d.Count)})
				.attr("height", dy);
	
			// labels
			var text = svg.selectAll("text")
				.data(tabdata)
				.enter()
				.append("text")
				.attr("class", function(d, i) {return "label " + d.Title;})
				.attr("x", 2)
				.attr("y", function(d, i) {return dy*i + 15;})
				.text( function(d) {return d.Title + "  ( Views: " + d.Count  + ")";})
				.attr("font-size", "12px")
				.style("font-weight", "bold");
		


	
		
	}
}
