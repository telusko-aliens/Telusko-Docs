"use client"

import React, { useState } from "react";

interface VideoProps {
  id: string; 
  title?: string;
  start?: number;
}

export default function Video({ id, title = "Video", start }: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1${
    start ? `&start=${start}` : ""
  }`;

  return (
    <div className="w-full mx-auto"> {/* 80% width, centered */}
      <div className="relative w-full pb-[56.25%] overflow-hidden rounded-xl shadow-lg">
        {isPlaying ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={thumbnail}
              alt={title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="relative z-10 bg-black/60 rounded-full p-4 text-white text-2xl">
              ▶
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
