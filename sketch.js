function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent('container')
  x=[]
  y=[]
  m=1
  b=0
  j=0
  k=1
  l=0
  reg=3
  e=0
  ee=1
  eee=0
  eeee=0
}

function clearpoints() {
  x=[]
  y=[]
  m=1
  b=0
  j=0
  k=1
  l=0
  e=0
  ee=1
  eee=0
  eeee=0
}

function draw() {
  background(0);
  fill(255)
  stroke(255)
  if (reg===1){
    line(0,400-b,400,400-400*m-b)
    mnew=m
    bnew=b
    lr=0.01/(x.length+1)
    for (var i=0; i < x.length; i++){
      circle(x[i], 400-y[i], 10)
      error=y[i]-m*x[i]-b
      mnew+=lr*error*x[i]/400
      bnew+=lr*error
      // m=m+lr*error*x[i]/300
      // b=b+lr*error
    }
    m=mnew
    b=bnew
  }
  if (reg===2){
    drawParabola(j,k,l)
    jnew=j
    knew=k
    lnew=l
    lr=0.01/(x.length+1)
    for (var i=0; i < x.length; i++){
      circle(x[i], 400-y[i], 10)
      error=y[i]-j*x[i]*x[i]-k*x[i]-l
      jnew+=lr*error*x[i]*x[i]/160000000
      knew+=lr*error*x[i]/400
      lnew+=lr*error
      // m=m+lr*error*x[i]/300
      // b=b+lr*error
    }
    j=jnew
    k=knew
    l=lnew
  }
  if (reg===3){
    drawCubic(eeee,eee,ee,e)
    enew=e
    eenew=ee
    eeenew=eee
    eeeenew=eeee
    lr=0.01/(x.length+1)
    for (var i=0; i < x.length; i++){
      circle(x[i], 400-y[i], 10)
      error=y[i]-eeee*x[i]*x[i]*x[i]-eee*x[i]*x[i]-ee*x[i]-e
      eeeenew+=lr*error*x[i]*x[i]*x[i]/6400000000000
      eeenew+=lr*error*x[i]*x[i]/160000000
      eenew+=lr*error*x[i]/400
      enew+=lr*error
      // m=m+lr*error*x[i]/300
      // b=b+lr*error
    }
    eeee=eeeenew
    eee=eeenew
    ee=eenew
    e=enew
  }
}

function drawParabola(a,b,c){
  for (var i=0;i<400;i++){
    point(i-1,400-(a*i*i+b*i+c))
  }
}

function drawCubic(a,b,c,d){
  for (var i=0;i<400;i++){
    point(i-1,400-(a*i*i*i+b*i*i+c*i+d))
  }
}

function mouseClicked() {
  if ((mouseX<400)&&(mouseY<400)&&(mouseX>0)&&(mouseY>0)){
    x.push(mouseX)
    y.push(400-mouseY)
  }
}

function functionNameHereIdk() {
  reg=reg%3+1
  if (reg===1){
    document.getElementById("switch").innerHTML="linear"
  }
  if (reg===2){
    document.getElementById("switch").innerHTML="quadratic"
  }
  if (reg===3){
    document.getElementById("switch").innerHTML="cubic"
  }
}
