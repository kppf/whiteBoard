var $s=0, $c=0;
var clicking=false, chk=-1, lastX, lastY, lx = new Array(3), ly = new Array(3), ch = new Array(0,0,0);
			var canvas;
			var context, ctx = new Array(3);
        $(document).ready(function(e) {
			canvas = document.getElementById('A');
			context = canvas.getContext("2d");
			ctx[0] = canvas.getContext("2d");
			if($c==0) { $c++; updateCanvas(); }
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
					for(var i=0; i<data.x.length; i++){ 
						console.log("data"+data.x[i]+" "+data.y[i]+" k "+data.uid[i]); 
						if(data.clicking[i]==0) ch[0]=-1;
						drawExt(data.x[i], data.y[i], 0); 
						$s = data.uid[i];
					}
					console.log('UPdated');
				//	$s = data['s'];
				//	$s = data.uid[data.uid.length-1];
					setTimeout('updateCanvas()',1000);
					},
				error: function(xhr, err) { console.log("Error in updating"+err); //updateCanvas();
				}
			});
		}
		
	function draw(x,y) {
			console.log(x + "|" + y+"|"+chk+"|"+lastX+"|"+lastY);
			context.lineWidth = 1;
			context.lineJoin = "round";
			context.lineCap = "round";
		//	context.strokeStyle = '#003300';
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
			console.log(x + "|" + y+"|"+chk+"|"+lx[user]+"|"+ly[user]);
			ctx.lineWidth = 1;
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
			//ctx.strokeStyle = '#003300';
			if(ch[user]==-1){ ch[user]=1;ctx[user].beginPath();
				ctx[user].moveTo(x-1, y-1);
			}
			else{ ctx[user].moveTo(lx[user], ly[user]); console.log("Moved");}
			ctx[user].lineTo(x,y);
			ctx[user].stroke();
		//	isDragging = true;
			lx[user]=x;
			ly[user]=y;
		}