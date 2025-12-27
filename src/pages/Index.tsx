import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoCard from '@/components/VideoCard';
import VideoPlayer from '@/components/VideoPlayer';
import UploadVideo from '@/components/UploadVideo';
import AuthModal from '@/components/AuthModal';
import ChannelPage from '@/components/ChannelPage';
import { cn } from '@/lib/utils';

const mockVideos = [
  {
    id: '1',
    title: 'Как создать современное веб-приложение на React',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    channel: 'WebDev Pro',
    channelId: 'webdev-pro',
    channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    views: '234K',
    uploadTime: '2 дня назад',
    duration: '15:32',
    likes: 12000,
    dislikes: 150,
    description: 'В этом видео мы разберем, как создать современное веб-приложение с использованием React, TypeScript и современных инструментов разработки.',
  },
  {
    id: '2',
    title: 'Топ-10 советов по оптимизации производительности',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    channel: 'Code Masters',
    channelId: 'code-masters',
    channelAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    views: '156K',
    uploadTime: '5 дней назад',
    duration: '22:45',
    likes: 8500,
    dislikes: 200,
    description: 'Узнайте о лучших практиках оптимизации производительности веб-приложений.',
  },
  {
    id: '3',
    title: 'Дизайн системы с нуля: полное руководство',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
    channel: 'Design Academy',
    channelId: 'design-academy',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    views: '89K',
    uploadTime: '1 неделю назад',
    duration: '18:20',
    likes: 5200,
    dislikes: 80,
    description: 'Создаем дизайн систему для вашего проекта с правильными компонентами и токенами.',
  },
  {
    id: '4',
    title: 'AI и машинное обучение: введение для начинающих',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    channel: 'AI Learning',
    channelId: 'ai-learning',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    views: '412K',
    uploadTime: '3 дня назад',
    duration: '25:10',
    likes: 18000,
    dislikes: 300,
    description: 'Простое введение в мир искусственного интеллекта и машинного обучения.',
  },
  {
    id: '5',
    title: 'Продвинутые техники CSS: Grid и Flexbox',
    thumbnail: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800',
    channel: 'CSS Wizards',
    channelId: 'css-wizards',
    channelAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    views: '178K',
    uploadTime: '1 день назад',
    duration: '20:15',
    likes: 9800,
    dislikes: 120,
    description: 'Мастер-класс по использованию CSS Grid и Flexbox для создания современных макетов.',
  },
  {
    id: '6',
    title: 'Backend разработка на Node.js и Express',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
    channel: 'Backend Hub',
    channelId: 'backend-hub',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    views: '267K',
    uploadTime: '4 дня назад',
    duration: '30:45',
    likes: 14000,
    dislikes: 180,
    description: 'Полный курс по созданию backend приложений на Node.js с использованием Express.',
  },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState<typeof mockVideos[0] | null>(null);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [sidebarCollapsed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(savedUser);
    } else {
      setShowAuthModal(true);
    }
  }, []);

  const handleAuthSuccess = (username: string) => {
    setUser(username);
    localStorage.setItem('user', username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main
        className={cn(
          'pt-16 transition-all duration-300',
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        )}
      >
        <div className="p-6">
          {activeSection === 'upload' ? (
            <UploadVideo />
          ) : activeSection === 'home' || activeSection === 'videos' ? (
            <>
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">
                  {activeSection === 'home' ? 'Рекомендации' : 'Все видео'}
                </h1>
                <p className="text-muted-foreground">
                  Смотрите самые популярные и интересные видео
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={() => setSelectedVideo(video)}
                    onChannelClick={(channelId) => setSelectedChannelId(channelId)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">
                {activeSection === 'subscriptions' && 'Подписки'}
                {activeSection === 'history' && 'История просмотров'}
                {activeSection === 'favorites' && 'Избранное'}
                {activeSection === 'profile' && 'Профиль'}
              </h2>
              <p className="text-muted-foreground">
                Этот раздел находится в разработке
              </p>
            </div>
          )}
        </div>
      </main>

      {selectedVideo && !selectedChannelId && (
        <VideoPlayer
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onChannelClick={(channelId) => {
            setSelectedVideo(null);
            setSelectedChannelId(channelId);
          }}
          recommendedVideos={mockVideos.filter(v => v.id !== selectedVideo.id)}
        />
      )}

      {selectedChannelId && (
        <ChannelPage
          channelId={selectedChannelId}
          onClose={() => setSelectedChannelId(null)}
          onVideoClick={(video) => {
            setSelectedChannelId(null);
            setSelectedVideo(video);
          }}
          allVideos={mockVideos}
        />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};

export default Index;