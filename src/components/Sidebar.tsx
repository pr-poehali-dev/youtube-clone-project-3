import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'home', icon: 'Home', label: 'Главная' },
    { id: 'videos', icon: 'Play', label: 'Видео' },
    { id: 'subscriptions', icon: 'Users', label: 'Подписки' },
    { id: 'history', icon: 'History', label: 'История' },
    { id: 'favorites', icon: 'Heart', label: 'Избранное' },
    { id: 'profile', icon: 'User', label: 'Профиль' },
    { id: 'upload', icon: 'Upload', label: 'Загрузить' },
  ];

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background border-r border-border transition-all duration-300 z-40',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-4 hover:bg-muted transition-colors flex items-center justify-center"
        >
          <Icon name={collapsed ? 'ChevronRight' : 'ChevronLeft'} size={24} />
        </button>

        <nav className="flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                'w-full px-6 py-3 flex items-center gap-4 transition-all duration-200 hover:bg-muted',
                activeSection === item.id && 'bg-muted border-l-4 border-primary',
                collapsed && 'justify-center px-0'
              )}
            >
              <Icon name={item.icon} size={24} className="shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
