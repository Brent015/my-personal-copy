import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

const ImageGallery = () => {
  const galleryImages = [
    {
      id: '1',
      url: 'https://loremflickr.com/1080/1080/art,statue',
      alt: 'Featured gallery image',
      featured: true
    },
    {
      id: '2',
      url: 'https://loremflickr.com/1080/1080/architecture,building',
      alt: 'Gallery image 2'
    },
    {
      id: '3',
      url: 'https://loremflickr.com/1080/1080/city,street',
      alt: 'Gallery image 3'
    },
    {
      id: '4',
      url: 'https://loremflickr.com/1080/1080/park,nature',
      alt: 'Gallery image 4'
    }
  ];

  // State for managing the gallery
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // This state tracks both the current image and the one we're transitioning to
  const [currentView, setCurrentView] = useState<{
    currentIndex: number | null;
    nextIndex: number | null;
    direction: 'left' | 'right' | null;
  }>({
    currentIndex: null,
    nextIndex: null,
    direction: null
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    setStartX(e.touches[0].clientX);
    setOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === 0 || isAnimating) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    // Add resistance at the edges
    if (
      (selectedImageIndex === 0 && diff > 0) || 
      (selectedImageIndex === galleryImages.length - 1 && diff < 0)
    ) {
      setOffset(diff * 0.2);
    } else {
      setOffset(diff);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isAnimating) return;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    const threshold = window.innerWidth * 0.3;

    if (Math.abs(diff) > threshold && selectedImageIndex !== null) {
      setIsAnimating(true);

      if (diff > 0 && selectedImageIndex > 0) {
        // Swiping right, show previous image
        setCurrentView({
          currentIndex: selectedImageIndex,
          nextIndex: selectedImageIndex - 1,
          direction: 'right'
        });
        
        setTimeout(() => {
          setSelectedImageIndex(selectedImageIndex - 1);
          setCurrentView({
            currentIndex: selectedImageIndex - 1,
            nextIndex: null,
            direction: null
          });
          setIsAnimating(false);
        }, 300);
      } else if (diff < 0 && selectedImageIndex < galleryImages.length - 1) {
        // Swiping left, show next image
        setCurrentView({
          currentIndex: selectedImageIndex,
          nextIndex: selectedImageIndex + 1,
          direction: 'left'
        });
        
        setTimeout(() => {
          setSelectedImageIndex(selectedImageIndex + 1);
          setCurrentView({
            currentIndex: selectedImageIndex + 1,
            nextIndex: null,
            direction: null
          });
          setIsAnimating(false);
        }, 300);
      }
    }

    // Reset touch state
    setStartX(0);
    setOffset(0);
  };

  return (
    <div className="w-full bg-white">
      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-1 p-1">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className={`relative overflow-hidden ${
              image.featured ? 'col-span-2 aspect-video' : 'aspect-square'
            }`}
            onClick={() => {
              setSelectedImageIndex(index);
              setCurrentView({
                currentIndex: index,
                nextIndex: null,
                direction: null
              });
              setIsModalOpen(true);
            }}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Modal View */}
      <Dialog 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
      >
        <DialogContent 
          className="flex items-center justify-center p-0 w-screen h-screen max-w-none max-h-none m-0 bg-black border-0 overflow-hidden"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Current Image */}
            {selectedImageIndex !== null && (
              <div 
                className="absolute w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
                style={{
                  transform: offset 
                    ? `translateX(${offset}px)` 
                    : currentView.direction 
                      ? `translateX(${currentView.direction === 'left' ? '-100%' : '100%'})`
                      : 'translateX(0)'
                }}
              >
                <img
                  src={galleryImages[selectedImageIndex].url}
                  alt={galleryImages[selectedImageIndex].alt}
                  className="w-full h-full object-contain select-none px-4"
                  draggable={false}
                />
              </div>
            )}

            {/* Next Image (for transition) */}
            {currentView.nextIndex !== null && (
              <div 
                className="absolute w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(${currentView.direction === 'left' ? '100%' : '-100%'})
                    translateX(${offset}px)`
                }}
              >
                <img
                  src={galleryImages[currentView.nextIndex].url}
                  alt={galleryImages[currentView.nextIndex].alt}
                  className="w-full h-full object-contain select-none px-4"
                  draggable={false}
                />
              </div>
            )}

            {/* Controls */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute left-4 top-4 w-10 h-10 flex items-center justify-center text-white z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {`${selectedImageIndex! + 1} / ${galleryImages.length}`}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;