import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoCard from '@/components/VideoCard';
import VideoPlayer from '@/components/VideoPlayer';
import UploadVideo from '@/components/UploadVideo';
import { cn } from '@/lib/utils';

const mockVideos = [
  {
    id: '1',
    title: 'Как создать современное веб-приложение на React',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    channel: 'WebDev Pro',
    channelAvatar: '',
    views: '234K',
    uploadTime: '2 дня назад',
    duration: '15:32',
    likes: '12K',
    description: 'В этом видео мы разберем, как создать современное веб-приложение с использованием React, TypeScript и современных инструментов разработки.',
  },
  {
    id: '2',
    title: 'Топ-10 советов по оптимизации производительности',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    channel: 'Code Masters',
    channelAvatar: '',
    views: '156K',
    uploadTime: '5 дней назад',
    duration: '22:45',
    likes: '8.5K',
    description: 'Узнайте о лучших практиках оптимизации производительности веб-приложений.',
  },
  {
    id: '3',
    title: 'Дизайн системы с нуля: полное руководство',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
    channel: 'Design Academy',
    channelAvatar: '',
    views: '89K',
    uploadTime: '1 неделю назад',
    duration: '18:20',
    likes: '5.2K',
    description: 'Создаем дизайн систему для вашего проекта с правильными компонентами и токенами.',
  },
  {
    id: '4',
    title: 'AI и машинное обучение: введение для начинающих',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    channel: 'AI Learning',
    channelAvatar: '',
    views: '412K',
    uploadTime: '3 дня назад',
    duration: '25:10',
    likes: '18K',
    description: 'Простое введение в мир искусственного интеллекта и машинного обучения.',
  },
  {
    id: '5',
    title: 'Продвинутые техники CSS: Grid и Flexbox',
    thumbnail: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800',
    channel: 'CSS Wizards',
    channelAvatar: '',
    views: '178K',
    uploadTime: '1 день назад',
    duration: '20:15',
    likes: '9.8K',
    description: 'Мастер-класс по использованию CSS Grid и Flexbox для создания современных макетов.',
  },
  {
    id: '6',
    title: 'Backend разработка на Node.js и Express',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
    channel: 'Backend Hub',
    channelAvatar: '',
    views: '267K',
    uploadTime: '4 дня назад',
    duration: '30:45',
    likes: '14K',
    description: 'Полный курс по созданию backend приложений на Node.js с использованием Express.',
  },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState<typeof mockVideos[0] | null>(null);
  const [sidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background dark">
      <Header />
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

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default Index;