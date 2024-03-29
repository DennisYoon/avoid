function setup() {
  createCanvas(800, 450);
  xOfC = Array(1).fill(random(0, 760));
  yOfC = Array(1).fill(random(-80, - 320));
  speedOfC = Array(1).fill(random(4, 8));
  colorOfC = Array(1).fill([random(0, 255), random(0, 255), random(0, 255)]);
  xOfFirstTriangle = random(-100, -2000);
  backgroundColor = [random(0, 255), random(0, 255), random(0, 255)];
  playerColor = [random(0, 255), random(0, 255), random(0, 255)];
  setInterval(showConsole, 100);
  document.querySelector("body").style.margin = 0;
  document.querySelector("canvas").style.position = "absolute";
  document.querySelector("canvas").style.borderRadius = "20px";
  document.querySelector("canvas").style.boxShadow = "0px 0px 60px rgba(0, 0, 0, .7)";

  
}
function draw() {
  background(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
  textShowing();
  nextLevelAni();
  cMoving();
  bottomShowing();
  levelShowing();
  timerShowing();
  amaountOfCPlusing();
  mainCharacterMoving();
  gameOverAni();
  buttonPerformance();
  activeStyles();
}
function mainCharacterMoving() {
  noStroke();
  xCoordinateMoving();
  yCoordinateMoving();
  text("")
  // rect(x, y, 50, 50);
}
function xCoordinateMoving() {
  if (keyIsDown(LEFT_ARROW) || (mouseIsPressed && mouseX < 400 && mouseX > 0 && mouseY > 225 && mouseY < 450)) {
    removeAvoidC = true;
    moveX -= 0.5;
  }
  if (keyIsDown(RIGHT_ARROW) || (mouseIsPressed && mouseX > 400 && mouseX < 800 && mouseY > 225 && mouseY < 450)) { 
    removeAvoidC = true;
    moveX += 0.5;
  }
  if (x > 750) {
    moveX = 0;
    x = 750;
  }
  if (x < 0) {
    moveX = 0;
    x = 0;
  }
  moveX *= 0.909;
  if (gameOver === false)
    x += moveX;
}
function yCoordinateMoving() {
  if ((keyIsDown(UP_ARROW) && y > 399) || (mouseIsPressed && mouseY > 0 && mouseY < 255 && y > 399)) {
      removeAvoidC = true;
      moveY = -7;
      if (gameOver === false) {
        playerColor = [random(255), random(255), random(255)];
        backgroundColor = [random(255), random(255), random(255)];
      }
  } else if (y > 400) {
    moveY = 0;
    y = 400;
  } else {
    moveY += 0.2;
  }
  if (gameOver === false)
    y += moveY;
  fill(playerColor[0], playerColor[1], playerColor[2]);
  rect(x, y, 50, 50);
  
}
function cMoving() {
  for (let i = 0; i < xOfC.length; i++) {
    fill(colorOfC[i][0], colorOfC[i][1], colorOfC[i][2]);
    rect(xOfC[i], yOfC[i], 40, 80);
    if (removeAvoidC) {
      if (gameOver === false)
        yOfC[i] += speedOfC[i];
    }
    if (yOfC[i] > 480) {
      yOfC[i] = random(-80, -320);
      xOfC[i] = random(0, 760);
      speedOfC[i] = random(4, 8);
      colorOfC[i] = [random(0, 255), random(0, 255), random(0, 255)];
    }
    if (x - xOfC[i] < 40 && x - xOfC[i] > -50 && y - yOfC[i] < 80 && y - yOfC[i] > -50 && dieAble) {
      gameOver = true;
    }
  }
  
}
function textShowing() {
    fill(fontColor[0], fontColor[1], fontColor[2], fontColor[3]);
    textSize(60);
    textFont("Black Han Sans");
    text("어보이드", 300, 70);
    textSize(30);
    text("시작하려면 방향키를 누르세요", 225, 100);
    if (removeAvoidC === true) {
      fontColor[3] -= 10;
    }
}
function timerShowing() {
  fill("black");
  textSize(30);
  textFont("Segoe UI");
  if (removeAvoidC) {
    if (gameOver === false) {
      timer += 1 / 60;
      nextLevel--;
    }
  }
  if (nextLevel === 0) {
    console.log("shown!");
    nextLevel = 1200;
    nextLevelAnim = true;
  }
  text(`${Math.floor(timer)}초`, 30, 50);
  if (gameOver === false && removeAvoidC) {
    if (dieAble) {
      document.title = "어보이드 | " + Math.floor(timer) + "초";
    } else {
      document.title = "어보이드 | " + Math.floor(timer) + "초 | invincibility";
    }
  }
}
function levelShowing() {
  fill("black");
  textSize(30);
  textFont("Segoe UI");
  text(`${Math.floor(Math.floor(timer) / 20) + 1}단계`, 30, 100);
}
function amaountOfCPlusing() {
  if (Math.floor(timer) % 20 === 0 && Math.floor(timer) != 0 && addAble == true) {
      xOfC.push(random(0, 760));
      yOfC.push(random(-80, - 320));
      speedOfC.push(random(4, 8));
      colorOfC.push([random(0, 255), random(0, 255), random(0, 255)]);
      addAble = false;
  }
  if (Math.floor(timer) % 20 != 0) {
    addAble = true;
  }
  if (timer > 200) {
    xOfC.push(random(0, 760));
    yOfC.push(random(-80, - 320));
    speedOfC.push(random(4, 8));
    colorOfC.push([random(0, 255), random(0, 255), random(0, 255)]);
    addAble = false;
  }
}
function bottomShowing() {
  fill("red");
  if (removeAvoidC) {
    for (let i = 0; i < 150; i += 30) {
      triangle(xOfFirstTriangle -i, 450, xOfFirstTriangle + 30 -i, 450, xOfFirstTriangle + 15 -i, 420);
    }
    if (gameOver === false)
      xOfFirstTriangle += 5 + 2 * (Math.floor(Math.floor(timer) / 20) + 1);
    if (xOfFirstTriangle > 1000) {
      xOfFirstTriangle = random(-100, -2000);
    }
    if (x - xOfFirstTriangle < 20 && x - xOfFirstTriangle > -150 && y > 370 && dieAble) {
      gameOver = true;
    }
  }
}
function nextLevelAni() {
  if (nextLevelAnim) {
    if (gameOver === false)
      xOfInterval = xOfInterval < 299 ? (xOfInterval + (300 - xOfInterval) / 10) : (xOfInterval + (1201 - xOfInterval) / 10);
    fill("black");
    textSize(50);
    textFont("Black Han Sans");
    text(`${Math.floor(Math.floor(timer) / 20) + 1}단계 시작`, xOfInterval, 225);
    if (xOfInterval > 1200) {
      xOfInterval = -400;
      nextLevelAnim = false;
    }
  }
}
function gameOverAni() {
  if (gameOver) {
    if (gameOverBackGroundColor[3] < 200) {
      gameOverBackGroundColor[3] += 4;
      boxShadowColor[0] += 6.8;
      gameOverText += 6.8;
    }
    document.title = "어보이드 | Game Over";
    fill(gameOverBackGroundColor[0], gameOverBackGroundColor[1], gameOverBackGroundColor[2], gameOverBackGroundColor[3]);
    document.querySelector("canvas").style.boxShadow = `0px 0px 60px rgba(${boxShadowColor[0]}, 0, 0, .7)`;
    rect(0, 0, 800, 450);
    fill(255, 255, 255, gameOverText);
    textSize(60);
    textFont("Black Han Sans");
    text(`당신의 기록: ${Math.floor(timer)}초`, 200, 200);
    fill(255, 0, 0, gameOverText);
    textSize(30);
    text("GAME OVER!!", 300, 100);
    fill(reStartButtonColor[0], reStartButtonColor[1], reStartButtonColor[2], gameOverText);
    rect(290, 280, 200, 50, 20);
    fill(0, 0, 0, gameOverText);
    text("다시 시작", 333, 317);
  }
}
function buttonPerformance() {
  if (gameOver) {
    if (mouseX > 290 && mouseX < 290 + 200 && mouseY > 280 && mouseY < 280 + 50) {
      reStartButtonColor = [207, 207, 207];
      if (mouseIsPressed) {
        location.reload();
      }
    } else {
      reStartButtonColor = [255, 255, 255];
    }
  }
}
function activeStyles() {
  if ((document.documentElement.clientWidth - 800) / 2 <= 0 || (document.documentElement.clientHeight - 450) / 2 <= 0) {
    document.querySelector("canvas").style.display = "none";
    document.querySelector("div").style.display = "block";
    document.querySelector("div").style.left = `${(document.documentElement.clientWidth - 200) / 2}px`;
    document.querySelector("div").style.top = `${(document.documentElement.clientHeight - 30) / 2}px`;
    
  } else {
    document.querySelector("canvas").style.display = "block";
    document.querySelector("canvas").style.left = `${(document.documentElement.clientWidth - 800) / 2}px`;
    document.querySelector("canvas").style.top = `${(document.documentElement.clientHeight - 450) / 2}px`;
    document.querySelector("div").style.display = "none";
  }
  if (gameOver === false)
    document.querySelector("canvas").style.boxShadow = dieAble ? "0px 0px 60px rgba(0, 0, 0, .7)" : "0px 0px 60px rgba(0, 0, 255, .7)";
}
function showConsole() {
  // console.clear();
  // // console.log(`x좌표: ${x}\ny좌표: ${y}`);
  // // console.log(speedOfC);
  // // console.log(timer);
  // console.log(mouseX);
  // console.log(mouseY);
}