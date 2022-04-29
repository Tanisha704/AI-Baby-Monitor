song=""
status=""

objects=[];
function preload(){
    song=loadSound("fire_alarm.mp3")
}
function setup(){
    canvas=createCanvas(380,380)
    canvas.center()
    video=createCapture(VIDEO)
    video.size(380,380)
    video.hide()
    objectDetector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="status-Detecting Objects"
}


function modelLoaded(){
console.log("model loaded")
status=true
}

function gotResult(error, results){
if (error) {
    console.log(error)
} else {
    console.log(results)
    objects= results;
}
}

function draw(){
    image(video,0,0,380,380)
    if (status !="") {
        objectDetector.detect(video, gotResult)
        r=random(255)
        g=random(255)
        b=random(255)

        for ( i = 0; i < objects.length; i++) {
            fill(r,g,b)
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%",objects[i].x-15,objects[i].y-15)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
            document.getElementById("status").innerHTML="status Objects-detected"
            if(objects[i].label == "person")
         {
           document.getElementById("number").innerHTML = "Baby Found";
       
           song.stop();
         }
         else
         {
           document.getElementById("number").innerHTML = "Baby Not Found";
        
           song.play();
         }
        }
 
       if(objects.length == 0)
       {
         document.getElementById("number").innerHTML = "Baby Not Found";
     
         song.play();
       }

        }
    }
   
