import React, { Component } from "react";
// import "./App.css";

import firebase from "firebase/app";
import "firebase/storage";
import FileUploader from "react-firebase-file-uploader";
import config from "./firebase-config";

firebase.initializeApp(config);

class App extends Component {
  // state
  state = {
    image: "",
    imageURL: "",
    progress: 0
  };

  // functions
  handleUploadStart = () => {
    this.setState({
      progress: 0
    });
  };

  handleUploadSuccess = filename => {
    this.setState({
      image: filename,
      progress: 100
    });

    firebase
      .storage()
      .ref("avatars")
      .child(filename)
      .getDownloadURL()
      .then(url =>
        this.setState({
          imageURL: url
        })
      );
  };

  handleProgress = progress => {
    this.setState({ progress });
  };

  render() {
    console.log(this.state);

    return (
      <div>
        <label>Progress</label>
        <p>{this.state.progress}</p>
        <br />
        <label>Image</label>
        <br />
        {this.state.image && (
          <img
            src={this.state.imageURL}
            alt=""
            style={{ height: "300px", width: "400px" }}
          />
        )}
        <br />
        {this.state.imageURL && <a href={this.state.imageURL}>Download Me</a>}
        <br />
        <FileUploader
          accept="image/*"
          name="image"
          storageRef={firebase.storage().ref("avatars")}
          onUploadStart={this.handleUploadStart}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
      </div>
    );
  }
}

export default App;
