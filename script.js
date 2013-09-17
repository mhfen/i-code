(function($, global) {

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  function drawText() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "lighter 60px Helvetica Neue";
    ctx.textAlign = "center";
    ctx.fillText("Hi, I'm Matt.", W/2.5, H/2.1);

    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "lighter 60px Helvetica Neue";
    ctx.textAlign = "center";
    ctx.fillText("I", W/1.92, H/2.1);
  }

  var codeText = ['c', 'o', 'd', 'e', '.'];
  var numLetters = codeText.length;

  function drawCodeText(color) {
    ctx.fillStyle = color;
    ctx.font = "lighter 60px Helvetica Neue";
    ctx.textAlign = "center";
    var cX = W/1.89,
        cY = H/2.1;
    for (var i=0; i < numLetters; i++) {
      var c = codeText[i];
      if (i < 4) {
        cX+=31;
      } else {
        cX+=20;
      }
      ctx.fillText(c, cX, cY);
    }
  }

  function explodeText() {
    // Have to clear it every time to redraw
    ctx.clearRect(0, 0, W, H);
    drawText();
    ctx.fillStyle = "rgba(27, 224, 224, 0.8)";
    ctx.font = "lighter 80px Helvetica Neue";
    for (var i=0; i < 4; i++) {
      var c = codeText[i];
      cX = Math.random()*W+1;
      cY = Math.random()*H+1;
      ctx.fillText(c, cX, cY);
    }
  }

  function init() {
    var $canvas = $('canvas'),
        intervalId = 0;

    $canvas.hide();
    drawText();
    drawCodeText("rgba(255, 255, 255, 0.6)");
    $canvas.fadeIn(2000, 'swing');

    setTimeout(function() {
      codeText.pop();
      intervalId = setInterval(explodeText, 150);
    }, 4000);

    setTimeout(function() {
      codeText.push('.');
      clearInterval(intervalId);
      ctx.clearRect(0, 0, W, H);
      drawText();
      drawCodeText("rgba(27, 224, 224, 0.8)");
    }, 8000);

    setTimeout(function() {
      $canvas.fadeOut('slow', 'swing', function() {
        canvas.remove();
      });
    }, 10000);
  }

  init();

}(jQuery, this));