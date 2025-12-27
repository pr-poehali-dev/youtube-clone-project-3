import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  isModerated?: boolean;
}

interface Video {
  id: string;
  title: string;
  channel: string;
  channelId: string;
  channelAvatar: string;
  views: string;
  uploadTime: string;
  duration: string;
  likes: number;
  dislikes: number;
  description: string;
  thumbnail: string;
}

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
  onChannelClick?: (channelId: string) => void;
  recommendedVideos?: Video[];
}

const VideoPlayer = ({ video, onClose, onChannelClick, recommendedVideos = [] }: VideoPlayerProps) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likes);
  const [dislikesCount, setDislikesCount] = useState(video.dislikes);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Алексей М.',
      avatar: '',
      text: 'Отличное видео! Очень полезная информация.',
      time: '2 часа назад',
      likes: 42,
    },
    {
      id: '2',
      author: 'Мария К.',
      avatar: '',
      text: 'Спасибо за контент, жду продолжения!',
      time: '5 часов назад',
      likes: 28,
    },
  ]);

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: 'Вы',
        avatar: '',
        text: commentText,
        time: 'только что',
        likes: 0,
      };
      setComments([newComment, ...comments]);
      setCommentText('');
    }
  };

  const handleModerateComment = (commentId: string) => {
    setComments(comments.filter((c) => c.id !== commentId));
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
      if (disliked) {
        setDisliked(false);
        setDislikesCount(dislikesCount - 1);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikesCount(dislikesCount - 1);
    } else {
      setDisliked(true);
      setDislikesCount(dislikesCount + 1);
      if (liked) {
        setLiked(false);
        setLikesCount(likesCount - 1);
      }
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = video.thumbnail;
    link.download = `${video.title}.mp4`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto animate-fade-in">
      <div className="min-h-screen pb-20">
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-50 p-2 bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
        >
          <Icon name="X" size={24} />
        </button>

        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            <div>
              <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 animate-scale-in">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <Icon name="Play" size={80} />
                </div>
              </div>

              <h1 className="text-2xl font-bold mb-2">{video.title}</h1>

              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div
                    onClick={() => onChannelClick?.(video.channelId)}
                    className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                  >
                    <img
                      src={video.channelAvatar}
                      alt={video.channel}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p
                      onClick={() => onChannelClick?.(video.channelId)}
                      className="font-semibold cursor-pointer hover:text-primary transition-colors"
                    >
                      {video.channel}
                    </p>
                    <p className="text-sm text-muted-foreground">1.2M подписчиков</p>
                  </div>
                  <Button
                    onClick={() => setSubscribed(!subscribed)}
                    variant={subscribed ? 'secondary' : 'default'}
                    className="rounded-full"
                  >
                    {subscribed ? 'Вы подписаны' : 'Подписаться'}
                  </Button>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center bg-secondary rounded-full overflow-hidden">
                    <Button
                      onClick={handleLike}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        'rounded-none rounded-l-full transition-all duration-200',
                        liked && 'bg-primary/20 text-primary'
                      )}
                    >
                      <Icon name="ThumbsUp" size={20} />
                      <span className="ml-2">{likesCount.toLocaleString()}</span>
                    </Button>
                    <div className="w-px h-6 bg-border" />
                    <Button
                      onClick={handleDislike}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        'rounded-none rounded-r-full transition-all duration-200',
                        disliked && 'bg-destructive/20 text-destructive'
                      )}
                    >
                      <Icon name="ThumbsDown" size={20} />
                      <span className="ml-2">{dislikesCount.toLocaleString()}</span>
                    </Button>
                  </div>
                  <Button variant="secondary" className="rounded-full">
                    <Icon name="Share2" size={20} />
                    <span className="ml-2">Поделиться</span>
                  </Button>
                  <Button onClick={handleDownload} variant="secondary" className="rounded-full">
                    <Icon name="Download" size={20} />
                    <span className="ml-2">Скачать</span>
                  </Button>
                </div>
              </div>

              <div className="bg-muted rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold mb-2">
                  {video.views} просмотров • {video.uploadTime}
                </p>
                <p className="text-sm">{video.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">
                  Комментарии ({comments.length})
                </h2>

                <div className="flex gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary shrink-0">
                    ВЫ
                  </div>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Добавьте комментарий..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="mb-2"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        onClick={() => setCommentText('')}
                      >
                        Отмена
                      </Button>
                      <Button
                        onClick={handleAddComment}
                        disabled={!commentText.trim()}
                      >
                        Комментировать
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 group">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold text-sm shrink-0">
                        {comment.author[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.time}</span>
                        </div>
                        <p className="text-sm mb-2">{comment.text}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm hover:text-primary transition-colors">
                            <Icon name="ThumbsUp" size={16} />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm hover:text-primary transition-colors">
                            <Icon name="ThumbsDown" size={16} />
                          </button>
                          <button className="text-sm hover:text-primary transition-colors">
                            Ответить
                          </button>
                          <button
                            onClick={() => handleModerateComment(comment.id)}
                            className="text-sm text-destructive hover:text-destructive/80 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Icon name="Trash2" size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <h3 className="font-bold mb-4">Рекомендации</h3>
              <div className="space-y-3">
                {recommendedVideos.slice(0, 8).map((recVideo) => (
                  <div
                    key={recVideo.id}
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        window.location.reload();
                      }, 100);
                    }}
                    className="flex gap-2 cursor-pointer group"
                  >
                    <div className="w-40 aspect-video bg-muted rounded-lg overflow-hidden shrink-0">
                      <img
                        src={recVideo.thumbnail}
                        alt={recVideo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                        {recVideo.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors mb-1">
                        {recVideo.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">{recVideo.channel}</p>
                      <p className="text-xs text-muted-foreground">{recVideo.views} просмотров</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;