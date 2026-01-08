import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryConfig } from '@/config/images';

const galleryImages = galleryConfig;

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section id="gallery" className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold font-medium tracking-widest uppercase text-sm">Gallery</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Media & <span className="text-gradient">Highlights</span>
          </h2>
          <p className="text-muted-foreground">
            Captured moments from various events that showcase the energy and 
            excellence I bring to every occasion.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className={`aspect-square ${index === 0 ? 'md:aspect-auto md:h-full' : ''}`}>
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs text-gold font-medium">{image.category}</span>
                  <h4 className="font-display text-lg font-semibold text-foreground">{image.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-border hover:border-gold flex items-center justify-center text-muted-foreground hover:text-gold transition-all duration-300"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 w-12 h-12 rounded-full border border-border hover:border-gold flex items-center justify-center text-muted-foreground hover:text-gold transition-all duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <div
              className="max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                className="w-full h-full object-contain"
              />
              <div className="text-center mt-4">
                <h4 className="font-display text-xl font-semibold">
                  {galleryImages[selectedImage].title}
                </h4>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 w-12 h-12 rounded-full border border-border hover:border-gold flex items-center justify-center text-muted-foreground hover:text-gold transition-all duration-300"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
