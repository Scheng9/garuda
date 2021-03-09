let w = 640
let h = 480
let capture;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let eyerX = 0;
let eyerY = 0;
let shlX = 0
let shlY = 0
let shrX = 0
let shrY = 0


let img
function preload(){
img = loadImage('garuda.png')
img2 = loadImage('Shijiahe.png')
  img3 = loadImage('mask.png')
  }

function setup() {
  let canvas =  createCanvas(w, h, WEBGL)
  canvas.parent("#sketch-parent")
  capture = createCapture(VIDEO);
  capture.hide();
  createCanvas(w, h, WEBGL);
  pixelDensity(1);
  
  const poseNet = ml5.poseNet(capture, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  // console.log(poses)
  if (poses.length > 0){
    
  let nX = poses[0].pose.keypoints[0].position.x;
  let nY = poses[0].pose.keypoints[0].position.y;
  let elX = poses[0].pose.keypoints[1].position.x;
  let elY = poses[0].pose.keypoints[1].position.y;
  let erX = poses[0].pose.keypoints[2].position.x;
  let erY = poses[0].pose.keypoints[2].position.y;
  let slX = poses[0].pose.keypoints[5].position.x;
  let slY = poses[0].pose.keypoints[5].position.y;
  let srX = poses[0].pose.keypoints[6].position.x;
  let srY = poses[0].pose.keypoints[6].position.y;
  noseX = lerp(noseX, nX, 0.9);
  noseY = lerp(noseY, nY, 0.9);
  eyelX = lerp(eyelX, elX, 0.6);
  eyelY = lerp(eyelY, elY, 0.6);
  eyerX = lerp(eyerX, erX, 0.6);
  eyerY = lerp(eyerY, erY, 0.6);
  shlX = lerp(shlX, slX, 0.8);
  shlY = lerp(shlY, slY, 0.8);
  shrX = lerp(shrX, srX, 0.8);
  shrY = lerp(shrY, srY, 0.8)

}
}
function modelReady(){
  
}
function draw() {
   background(220);
   noStroke()
  // push();
  //  translate(width, 0);
  //  scale(-1,1);
  //  image(capture, 0, 0, w, h);
  // pop();
  
  // let d = dist(eyerX, eyerY, eyelX, eyelY)/2
     let d = dist(eyerX, eyerY, noseX, noseY)/2
  // let d = dist(shlX, shlY, shrX, shrY)/40
     let leftEye = createVector(eyerX, eyerY);
     let rightEye = createVector(eyelX, eyelY);
     let nose = createVector(noseX, noseY);
     
     let averageEye = p5.Vector.lerp(leftEye, rightEye, 0.5);
     let eyeToNoseDist = dist(averageEye.x, averageEye.y, nose.x, nose.y);
     let eyeDistance = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
      
     let leftEyeToNoseDist = dist(leftEye.x, leftEye.y, nose.x, nose.y);
     let rightEyeToNoseDist = dist(rightEye.x, rightEye.y, nose.x, nose.y);
  
     
  // console.log(eyeDistance)
  //console.log(averageEye);
  
  push();
  //center the canvas when in WEBGL mode
  translate(-width/2, -height/2);
    push();
      // mirror the canvas
      translate(width, 0);
      scale(-1, 1);
    image(capture, 0, 0);
// this.display = function() {
  
  
 
  let g = color('gold')
  let c = color('crimson')
  fill(g);
  ellipse(eyelX+20, eyelY, d/0.5, 30)
  fill(c);
  ellipse(eyelX+20, eyelY, d/2)
  
  fill(g);
  ellipse(eyerX-20, eyerY,d/0.5, 30)
  fill(c);
  ellipse(eyerX-20, eyerY, d/2)
  
  // push()
  // imageMode (CENTER)
  // image(img2, (noseX), (noseY), d*17, d*13);
  // pop()
 
  let shouldRotate;
  if(abs(leftEyeToNoseDist - rightEyeToNoseDist) <6) {
    shouldRotate = false;
  } else {
    shouldRotate = true;
  }
  
  
  console.log("eyeToNoseDist:", eyeToNoseDist);
  // change the values in map to refine the rotation
  let rotationAmount = map(eyeToNoseDist, 20, 60, 0, PI/3, true)
  push()
    
    imageMode(CENTER);
    push()
      translate(noseX, noseY-45, img.width/15);
    // change 'true' to shouldRotate on line 129 if you want the rotation to always happen
    if(shouldRotate) {
      if(leftEyeToNoseDist > rightEyeToNoseDist) {
          rotateY(rotationAmount);
        } else {
          rotateY(-rotationAmount);
        }
    } else {
      rotateY(0);
    }
      
    
          image(img, 0, 0, d*10, d*13) // garuda
      // image(img3, 0, 80, d*14, d*10) //surgical
      // image(img2, 0, 50, d*20, d*13) // shijiahe
   
    pop();
  
  // push()
  //  image(img3, (noseX), (noseY+57), d*16, d*10); // surgical
  // pop()
  
  fill(g);
  ellipse(shlX+11, shlY, d, d)
  
  fill(g);
  ellipse(shrX-11, shrY, d, d)
  
  
  
  pop(); // close push() that deals with mirroring
  pop(); // close push() that deals with centering in WEBGL mode

  
  // fill(255, 0, 0);
  // ellipse(noseX, noseY, 80);
     
}

function keyPressed() {
  if(key == ' ') {
    save('mask.png');
  }
}
