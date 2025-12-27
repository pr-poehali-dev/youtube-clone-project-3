interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    channel: string;
    channelId: string;
    channelAvatar: string;
    views: string;
    uploadTime: string;
    duration: string;
  };
  onClick: () => void;
  onChannelClick?: (channelId: string) => void;
}

const VideoCard = ({ video, onClick, onChannelClick }: VideoCardProps) => {
  const handleChannelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChannelClick?.(video.channelId);
  };

  return (
    <div className="group animate-fade-in">
      <div
        onClick={onClick}
        className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-3 cursor-pointer"
      >
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
        <div
          onClick={handleChannelClick}
          className="w-9 h-9 rounded-full overflow-hidden shrink-0 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
        >
          <img
            src={video.channelAvatar}
            alt={video.channel}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            onClick={onClick}
            className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors cursor-pointer"
          >
            {video.title}
          </h3>
          <p
            onClick={handleChannelClick}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {video.channel}
          </p>
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