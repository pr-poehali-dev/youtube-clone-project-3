import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

interface VideoPlayerProps {
  video: {
    id: string;
    title: string;
    channel: string;
    channelAvatar: string;
    views: string;
    uploadTime: string;
    likes: string;
    description: string;
  };
  onClose: () => void;
}

const VideoPlayer = ({ video, onClose }: VideoPlayerProps) => {
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
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
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={video.channelAvatar} />
                    <AvatarFallback>{video.channel[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{video.channel}</p>
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

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setLiked(!liked)}
                    variant="secondary"
                    className={cn(
                      'rounded-full transition-all duration-200',
                      liked && 'bg-primary text-primary-foreground hover:bg-primary/90'
                    )}
                  >
                    <Icon name={liked ? 'ThumbsUp' : 'ThumbsUp'} size={20} />
                    <span className="ml-2">{video.likes}</span>
                  </Button>
                  <Button variant="secondary" className="rounded-full">
                    <Icon name="Share2" size={20} />
                    <span className="ml-2">Поделиться</span>
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
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>ВЫ</AvatarFallback>
                  </Avatar>
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
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
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
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-2 cursor-pointer group">
                    <div className="w-40 aspect-video bg-muted rounded-lg overflow-hidden shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        Похожее видео #{i}
                      </h4>
                      <p className="text-xs text-muted-foreground">Канал</p>
                      <p className="text-xs text-muted-foreground">100K просмотров</p>
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
