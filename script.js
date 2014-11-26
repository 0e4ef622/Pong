var c=document.getElementById("c"),ctx,w=window.innerWidth,h=window.innerHeight,ball={x:w/2,y:h/2,vx:0,vy:h/230},p1={x:w/2,dir:0,w:w/7},p2={x:w/2,dir:0,w:w/7};
var tmp=(w<h)?w:h;
ball.r=tmp/80;
c.width=w;
c.height=h;
ctx=c.getContext("2d");
c.ontouchstart=c.ontouchmove=function(e){
e.preventDefault();
for(var i=0;i<e.touches.length;i++){
var cur=e.touches[i];
var p=p1;
if(cur.pageY<=h/2){
p=p2;
}
if(cur.pageX<w/2){
p.dir=-1;
}else{
p.dir=1;
}
}
}
c.ontouchend=function(e){
if(e.touches.length>0){
c.ontouchstart(e);
}else{
p1.dir=0;
p2.dir=0;
}
}
setInterval(function(){
ctx.clearRect(0,0,w,h);
ctx.beginPath();
ctx.fillStyle="white";
ctx.fillRect(p1.x-p1.w/2,h-27,p1.w,12); //draw p1 paddle
ctx.fillRect(p2.x-p2.w/2,15,p1.w,12); //draw p2 paddle
ctx.arc(ball.x,ball.y,ball.r,0,8); //draw ball
ctx.fill();
p1.x+=p1.dir*w/100;
p2.x+=p2.dir*w/100;
if(p1.x<p1.w/2+10){
p1.x=p1.w/2+10;
}else if(p1.x>w-p1.w/2-10){
p1.x=w-p1.w/2-10;
}
if(p2.x<p2.w/2+10){
p2.x=p2.w/2+10;
}else if(p2.x>w-p2.w/2-10){
p2.x=w-p2.w/2-10;
}
ball.x+=ball.vx;
ball.y+=ball.vy;
if(ball.x<ball.r){
ball.x=ball.r;
ball.vx=-ball.vx;
}else if(ball.x>w-ball.r){
ball.x=w-ball.r;
ball.vx=-ball.vx;
}
if(ball.y+ball.r>h-27&&ball.y+ball.r<h-27+h/150+1&&ball.x>=p1.x-p1.w/2&&ball.x<=p1.x+p1.w/2){
ball.y=h-27-ball.r;
var a=Math.random()*-(Math.PI/2)-Math.PI/4;
ball.vy=Math.sin(a)*h/150;
ball.vx=Math.cos(a)*h/150;
}else if(ball.y-ball.r<27&&ball.y-ball.r>27-h/150-1&&ball.x>=p2.x-p2.w/2&&ball.x<=p2.x+p2.w/2){
ball.y=27+ball.r;
ball.vy=-ball.vy;
}
},10)