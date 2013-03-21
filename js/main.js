var $s=0;
var clicking=false, chk=-1, chkStroke=-1, chkColor=-1, lastX, lastY, lx = new Array(3), ly = new Array(3), ch = new Array(0,0,0), chkk=-1;
var oldStrokeStyle, oldLineWidth, newStrokeStyle='#000000', newLineWidth=1;
			var canvas;
			var colorBox = ["white","black","yellow","green","red"];
			var widthBox = [3,5,7,9,12,15];
			var context, ctx = new Array(3);
			
			updateCanvas();
        $(document).ready(function(e) {
			for($i=0;$i<colorBox.length; $i++){
				$('#customize .color').append(" <a href='#' clr='"+$i+"' style='background:"+colorBox[$i]+"; width:40px; height:40px; border: 1px solid black; //padding:0px 10px; display:inline-block;'></a>");
			}
			for($i=0;$i<widthBox.length; $i++){
				$('#customize .width').append(" <a href='#' wdt='"+$i+"' style='background:#CCC; line-height:40px; font-weight:bold; text-align:center; vertical-align:middle; text-decoration:none; width:40px; height:40px; border: 1px solid black; //padding:0px 10px; display:inline-block;'>"+widthBox[$i]+"</a> ");
			}
			$('#customize .download').click(function(){
				var mime = "image/png";
				console.log(mime);
				window.open(document.getElementById("A").toDataURL(mime));
			});
			$('#customize .clearcanvas').click(function(){
				context.clearRect(0,0,1000,500);
			});
			$('#customize .color a').click(function(){
				console.log("Old6: "+oldStrokeStyle+" "+context.strokeStyle+" "+newStrokeStyle);
				context.strokeStyle=colorBox[$(this).attr('clr')];
				console.log("Old7: "+oldStrokeStyle+" "+context.strokeStyle+" "+newStrokeStyle);
				sendColorWidth(-1,$(this).attr('clr'));
			});
			$('#customize .width a').click(function(){
				context.lineWidth=widthBox[$(this).attr('wdt')];
				sendColorWidth(-2,$(this).attr('wdt'));
			});
			canvas = document.getElementById('A');
			context = canvas.getContext("2d");
			context.lineWidth = 1;
			//ctx.lineWidth = 1;
			ctx[0] = canvas.getContext("2d");
			
			context.lineJoin = "round";
			context.lineCap = "round";
			$('#A').mousedown(function(e){
					clicking=true;
			});
			$(document).mouseup(function(){
				clicking = false; chk=-1;
			});
			$('#A').mousemove(function(e) {
              //  alert(e.pageX+ ' , ' + e.pageY);
				if(clicking == false) return;
				draw(e.pageX, e.pageY);
				sendCanvas(e.pageX, e.pageY);
			});
        });
		
		function sendCanvas($x,$y)
		{
			console.log("Hey!"+$x+" "+$y);
			//console.log($s);
			var clickingint = 1;
			if(chk==-1){clickingint=0; chk=1;}
			console.log('click '+clickingint);
			$.ajax({
				url: 'process.php',
				type: 'post',
				data    : {x: $x, y: $y, clicking: clickingint},
				success : function( data ) {  //updateCanvas();
				$('#chatbox').val(""); console.log("Success!"+data); //$s=data; 
				},
				error   : function( xhr, err ) { console.log(err); }
			}); 
			return false;
		}
		
		function sendColorWidth($y,$c)
		{
			$.ajax({
				url: 'process.php',
				type: 'post',
				data    : {x: '-1', y: $y, clicking: $c},
				success : function( data ) {
					console.log("Success!"+data);
				},
				error   : function( xhr, err ) { console.log(err); }
			}); 
			return false;
		}
		
		function updateCanvas()
		{
			console.log('Insde updateChat()');
			$.ajax({
				url: 'update.php',
				type: 'post',
				cache: false,
				data: {s: $s},
				dataType: "json",
				success: function(data) { 
					console.log("Updated!"+data['s']); 
					console.log("Old: "+oldStrokeStyle+" "+context.strokeStyle+" "+newStrokeStyle);
					oldStrokeStyle=context.strokeStyle;
					oldLineWidth = context.lineWidth;
				//	if(chkk!=-1&&
					if(data.x.length!=0) {
						context.strokeStyle=newStrokeStyle;
						context.lineWidth=newLineWidth;
					console.log("Old8: "+oldStrokeStyle+" "+context.strokeStyle+" "+newStrokeStyle+" "+data.x.length);
					}
				//	else chkk++;
						
					for(var i=0; i<data.x.length; i++){ 
					
					console.log("Old2: "+oldStrokeStyle+" "+context.strokeStyle+" "+newStrokeStyle);
						console.log("data"+data.x[i]+" "+data.y[i]+" k "+data.uid[i]+" "+data.clicking[i]); 
						if(data.x[i]==-1) {
						//	console.log("Yeah!");
							if(data.y[i]==-1){ newStrokeStyle=colorBox[data.clicking[i]]; //console.log("y is -1"+ctx.strokeStyle+context.strokeStyle);
							}
							else if(data.y[i]==-2){ newLineWidth=widthBox[data.clicking[i]];}
							
						}
						else{
							if(data.clicking[i]==0) ch[0]=-1;
							drawExt(data.x[i], data.y[i], 0); 
						}
						//$s = data.uid[i];
					}
					//context.lineWidth = oldLineWidth;
					//context.strokeStyle = oldStrokeStyle;
					//console.log("Stroke"+context.strokeStyle+" "+oldStrokeStyle);
					//console.log('UPdated');
					$s = data['s'];
				//	$s = data.uid[data.uid.length-1];
				
					console.log("Old3: "+oldStrokeStyle+" "+context.strokeStyle+" "+newStrokeStyle);
					if(data.x.length==0) console.log("Undefined "+data.x.length); 
					else {
						
						console.log("Old4: "+oldStrokeStyle+" "+context.strokeStyle+" "+newStrokeStyle);
						context.strokeStyle=oldStrokeStyle;
						context.lineWidth=oldLineWidth;
					
					console.log("Old5: "+oldStrokeStyle+" "+context.strokeStyle+" "+newStrokeStyle);
					}
					
					//else chkk++;
					setTimeout('updateCanvas()',1000);
				},
				error: function(xhr, err) { console.log("Error in updating"+err); //updateCanvas();
				}
			});
		}
		
	function draw(x,y) {
			console.log(x + "|" + y+"|"+chk+"|"+lastX+"|"+lastY);
			if(chk==-1){ //chk=1;
			context.beginPath();
				context.moveTo(x-1, y-1);
			}
			else{ context.moveTo(lastX, lastY); console.log("Moved");}
			context.lineTo(x,y);
			context.stroke();
		//	isDragging = true;
			lastX=x;
			lastY=y;
		}
		
		function drawExt(x,y,user) {
			console.log(x + "|" + y+"|"+chk+"|"+lx[user]+"|"+ly[user]+ctx[user].strokeStyle);
			//ctx[user].strokeStyle = '#003300';
			if(ch[user]==-1){ ch[user]=1;context.beginPath();
				context.moveTo(x-1, y-1);
			}
			else{ context.moveTo(lx[user], ly[user]); console.log("Moved");}
			context.lineTo(x,y);
			context.stroke();
		//	isDragging = true;
			lx[user]=x;
			ly[user]=y;
		}