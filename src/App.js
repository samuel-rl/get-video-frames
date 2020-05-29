import React, { useState } from 'react';
import './App.css';

const colors = [];

const styleHidden = {
	display: 'none',
};

const test = e => {
	e.preventDefault();
	document.getElementById('fileInput').click();
};

function App() {
	const [videoURL, setVideoURL] = useState(null);
	var array = [];
	const addFile = event => {
		let file = event.target.files[0];
		let url = URL.createObjectURL(file);
		setVideoURL(url);
	};

	var video = null;
	var canvas = null;
	var ctx = null;
	var pro = null;

	const capture = () => {
		video = document.getElementById('video');
		canvas = document.getElementById('canvas');
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		ctx = canvas.getContext('2d');

		pro = document.querySelector('#progress');

		video.addEventListener('ended', onend, false);
        video.addEventListener('timeupdate', drawFrame, false);
        video.play();
	};

	function drawFrame(e) {
        this.pause();
		ctx.drawImage(this, 0, 0);
		canvas.toBlob(saveFrame, 'image/jpeg');

		pro.innerHTML = (this.currentTime / this.duration * 100).toFixed(2) + ' %';
		if (this.currentTime < this.duration) {
			this.currentTime += 60;
        }
	}

	function onend(e) {
		var img;
		for (var i = 0; i < array.length; i++) {
			var node = document.createElement('br');
			img = new Image();
			img.onload = revokeURL;
			img.src = URL.createObjectURL(array[i]);
			document.body.appendChild(img);
			document.body.appendChild(node);
		}
		URL.revokeObjectURL(this.src);
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

			<video id="video"  src={videoURL} />
			<button onClick={capture}>Capture</button>
			<canvas id="canvas" />
			<p id="progress" />
		</div>
	);
}

export default App;
