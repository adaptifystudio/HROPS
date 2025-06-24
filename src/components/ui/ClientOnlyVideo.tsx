"use client";

export default function ClientOnlyVideo() {
  return (
    <div className="rounded-lg lg:rounded-[22px] border border-border bg-white/90 dark:bg-background">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="rounded-lg lg:rounded-[20px] w-full h-auto object-cover"
      >
        <source src="/images/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
