song = " "

scoreRW = 0
scoreLW = 0

LwristX = 0
RwristX = 0

LwristY = 0
RwristY = 0

function preload(){
    song = loadSound("1 (mp3cut.net).mp3")
}

function setup(){
    canvas = createCanvas(675, 500)
    canvas.center()
    v = createCapture(VIDEO)
    v.hide()

    pn = ml5.poseNet(v, modelLoaded)
    pn.on("pose", getposes)
}

function modelLoaded(){
    console.log("posenet initialised")
}

function getposes(results){
    if (results.length > 0) {
        
        scoreRW = results[0].pose.keypoints[10].score
        scoreLW = results[0].pose.keypoints[9].score

        LwristX = results[0].pose.leftWrist.x
        RwristX = results[0].pose.rightWrist.x

        LwristY = results[0].pose.leftWrist.y
        RwristY = results[0].pose.rightWrist.y

    }
}

function draw(){
    image(v, 0, 0, 675, 500)
    
    fill("red")
    stroke("red")

    if(scoreLW > 0.2){


    text("Speed", LwristX, LwristY)

    if(LwristX > 0 && LwristY <= 100){
        document.getElementById("speed").innerHTML =  "Speed = 0.5x"
        song.rate(0.5)
    }
    else if(LwristX > 100 && LwristY <= 200){
        document.getElementById("speed").innerHTML =  "Speed = 1x"
        song.rate(1)
    }
    else if(LwristX > 200 && LwristY <= 300){
        document.getElementById("speed").innerHTML =  "Speed = 1.5x"
        song.rate(1.5)
    }
    else if(LwristX > 300 && LwristY <= 400){
        document.getElementById("speed").innerHTML =  "Speed = 2x"
        song.rate(2)
    }
    else if(LwristX > 400 && LwristY <= 500){
        document.getElementById("speed").innerHTML =  "Speed = 2.5x"
        song.rate(2.5)
    }
    
       

    }

    if(scoreRW > 0.2){
    

    text("Volume",RwristX, RwristY)

    n = Number(RwristY)

    r = Math.floor(n)

    volume = r/500

    document.getElementById("vol").innerHTML = "Volume = " + Math.floor(volume*100)

    song.setVolume(volume)
    }
}

function Play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}