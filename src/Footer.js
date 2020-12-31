import React, { useEffect, useState } from "react";
import "./Footer.css";
import { useDataLayerValue } from "./DataLayer";
import ShuffleRoundedIcon from "@material-ui/icons/ShuffleRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import PlayCircleOutlineRoundedIcon from "@material-ui/icons/PlayCircleOutlineRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import RepeatRoundedIcon from "@material-ui/icons/RepeatRounded";
import PlaylistPlayRoundedIcon from "@material-ui/icons/PlaylistPlayRounded";
import PauseCircleOutlineRoundedIcon from "@material-ui/icons/PauseCircleOutlineRounded";
import VolumeDownRoundedIcon from "@material-ui/icons/VolumeDownRounded";
import { Grid, Slider } from "@material-ui/core";

const Footer = ({ spotify }) => {
  const [{ token, item, playing }, dispatch] = useDataLayerValue();

  // useEffect(() => {
  //   spotify.getMyCurrentPlaybackState().then((r) => {
  //     console.log(r);

  //     dispatch({
  //       type: "SET_PLAYING",
  //       playing: r.is_playing,
  //     });

  //     dispatch({
  //       type: "SET_ITEM",
  //       item: r.item,
  //     });
  //   });
  // }, [spotify]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <ShuffleRoundedIcon className="footer__green" />
        <SkipPreviousRoundedIcon
          onClick={skipPrevious}
          className="footer__icon"
        />
        {playing ? (
          <PauseCircleOutlineRoundedIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineRoundedIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextRoundedIcon onClick={skipNext} className="footer__icon" />
        <RepeatRoundedIcon className="footer__green" />
      </div>

      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayRoundedIcon />
          </Grid>
          <Grid item>
            <VolumeDownRoundedIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
