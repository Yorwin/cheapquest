"use client"

import React, { useState, useEffect, useRef } from "react"
import styles from "@/styles/components/video-player.module.scss"

interface GameTrailer {
    data: {
        [quality: string]: string;
    };
    id: number;
    name: string;
    preview: string;
}

interface VideoPlayerProps {
    gameName: string,
    trailer: GameTrailer;
}

const videoPlayer = ({ trailer, gameName }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [lastMouseMove, setLastMouseMove] = useState(Date.now());
    const [hideCursor, setHideCursor] = useState(false);
    const [showQualityMenu, setShowQualityMenu] = useState(false);
    const [currentQuality, setCurrentQuality] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getQualityOptions = () => {
        const qualityOrder = ['max', '1080', '720', '480', '360'];
        const availableQualities = Object.keys(trailer.data);

        return qualityOrder
            .filter(quality => availableQualities.includes(quality))
            .concat(availableQualities.filter(quality => !qualityOrder.includes(quality)))
            .map(quality => ({
                label: quality === 'max' ? 'Máxima' : `${quality}p`,
                value: quality,
                url: trailer.data[quality]
            }));
    };

    const qualityOptions = getQualityOptions();

    useEffect(() => {
        if (videoRef.current && currentQuality) {
            videoRef.current.src = trailer.data[currentQuality];
            videoRef.current.load(); // fuerza loadedmetadata
        }
    }, [currentQuality]);

    useEffect(() => {
        if (qualityOptions.length > 0 && !currentQuality) {
            setCurrentQuality(qualityOptions[0].value);
        }
    }, [qualityOptions, currentQuality]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Si han pasado más de 3 segundos desde el último movimiento
            if (Date.now() - lastMouseMove > 3000) {
                setShowControls(false);
                setHideCursor(true);
            } else {
                setHideCursor(false);
            }
        }, 50); // revisar cada medio segundo

        return () => clearInterval(interval);
    }, [lastMouseMove]);

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        setCurrentTime(videoRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        if (!videoRef.current) return;
        setDuration(videoRef.current.duration);
        setIsLoading(false);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!videoRef.current) return;
        const newTime = parseFloat(e.target.value);
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!videoRef.current) return;
        const newVolume = parseFloat(e.target.value);
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        if (isMuted) {
            videoRef.current.volume = volume;
            videoRef.current.muted = false;
            setIsMuted(false);
        } else {
            videoRef.current.muted = true;
            setIsMuted(true);
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = () => {
        const container = videoRef.current?.parentElement; // <div className="video-player__container">
        if (!container) return;

        if (!document.fullscreenElement) {
            container.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const changeQuality = (quality: string) => {
        if (!videoRef.current) return;

        const currentTimeBackup = videoRef.current.currentTime;
        const wasPlaying = !videoRef.current.paused;

        setIsLoading(true);
        setCurrentQuality(quality);

        videoRef.current.src = trailer.data[quality];
        videoRef.current.load();

        videoRef.current.addEventListener('loadedmetadata', () => {
            if (!videoRef.current) return;
            videoRef.current.currentTime = currentTimeBackup;
            if (wasPlaying) {
                videoRef.current.play();
            }
        }, { once: true });

        setShowQualityMenu(false);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className={styles["video-player"]}>
            <div
                className={`${styles["video-player__container"]} ${hideCursor ? styles["video-player__container--hide-cursor"] : ""}`}
                onMouseMove={() => {
                    setShowControls(true);
                    setLastMouseMove(Date.now());
                }}
                onMouseLeave={() => setShowControls(false)}
            >
                <video
                    ref={videoRef}
                    className={styles["video-player__video"]}
                    poster={trailer.preview}
                    preload="metadata"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onLoadStart={() => setIsLoading(true)}
                    onCanPlay={() => setIsLoading(false)}
                    aria-label={`Tráiler oficial del videojuego - ${gameName}`}
                    title={`Tráiler oficial del videojuego - ${gameName}`}
                >
                    <source src={trailer.data[currentQuality]} type="video/mp4" />
                    Tu navegador no soporta el elemento video.
                </video>

                {isLoading && (
                    <div className={styles["video-player__loading"]}>
                        <div className={styles["video-player__spinner"]}></div>
                    </div>
                )}

                <div className={`${styles["video-player__controls"]} ${showControls ? styles["video-player__controls--visible"] : ""}`}>
                    <div className={styles["video-player__progress"]}>
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className={styles["video-player__progress-bar"]}
                            style={{ backgroundSize: `${progressPercentage}% 100%` }}
                        />
                    </div>

                    <div className={styles["video-player__controls-row"]}>
                        <div className={styles["video-player__controls-left"]}>
                            <button
                                onClick={togglePlay}
                                className={styles["video-player__button"]}
                                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                            >
                                {isPlaying ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>

                            <div className={styles["video-player__volume"]}>
                                <button
                                    onClick={toggleMute}
                                    className={styles["video-player__button"]}
                                    aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                                >
                                    {isMuted || volume === 0 ? (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                                        </svg>
                                    ) : (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                                        </svg>
                                    )}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className={styles["video-player__volume-bar"]}
                                />
                            </div>

                            <div className={styles["video-player__time"]}>
                                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                            </div>
                        </div>

                        <div className={styles["video-player__controls-right"]}>
                            {qualityOptions.length > 1 && (
                                <div className={styles["video-player__quality"]}>
                                    <button
                                        onClick={() => setShowQualityMenu(!showQualityMenu)}
                                        className={styles["video-player__button"]}
                                        aria-label="Cambiar calidad"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <span className={styles["video-player__quality-label"]}>
                                            {qualityOptions.find(q => q.value === currentQuality)?.label}
                                        </span>
                                    </button>

                                    {showQualityMenu && (
                                        <div className={styles["video-player__quality-menu"]}>
                                            {qualityOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => changeQuality(option.value)}
                                                    className={`${styles["video-player__quality-option"]} ${currentQuality === option.value ? styles["video-player__quality-option--active"] : ""}`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <button
                                onClick={toggleFullscreen}
                                className={styles["video-player__button"]}
                                aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
                            >
                                {isFullscreen ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                                    </svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {trailer.name && (
                    <div className={styles["video-player__title"]}>
                        <h3>{trailer.name}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default videoPlayer;
