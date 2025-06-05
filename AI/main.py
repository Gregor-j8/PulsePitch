from utils.video_utils import read_video, save_video

def main():
    video_frames = read_video('data/italyGame.mp4')
    save_video(video_frames, 'output_videos/output_video.avi')

if __name__ == '__main__':
    main()