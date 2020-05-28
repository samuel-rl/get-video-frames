import React, { useState, Component, createContext } from 'react';
import ReactPlayer from 'react-player';
import './App.css';

const colors = {};

const styleHidden = {
	display: 'none',
};

const test = e => {
	e.preventDefault();
	document.getElementById('fileInput').click();
};

function App() {
	const [videoURL, setVideoURL] = useState(null);
    const [videoObj, setVideoObj] = useState(null);
    
    var array = [];

	const addFile = event => {
		let file = event.target.files[0];
		let url = URL.createObjectURL(file);
		setVideoURL(url);
		setVideoObj(file);
    };
    
    var video = null;
    var canvas = null;
    var ctx = null;
    var pro = null;

	const capture = () => {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        pro = document.querySelector('#progress');

        video.addEventListener('ended', onend, false);
        video.addEventListener('timeupdate', drawFrame, false);

        video.play()



        /*
		var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        */
    };

    function drawFrame(e) {
        this.pause();
        ctx.drawImage(this, 0, 0);
        /* 
        this will save as a Blob, less memory consumptive than toDataURL
        a polyfill can be found at
        https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Polyfill
        */
        canvas.toBlob(saveFrame, 'image/jpeg');
        pro.innerHTML = ((this.currentTime / this.duration) * 100).toFixed(2) + ' %';
        if (this.currentTime < this.duration) {
          this.play();
        }
      }

    function onend(e) {
        var img;
        // do whatever with the frames
        for (var i = 0; i < array.length; i++) {
          img = new Image();
          img.onload = revokeURL;
          img.src = URL.createObjectURL(array[i]);
          document.body.appendChild(img);
        }
        // we don't need the video's objectURL anymore
        URL.revokeObjectURL(this.src);
        console.log(array)
      }
    
    function saveFrame(blob) {
        array.push(blob);
      }

      function revokeURL(e) {
        URL.revokeObjectURL(this.src);
      }

	return (
		<div className="App">
			<input id="fileInput" type="file" style={styleHidden} accept="video/*,.mkv" onChange={addFile} />
			<input type="button" value="Importer un film" onClick={test} />

			<video id="video" controls src={videoURL} width="100%" height="50%" />
			<button onClick={capture}>Capture</button>
			<canvas id="canvas" />
            <p id="progress"></p>
		</div>
	);
}

export default App;
