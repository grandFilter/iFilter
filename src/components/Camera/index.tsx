import React, { useRef, useState, useEffect } from 'react';
import { Assign } from 'utility-types';
import CN from 'classnames';
import styles from './styles.module.less';

const getUserMedia =
    navigator.getUserMedia ||
    (navigator as Assign<typeof navigator, { webkitGetUserMedia: any }>).webkitGetUserMedia ||
    (navigator as Assign<typeof navigator, { mozGetUserMedia: any }>).mozGetUserMedia ||
    (navigator as Assign<typeof navigator, { msGetUserMedia: any }>).msGetUserMedia;

export default function CameraIndex(props: { visible: boolean; onClose: Function; onInput?: Function }) {
    const [playing, setPlaying] = useState(false);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const { visible, onClose, onInput } = props;
    const closeHandle = () => {
        setPlaying(false);
        onClose();
    };
    const canvasEl = useRef<HTMLCanvasElement>(null),
        videoEl = useRef<HTMLVideoElement>(null);

    const inputEl = useRef<HTMLInputElement>(null);

    const playingHandler = () => {
        const video = videoEl.current;
        if (!video) return;
        const vh = window.innerHeight;
        const { offsetWidth, offsetHeight } = video;

        setWidth(offsetWidth * (vh / offsetHeight));
        setHeight(vh);
        setPlaying(true);
    };

    const webRtcCamera = () => {
        if (!getUserMedia) {
            return Promise.reject({ msg: 'WebRTC is not surppotted' });
        }

        const video = videoEl.current as any; // TODO
        return navigator.mediaDevices
            .getUserMedia({ audio: false, video: true })
            .then(stream => {
                /* use the stream */
                // console.log(stream);
                if ('srcObject' in video) {
                    video.srcObject = stream;
                } else {
                    // Avoid using this in new browsers, as it is going away.
                    video.src = window.URL.createObjectURL(stream);
                }
                video.onloadedmetadata = () => video.play();
            })
            .catch(err => {
                /* handle the error */
                console.log(err);
            });
    };

    useEffect(() => {
        if (visible && videoEl.current) {
            webRtcCamera();
        }
        return () => {};
    });

    const shotHandler = () => {
        console.log('shot');
        const canvas = canvasEl.current;
        const video = videoEl.current;
        if (!canvas || !video) return;

        const { width, height } = canvas;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        video.pause();
        ctx.drawImage(video, 0, 0, width, height);
        const base64 = canvas.toDataURL('image/jpeg');

        onInput && onInput(base64);
        closeHandle();
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        const file = (inputEl.current?.files || [])[0];

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            onInput && onInput(base64);
            closeHandle();
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className={CN([styles.camera, visible ? styles.show : ''])}>
            <div className={styles.video}>
                {visible && (
                    <video
                        onPlaying={playingHandler}
                        ref={videoEl}
                        autoPlay
                        x-webkit-airplay="airplay"
                        webkit-playsinline="playsinline"
                        playsInline
                    />
                )}
            </div>
            {playing && <canvas ref={canvasEl} width={width} height={height} />}
            <div className={styles.mask}></div>
            <span role="button" className={styles.close} onClick={closeHandle}>
                &times;
            </span>
            <button className={styles.icon}>
                <input ref={inputEl} type="file" accept="image/*" onChange={changeHandler} />
            </button>
            <button onClick={shotHandler} className={styles.shot}></button>
        </div>
    );
}
