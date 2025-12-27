import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    channel: string;
    channelAvatar: string;
    views: string;
    uploadTime: string;
    duration: string;
  };
  onClick: () => void;
}

const VideoCard = ({ video, onClick }: VideoCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer animate-fade-in"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-3">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center font-semibold text-sm shrink-0">
          {video.channel[0]}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <p className="text-xs text-muted-foreground">{video.channel}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{video.views} просмотров</span>
            <span>•</span>
            <span>{video.uploadTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;