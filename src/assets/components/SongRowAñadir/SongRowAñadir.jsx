import React, { Component } from "react";
import "./SongRowAñadir.css";

class SongRowAñadir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdded: false,
      message: "",
    };
  }

  handleToggleAddSong = () => {
    if (!this.state.isAdded) {
      this.setState({ isAdded: true, message: "Canción añadida" });
      console.log("Agregaste tu canción a favoritos.");
    } else {
      this.setState({ isAdded: false, message: "Canción quitada" });
      console.log("Quitaste la canción de la lista.");
    }

    const { isAdded, onToggleSongSelection } = this.props;
    onToggleSongSelection(isAdded ? null : this.props.songId);
    setTimeout(() => {
      this.setState({ message: "" });
    }, 1000);
  };

  render() {
    const { name, artist, url } = this.props;
    const { isAdded, message } = this.state;

    // URL de la imagen a mostrar, dependiendo del estado
    const imageUrl = isAdded
      ? "https://github.com/EmanuelMdz/Auden-Front/blob/main/src/public/quitar.png?raw=true"
      : "https://raw.githubusercontent.com/EmanuelMdz/Auden-Front/e583d914420197396c1a8539995da5c77f4f142d/src/public/agregar.svg";

    return (
      <>
        <div className="songs-row">
          <div className="song-cover">
            <img src={url} alt="" />
          </div>
          <div className="song-info-container">
            <div className="song-name">{name}</div>
            <div className="song-artist">{artist}</div>
          </div>
          <div className="added-song-container">
            {message && (
              <p
                id="accion-message"
                style={{ color: isAdded ? "green" : "red" }}
              >
                {message}
              </p>
            )}
          </div>
          <div className="song-options">
            <img
              id="agregarCancion"
              src={imageUrl}
              alt=""
              onClick={this.handleToggleAddSong}
            />
          </div>
        </div>
      </>
    );
  }
}

export default SongRowAñadir;
