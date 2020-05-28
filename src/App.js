import React , { useState , Component} from 'react';
import ReactPlayer from 'react-player'
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

    const addFile = (event) => {
        let file = event.target.files[0];
        let url = URL.createObjectURL(file);
        setVideoURL(url);
        setVideoObj(file);
    }

    

	return (
		<div className="App">
			<input id="fileInput" type="file" style={styleHidden} accept="video/*" onChange={addFile} />
			<input type="button" value="Importer un film" onClick={test} />

            <ReactPlayer controls url={videoURL} width="50%" height="50%"></ReactPlayer>

		</div>
	);
}

export default App;
