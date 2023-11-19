import classNames from 'classnames';
import { Pause, Play } from "phosphor-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import WaveSurfer from 'wavesurfer.js';

type UploadPropType = {
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    setAudioFile: Dispatch<SetStateAction<File | undefined>>,
    setShouldNext: Dispatch<SetStateAction<boolean>>
    formatTime: (time: number) => string,
}

const Upload = ({ isPlaying, setAudioFile, setIsPlaying, setShouldNext, formatTime }: UploadPropType) => {
    const [isUploaded, setIsUploaded] = useState(false)
    const [uploadTime, setUploadTime] = useState<undefined | number>(undefined)
    const uploadedAudioRef = useRef<any>(null)
    const uploadedAudio = useRef<any>(null)

    const handleUploadPlayPause = () => {
        if (!uploadedAudioRef.current) return;
        if (isPlaying) {
            uploadedAudioRef.current.pause();
        } else {
            uploadedAudioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    const handleFileChange = (e: any) => {
        setAudioFile(undefined);
        const file = e.target.files[0];
        const audioElement = new Audio();
        audioElement.src = URL.createObjectURL(file);
        audioElement.load();
        console.log(audioElement);

        const initiateUploadTime = () => {
            uploadedAudioRef.current = WaveSurfer.create({
                container: uploadedAudio.current,
                waveColor: '#000000',
                progressColor: '#B00000',
                url: audioElement.src,
                barWidth: 3,
                height: 80,
                barRadius: 2,
            });
        }
        initiateUploadTime();
        setAudioFile(file);
        // setIsNextUploadVisible(true);
        setShouldNext(true);
        setIsUploaded(true)
    };

    useEffect(() => {
        if (!uploadedAudioRef.current) return;
        if (uploadedAudioRef.current) {
            uploadedAudioRef.current.on("decode", () => {
                const getAudioDuration = uploadedAudioRef.current.getDuration();
                setUploadTime(getAudioDuration * 1000);
                console.log("upload time", uploadTime)
                console.log("upload time", getAudioDuration)
            });
        }
        uploadedAudioRef.current.on('finish', () => {
            uploadedAudioRef.current.setTime(0);
            setIsPlaying(false);
        });
        uploadedAudioRef.current.on('timeupdate', (currentTime: number) => {
            if (uploadTime != undefined) {
                console.log(">>> upload time", uploadTime)
                const getRemainaingTime = uploadTime - (currentTime * 1000);
                console.log(">>> remaining time time", getRemainaingTime)
                setUploadTime(getRemainaingTime);
            }
        });
    }, [uploadedAudioRef.current]);

    return (

        <div className={`bg-slate-200 pl-10 pr-[80px] mt-4 relative h-[150px] flex flex-col justify-center`} ref={uploadedAudio}>
            {isUploaded ? <div className='inline-flex absolute left-[10px]' onClick={handleUploadPlayPause}>
                {isPlaying ?
                    <Pause
                        size="24"
                        className="text-white"
                        weight="fill"
                    /> :
                    <Play
                        size="24"
                        className="text-white"
                        weight="fill"
                    />
                }
            </div> :
                <div>
                    <label htmlFor='audio' className='text-center'><div className='text-white bg-red-500 px-5 py-3 rounded-md active:scale-105 hover:shadow-md'>Choose audio file to upload</div></label>
                    <input
                        className='hidden'
                        type="file"
                        id="audio"
                        accept="audio/*"
                        onChange={(e) => handleFileChange(e)}
                    />
                </div>
            }

            <div className={classNames("inline-flex absolute right-[15px] py-0.5 px-2 bg-gray-600 text-white rounded-md", isUploaded ? 'block' : 'hidden')}>
                {uploadTime && <div>{formatTime(uploadTime / 1000)}</div>}
            </div>
        </div>

    )
}

export default Upload