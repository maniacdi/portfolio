'use client';

import { Travel } from '@/utils/types/Travel';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Calendar, 
  Star, 
  ChevronLeft,
  ChevronRight,
  Camera,
  Globe,
  Clock
} from 'lucide-react';
import { useLocale, useTranslations } from "next-intl";
import { useState } from 'react';
import './TravelModal.scss';
import { formatDate, getDuration, getTypeColor } from '@/utils/helpers/travels';

interface TravelModalProps {
  travel: Travel;
  isOpen: boolean;
  onClose: () => void;
}

export default function TravelModal({ travel, isOpen, onClose }: TravelModalProps) {
  const t = useTranslations('travels');
  const locale = useLocale();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);


  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === travel.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? travel.photos.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="travel-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="travel-modal"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Close button */}
            <button className="modal-close-btn" onClick={onClose}>
              <X size={24} />
            </button>

            {/* Modal content */}
            <div className="modal-content">
              {/* Photo gallery */}
              <div className="modal-gallery">
                {travel.photos.length > 0 ? (
                  <>
                    <img 
                      src={travel.photos[currentPhotoIndex]} 
                      alt={`${travel.title} - Photo ${currentPhotoIndex + 1}`}
                      className="modal-main-photo"
                    />
                    
                    {travel.photos.length > 1 && (
                      <>
                        <button className="gallery-nav prev" onClick={prevPhoto}>
                          <ChevronLeft size={24} />
                        </button>
                        <button className="gallery-nav next" onClick={nextPhoto}>
                          <ChevronRight size={24} />
                        </button>
                        
                        <div className="gallery-thumbnails">
                          {travel.photos.map((photo: string | Blob | undefined, index: number ) => (
                            <button
                              key={index}
                              className={`thumbnail ${index === currentPhotoIndex ? 'active' : ''}`}
                              onClick={() => setCurrentPhotoIndex(index)}
                            >
                              <img src={photo} alt={`Thumbnail ${index + 1}`} />
                            </button>
                          ))}
                        </div>
                        
                        <div className="photo-counter">
                          {currentPhotoIndex + 1} / {travel.photos.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="no-photos">
                    <Camera size={48} />
                    <p>No photos available</p>
                  </div>
                )}
              </div>

              {/* Travel info */}
              <div className="modal-info">
                {/* Header */}
                <div className="modal-header">
                  <div className="header-top">
                    <span 
                      className="travel-type-badge"
                      style={{ background: getTypeColor(travel.type) }}
                    >
                      {travel.type}
                    </span>
                    {travel.isFeatured && (
                      <span className="featured-badge">⭐ {t('featured')}</span>
                    )}
                  </div>
                  
                  <h2 className="modal-title">{travel.title}</h2>
                  
                  <div className="travel-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        fill={i < travel.rating ? "#FFD700" : "none"}
                        color="#FFD700"
                      />
                    ))}
                    <span className="rating-text">{travel.rating}/5</span>
                  </div>
                </div>

                {/* Location and date */}
                <div className="travel-details">
                  <div className="detail-item">
                    <MapPin size={18} />
                    <div>
                      <span className="detail-label">{t('location')}</span>
                      <span className="detail-value">
                        {travel.location.city}, {travel.location.country}
                      </span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <Calendar size={18} />
                    <div>
                      <span className="detail-label">{t('dates')}</span>
                      <span className="detail-value">
                        {formatDate(travel.date.start, locale)} - {formatDate(travel.date.end, locale)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <Clock size={18} />
                    <div>
                      <span className="detail-label">{t('duration')}</span>
                      <span className="detail-value">{getDuration(travel)} {t('days')}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="travel-description">
                  <h3>About this trip</h3>
                  <p>{travel.description}</p>
                </div>

                {/* Highlights */}
                {travel.highlights.length > 0 && (
                  <div className="travel-highlights">
                    <h3>{t('highlights')}</h3>
                    <ul className="highlights-list">
                      {travel.highlights.map((highlight: string | null | undefined, index: number) => (
                        <li key={index} className="highlight-item">
                          <div className="highlight-bullet"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tips */}
                {travel.tips && (
                  <div className="travel-tips">
                    <h3>{t('tips')}</h3>
                    <div className="tips-content">
                      <Globe size={20} />
                      <p>{travel.tips}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}