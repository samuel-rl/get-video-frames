import React, { useState } from 'react';
import './App.css';

const styleHidden = {
	display: 'none',
};

const styleDiv = {
	width: '90%',
	height: '60px',
	border: 'solid black 1px',
	margin: '0px auto',
};

const test = e => {
	e.preventDefault();
	document.getElementById('fileInput').click();
};

window.onmouseover = function(event) {
	event = event || window.event;
	const srcEl = event.srcElement || event.target;
	if (srcEl.classList.contains('img')) {
		this.console.log('ok');
	}
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

		video.style.display = 'none';

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
			this.currentTime += 100;
		}
	}

	function onend(e) {
		var img;
		var sizeWidth = 100 / array.length;
		var divResult = document.getElementById('divResult');
		for (var i = 0; i < array.length; i++) {
			img = new Image();
			img.onload = revokeURL;
			img.src = URL.createObjectURL(array[i]);
			img.style.width = sizeWidth + '%';
			img.style.height = '60px';
			img.classList.add('img');
			divResult.appendChild(img);
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

			<video id="video" src={videoURL} />
			<button onClick={capture}>Capture</button>
			<canvas id="canvas" />
			<p id="progress" />


			<div id="divResult" style={styleDiv} />
		</div>
	);
}

export default App;
