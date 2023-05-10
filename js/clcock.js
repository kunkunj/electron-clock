(function () {
  let canvas = document.getElementById("canvas");
  let oW = canvas.width;
  let oH = canvas.height;
  let context = canvas.getContext("2d");
  let radius = canvas.height / 2;
  context.translate(canvas.height / 2, canvas.height / 2);
  radius = radius * 0.9;
  draw();
  function draw() {
    canvas.height = Math.round(oH * window.devicePixelRatio);
    canvas.width = Math.round(oW * window.devicePixelRatio);
    canvas.style.height = oH + "px";
    canvas.style.width = oW + "px";
    context.translate(canvas.height / 2, canvas.height / 2);
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
    // console.log(Datas.getState())
    drawClock();
    requestAnimationFrame(draw);
  }
  //创建一个绘制时钟的函数：
  function drawClock() {
    drawFace(context, radius);
    // drawNumbers(context, radius);
    drawLine(context, radius);
    drawTime(context, radius);
  }
  function drawFace(context, radius) {
    let gradient;
    //起始一条路径，或重置当前路径
    context.beginPath();
    //画出白色圆圈：
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    //设置或返回用于填充绘画的颜色、渐变或模式
    context.fillStyle = "rgba(255,255,255,0)";
    //填充当前绘图（路径）
    context.fill();
    //创建径向渐变（原始时钟半径的95％和105％）：
    gradient = context.createRadialGradient(
      0,
      0,
      radius * 0.98,
      0,
      0,
      radius * 1
    );
    //创建3个颜色停止点，对应于弧的内边，中边和外边：
    //颜色停止会产生3D效果
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0)");
    gradient.addColorStop(0.9, "rgba(255,255,255,0)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    //将渐变定义为绘图对象的笔触样式：
    context.strokeStyle = gradient;
    //定义图纸对象的线宽（半径的10％）：
    context.lineWidth = radius * 0.1;
    //画圆圈：
    context.stroke();
    //画时钟中心：
    context.beginPath();
    //创建弧/曲线（用于创建圆形或部分圆）
    context.arc(0, 0, radius * 0.04, 0, 2 * Math.PI);
    context.fillStyle = "#5ecfb4";
    context.fill();
    context.closePath();
  }

  /**
   * 第三部分 - 绘制时钟数
   * @param context -2D绘图对象
   * * @param radius -时钟半径
   */
  function drawNumbers(context, radius) {
    let angle;
    let num;
    //将（绘图对象的）字体大小设置为半径的15％：
    context.font = radius * 0.15 + "px arial";
    //设置或返回在绘制文本时使用的当前文本基线
    context.textBaseline = "middle";
    //设置或返回文本内容的当前对齐方式。
    context.textAlign = "center";
    //计算打印位置（12个数字）到半径的85％，每个数字旋转（PI / 6）：
    for (num = 1; num <= 12; num++) {
      angle = (num * Math.PI) / 6;
      context.rotate(angle);
      //重新映射画布上的 (0,0) 位置
      context.translate(0, -radius * 0.85);
      context.rotate(-angle);
      //在画布上绘制"被填充的"文本
      context.fillText(num.toString(), 0, 0);
      context.rotate(angle);
      context.translate(0, radius * 0.85);
      context.rotate(-angle);
    }
  }

  /**
   * 第四部分 -画时钟表格线
   * @param context -2D绘图对象
   * @param radius -时钟半径
   */
  function drawLine(context, radius) {
    let i;
    for (i = 1; i <= 60; i++) {
      context.beginPath();
      context.rotate((i * Math.PI) / 30);
      context.strokeStyle = "#55B3B9";
      if (i % 5 == 0) {
        context.lineWidth = radius * 0.02;
        context.moveTo(0, -radius * 0.83);
        context.lineTo(0, -radius * 0.9);
      } else {
        context.moveTo(0, -radius * 0.88);
        context.lineTo(0, -radius * 0.9);
        context.lineWidth = radius * 0.01;
      }
      context.stroke();
      context.rotate((-i * Math.PI) / 30);
    }
  }

  /**
   * 第五部分 - 画时钟指针
   * @param context -2D绘图对象
   * @param radius -时钟半径
   */
  function drawTime(context, radius) {
    //使用日期获取小时，分钟，秒：
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    //绘制时针
    hours = hours % 12;
    // 计算时针的角度
    hours =
      (hours * Math.PI) / 6 +
      (minutes * Math.PI) / (6 * 60) +
      (seconds * Math.PI) / (6 * 60 * 60);
    //绘制一个长度（半径的50％）和宽度（半径的5％）的时针：
    drawHand(context, hours, radius * 0.4, radius * 0.03, "#E38C63");
    //绘制分针
    minutes = (minutes * Math.PI) / 30 + (seconds * Math.PI) / (30 * 60);
    drawHand(context, minutes, radius * 0.7, radius * 0.02, "#E38C63");
    // 绘制秒针
    seconds = (seconds * Math.PI) / 30;
    drawHand(context, seconds, radius * 0.8, radius * 0.01, "#767B78");
  }

  /**
   * 绘制一条给定长度和宽度,并指定颜色的线,用来画各种表针
   * @param context -2D绘图对象
   * @param pos -旋转角度
   * @param length -长度
   * @param width -宽度
   */
  function drawHand(context, pos, length, width, color) {
    //起始一条路径，或重置当前路径
    context.beginPath();
    //设置或返回当前的线条宽度
    context.lineWidth = width;
    //设置或返回线条的结束端点样式
    //round    向线条的每个末端添加圆形线帽
    context.lineCap = "round";
    //把路径移动到画布中的指定点，不创建线条
    context.moveTo(0, 0);
    //旋转当前绘图
    context.rotate(pos);
    //添加一个新点，然后在画布中创建从该点到最后指定点的线条
    context.lineTo(0, -length);
    context.strokeStyle = color;
    //绘制已定义的路径
    context.stroke();
    context.rotate(-pos);
  }
})();
