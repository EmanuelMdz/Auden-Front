import React from "react";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BackgroundC from "../../components/BackgroundC/BackgroundC";
import { useEffect, useState } from "react";
import { LoadingScreen } from "../../components/LoadingWindow";
import CardPortadaMultiple from "../../components/CardPortadaMultiple/CardPortadaMultiple";
import Nav_Bar from "../../components/Nav_bar";
import cookies from "js-cookie";

export const UserProfile = () => {
  const [loading, setLoading] = useState(true); // Initialize loading state as true
  const [DataUsers, setDataUsers] = useState([]);
  const [userPlaylistData, setUserPlaylistData] = useState([]);
  const navigate = useNavigate();

  //-----------Pruebas---------------
  const userDataToStore = {
    user_id: DataUsers.user_id,
    user_name: DataUsers.user_name,
    user_username: DataUsers.user_username,
  };
  console.log(userDataToStore);

  localStorage.setItem("UserData", JSON.stringify(userDataToStore));

  //---------------------------------

  // localStorage.setItem("DataUsers", JSON.stringify(DataUsers));

  const goToCrearPlaylist = useNavigate("/crear-playlist");

  useEffect(() => {
    const fetchData = async () => {
      const token = cookies.get("userToken");
      if (!token) {
        // Si no hay token almacenado en las cookies, el usuario no está autenticado.
        // Puedes manejar esta situación según tus requerimientos, por ejemplo, redirigiendo al usuario a la página de inicio de sesión.
      } else {
      }
      try {
        const response = await fetch(
          `https://auden-back-tau.vercel.app/users/playlist/`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        const data = await response.json();
        setDataUsers(data[0]);
        setUserPlaylistData(data);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      } catch (error) {
        console.log("fallo", error);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };

    fetchData();
  }, []);

  const groupSongsByPlaylist = () => {
    // Creamos un objeto para agrupar las canciones por playlist_id
    const songsByPlaylist = {};

    // Iteramos sobre cada canción y las agrupamos por playlist_id
    userPlaylistData.forEach((songData) => {
      const playlistId = songData.playlist_id;
      if (!songsByPlaylist[playlistId]) {
        // Si la playlist no existe en el objeto, la creamos
        songsByPlaylist[playlistId] = {
          playlist_id: playlistId,
          playlist_name: songData.playlist_name,
          user_username: DataUsers.user_username,
          songs: [],
        };
      }
      // Agregamos la canción a la playlist correspondiente
      songsByPlaylist[playlistId].songs.push({
        song_name: songData.song_name,
        song_image_url: songData.song_image_url,
      });
    });

    return Object.values(songsByPlaylist); // Devolvemos un array de playlists
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <BackgroundC>
          <div className="picture-name-container fade-in-left">
            <div className="picture-container">
              <div id="profile-photoo" className="profile-photo">
                <img
                  src="https://github.com/EmanuelMdz/Auden-Front/blob/main/src/public/user-default.png"
                  alt=""
                />
              </div>
            </div>

            <div className="name-container">
              <h2>{userDataToStore.user_name}</h2>
              <h5>@{userDataToStore.user_username}</h5>
              <Link to="/configuracion" className="gear-style">
                <span>
                  <img
                    src="https://raw.githubusercontent.com/EmanuelMdz/Auden-Front/d6099fe0b5fc3e661c3a03973fd9a894244eb399/src/public/gear.svg"
                    alt=""
                  />
                </span>
              </Link>
            </div>
          </div>

          <div className="playlist-user-controls fade-in-right">
            <span>
              <h5>Mis Playlist</h5>
            </span>
            <img
              src="https://raw.githubusercontent.com/EmanuelMdz/Auden-Front/d6099fe0b5fc3e661c3a03973fd9a894244eb399/src/public/divider.svg"
              alt=""
            />
            <div id="btn-crear-playlist" className="btn-crear-playlist">
              <Link to="/crear-playlist">Crear Playlist</Link>
            </div>
          </div>

          <div className="playlist-box-container fade-in-left">
            {groupSongsByPlaylist().map((playlistData) => (
              <Link
                key={playlistData.playlist_id}
                to={`/playlist/${playlistData.playlist_id}`}
              >
                <CardPortadaMultiple
                  key={playlistData.playlist_id}
                  images={playlistData.songs.map((song) => song.song_image_url)}
                  name={playlistData.playlist_name}
                  user={playlistData.user_username}
                />
              </Link>
            ))}
          </div>

          <Nav_Bar />
        </BackgroundC>
      )}
    </>
  );
};
