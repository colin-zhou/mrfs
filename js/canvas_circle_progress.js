      // html5 canvas - draw a circle progress bar
      var drowProgress = function(x,y,radius,process,backColor,proColor,fontColor){
        var canvas = document.getElementById('myCanvas');
        if (canvas.getContext) {
          var cts = canvas.getContext('2d');
        }else{
          return;
        }
        cts.beginPath();
        cts.moveTo(x, y);
        cts.arc(x, y, radius, 0, Math.PI * 2, false);
        cts.closePath();
        cts.fillStyle = backColor;
        cts.fill();
  
        cts.beginPath();
        cts.moveTo(x, y);
        cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 1.5 -  Math.PI * 2 * process / 100, true);
        cts.closePath();
        cts.fillStyle = proColor;
        cts.fill();
        
        cts.beginPath();
        cts.moveTo(x, y);
        cts.arc(x, y, radius - (radius * 0.26), 0, Math.PI * 2, true);
        cts.closePath();
        cts.fillStyle = 'rgba(255,255,255,1)'; // white
        cts.fill();
  
        cts.beginPath();  
        cts.arc(x, y, radius-(radius*0.30), 0, Math.PI * 2, true);  
        cts.closePath();
        cts.strokeStyle = backColor;  
        cts.stroke();
        cts.font = "bold 9pt Arial";
        cts.fillStyle = fontColor;
        cts.textAlign = 'center';
        cts.textBaseline = 'middle';
        cts.moveTo(x, y);
        cts.fillText(process+"%", x, y);
      };
      
      // package a drawProgress function to hidden the color input
      var colorDraw = function(x, y, radius, l) {
        if(l > 100 || l < 0)
          return;
        var drawColor = '#FF7F50';
        if(l >= 80) {
          drawColor = '#E74C3C';
        } else if (l >= 50) {
          drawColor = '#FF7F50';
        } else {
          drawColor = '#6495ED';
        }
        drowProgress(x,y,radius,l,'#ddd',drawColor,drawColor);
      }
      
      // draw three load average progress
      var drawLoadAverage = function(l1, l2, l3) {
        colorDraw(80,45,40,l1);
        colorDraw(273,45,40,l2);
        colorDraw(468,45,40,l3);
      }
      $( "#progressbar" ).progressbar({ value: 37 });
      drawLoadAverage(82,53,30);