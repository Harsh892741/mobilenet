function setup() {
  canvas = createCanvas(250, 250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("mobilenet",modelLoaded);
}

function modelLoaded(){
  console.log("model loaded");
}

function draw(){
  image(video, 0, 0, 250, 250);
  classifier.classify(video, gotResult);
}

var previous_result = "";

function gotResult(error, results){
  if(error){
    console.error(error);
    
  }
  else{
    if((results[0].confindence>0.5)&&(previous_result!=results[0].label)){
      console.log(results);
      previous_result = results[0].label;
      var synth = window.speechSynthesis;
      speakdata = "The Object Detected is - "+results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speakdata);
      synth.speak(utterThis);

      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_accuracy").innerHTML = results[0].confindence.toFixed(3);
    }
  }
}



