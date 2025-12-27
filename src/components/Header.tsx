import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  user: string | null;
  onAuthClick: () => void;
  onLogout: () => void;
}

const Header = ({ user, onAuthClick, onLogout }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 px-6 shadow-sm">
      <div className="h-full flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Icon name="Youtube" size={32} className="text-primary" />
          <span className="text-2xl font-bold">VidStream</span>
        </div>

        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12 h-10"
            />
            <button className="absolute right-0 top-0 h-10 px-4 border-l border-border bg-muted hover:bg-muted/80 transition-colors rounded-r-md">
              <Icon name="Search" size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hover:bg-muted p-2 rounded-full transition-colors">
            <Icon name="Video" size={24} />
          </button>
          <button className="hover:bg-muted p-2 rounded-full transition-colors">
            <Icon name="Bell" size={24} />
          </button>
          
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                {user[0].toUpperCase()}
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          ) : (
            <Button onClick={onAuthClick}>
              <Icon name="User" size={18} className="mr-2" />
              Войти
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;