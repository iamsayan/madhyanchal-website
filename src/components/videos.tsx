'use client';

import { useState } from 'react';
import { YouTubeEmbed } from '@next/third-parties/google'

interface VideoInfo {
    id: string;
    name: string;
}

export default function Videos() {
    const [video, setVideo] = useState<VideoInfo>({
        id: 'q43DP9TNNS8',
        name: 'Madhyanchal Sarbajanin 2024 Pandel & Idol Full View | Chandannagar Jagadhatri Puja 2024',
    });

    const videos: VideoInfo[] = [
        {
            id: 'q43DP9TNNS8',
            name: 'Madhyanchal Sarbajanin 2024 Pandel & Idol Full View | Chandannagar Jagadhatri Puja 2024',
        },
        {
            id: 'siymCZsB8CQ',
            name: 'Shiv Tandav in Laser Show 2024 🙏❤️ | Chandannagar Madhyanchal Sarbajanin Jagadhatri Puja',
        },
        {
            id: 'x_cnUDr9jck',
            name: 'Laser Show 2024 🙏❤️ | Chandannagar Madhyanchal Sarbajanin Jagadhatri Puja',
        },
        {
            id: 'hP99_lCS3C4',
            name: 'কমলায় নেত্য করে থমকিয়া থমকিয়া 😁 in Laser Show 2024 ❤️ | Chandannagar Madhyanchal Sarbajanin',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-5">
            <div className="col-span-3">
                <YouTubeEmbed videoid={video.id} params="controls=0&playsinline=1&cc_load_policy=1&modestbranding=1&rel=0" />
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between p-4 border-b-2">
                    <div>Playlist</div>
                    <div>{videos.length} videos</div>
                </div>
                <div className="flex flex-col justify-between gap-2">
                    {videos.map((info, index) => (
                        <div key={index} className="flex flex-row items-center gap-3 cursor-pointer" onClick={() => setVideo(info)}>
                            <div className="basis-1/4">
                                <img
                                    className="pointer-events-none"
                                    width={300}
                                    src={`https://i3.ytimg.com/vi/${info.id}/maxresdefault.jpg`}
                                    alt={info.name}
                                />
                            </div>
                            <div className="basis-3/4 text-left overflow-ellipsis overflow-hidden whitespace-nowrap">
                                {info.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}