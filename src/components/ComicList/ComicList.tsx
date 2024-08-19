import React from 'react';
import { useTranslation } from 'react-i18next';
import { Comic } from '../../types/marvel';

import './ComicList.scss';

interface ComicListProps {
  list: Comic[];
}

const ComicList: React.FC<ComicListProps> = ({ list }) => {
  const { t } = useTranslation();

  return (
    <div className="character-detail__comics">
      <h2>{t('comics')}</h2>
      <div className="character-detail__comics-list">
        {list.map((comic) => (
          <div key={comic.id} className="comic-card">
            <img
              className="comic-card__image"
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <h3 className="comic-card__title">{comic.title}</h3>
            <p className="comic-card__date">
              {comic.dates
                .find((date) => date.type === 'onsaleDate')
                ?.date.split('-')[0] || t('unknown')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicList;
