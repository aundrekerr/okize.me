// utils/extractFrames.ts
export const extractFrames = async (videoUrl: string, fps: number): Promise<HTMLCanvasElement[]> => {
  console.log(videoUrl, fps)
  const video = document.createElement('video');
  video.src = videoUrl;
  video.crossOrigin = 'anonymous'; // Add this if the video is hosted on a different domain

  return new Promise((resolve) => {
    video.addEventListener('loadeddata', async () => {
      const frames: HTMLCanvasElement[] = [];
      const duration = video.duration;
      const totalFrames = Math.floor(duration * fps);

      for (let i = 0; i < totalFrames; i++) {
        const currentTime = i / fps;
        await new Promise<void>((res) => {
          video.currentTime = currentTime;
          video.addEventListener('seeked', function onSeeked() {
            video.removeEventListener('seeked', onSeeked);

            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              frames.push(canvas);
            }
            res();
          });
        });
      }
      resolve(frames);
    });
  });
};
