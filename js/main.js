var clicking=false, chk=-1, lastX, lastY;
			var canvas;
			var context;
        $(document).ready(function(e) {
			canvas = document.getElementById('A');
			context = canvas.getContext("2d");
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
			});
        });
		function draw(x,y) {
			console.log(x + "|" + y+"|"+chk+"|"+lastX+"|"+lastY);
			context.lineWidth = 5;
			context.lineJoin = "round";
			context.lineCap = "round";
		//	context.strokeStyle = '#003300';
			if(chk==-1){ chk=1;context.beginPath();
				context.moveTo(x-1, y-1);
			}
			else{ context.moveTo(lastX, lastY); console.log("Moved");}
			context.lineTo(x,y);
			context.stroke();
		//	isDragging = true;
			lastX=x;
			lastY=y;
		}