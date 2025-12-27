import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const UploadVideo = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      setFile(droppedFile);
    } else {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, загрузите видеофайл',
        variant: 'destructive',
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file || !title) {
      toast({
        title: 'Заполните обязательные поля',
        description: 'Добавьте видео и название',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Видео загружено!',
      description: `${file.name} успешно загружен`,
    });

    setFile(null);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Загрузить видео</h1>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-xl p-12 mb-6 transition-all duration-300
          ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border'}
          ${file ? 'bg-muted' : ''}
        `}
      >
        {!file ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
              <Icon name="Upload" size={40} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Перетащите видео сюда
            </h3>
            <p className="text-muted-foreground mb-4">
              или нажмите для выбора файла
            </p>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileInput}
              className="hidden"
              id="video-upload"
            />
            <label htmlFor="video-upload">
              <Button asChild>
                <span>Выбрать файл</span>
              </Button>
            </label>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10">
              <Icon name="FileVideo" size={32} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setFile(null)}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Название <span className="text-primary">*</span>
          </label>
          <Input
            type="text"
            placeholder="Добавьте название, которое описывает ваше видео"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Описание
          </label>
          <Textarea
            placeholder="Расскажите зрителям о своём видео"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
          />
        </div>

        <div className="flex gap-4 justify-end pt-4">
          <Button variant="outline" onClick={() => {
            setFile(null);
            setTitle('');
            setDescription('');
          }}>
            Отмена
          </Button>
          <Button onClick={handleUpload}>
            <Icon name="Upload" size={20} className="mr-2" />
            Загрузить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
