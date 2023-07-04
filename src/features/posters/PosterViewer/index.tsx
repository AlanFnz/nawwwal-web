'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { cleanCurrentPoster } from '@/state/slices/shopifySlice';

import { PosterContainer, PosterImage } from './PosterViewer.styles';
import Dropdown from '@/components/ui/Dropdown';
import AddToCartButton from '@/components/ui/AddToCartButton';
import PosterInfoButton from '@/features/posters/PosterInfoButton';
import { DialogContent, DialogFooter } from '@/components/ui/Dialog';

interface Image {
  src: string;
}

interface Poster {
  title: string;
  images: Image[];
  id?: string;
  variants?: any[];
}

const PosterViewer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPoster = useSelector<RootState, Poster | null>(
    (state) => state.shopify.currentPoster
  );
  const { title, images } = currentPoster || {
    title: '',
    images: [{ src: '' }],
  };

  const closeAction = () => {
    dispatch(cleanCurrentPoster());
  };

  return (
    <DialogContent onClose={closeAction}>
      <PosterContainer>
        <PosterImage
          alt={title}
          src={images[0].src}
          width={100}
          height={100}
          unoptimized={true}
        />
      </PosterContainer>
      <DialogFooter>
        {currentPoster?.variants && (
          <Dropdown options={currentPoster.variants} />
        )}
        <PosterInfoButton />
        <AddToCartButton />
      </DialogFooter>
    </DialogContent>
  );
};

export default PosterViewer;
