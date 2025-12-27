import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import VideoCard from './VideoCard';

interface ChannelPageProps {
  channelId: string;
  onClose: () => void;
  onVideoClick: (video: any) => void;
  allVideos: any[];
}

const ChannelPage = ({ channelId, onClose, onVideoClick, allVideos }: ChannelPageProps) => {
  const channelVideos = allVideos.filter(v => v.channelId === channelId);
  const channel = channelVideos[0];
  const [subscribed, setSubscribed] = useState(false);

  if (!channel) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto animate-fade-in">
      <div className="min-h-screen">
        <button
          onClick={onClose}
          className="fixed top-4 left-4 z-50 p-2 bg-muted hover:bg-muted/80 rounded-full transition-colors"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>

        <div className="relative h-48 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200')] bg-cover bg-center opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
          <div className="flex items-end gap-6 mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl">
              <img
                src={channel.channelAvatar}
                alt={channel.channel}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 pb-4">
              <h1 className="text-4xl font-bold mb-2">{channel.channel}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>@{channelId}</span>
                <span>•</span>
                <span>1.2M подписчиков</span>
                <span>•</span>
                <span>{channelVideos.length} видео</span>
              </div>
              <Button
                onClick={() => setSubscribed(!subscribed)}
                variant={subscribed ? 'secondary' : 'default'}
                size="lg"
                className="rounded-full"
              >
                {subscribed ? (
                  <>
                    <Icon name="Bell" size={20} className="mr-2" />
                    Вы подписаны
                  </>
                ) : (
                  <>
                    <Icon name="UserPlus" size={20} className="mr-2" />
                    Подписаться
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="border-b border-border mb-6">
            <div className="flex gap-6">
              <button className="pb-3 border-b-2 border-primary font-semibold">
                Видео
              </button>
              <button className="pb-3 text-muted-foreground hover:text-foreground transition-colors">
                О канале
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
            {channelVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => onVideoClick(video)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
