/* eslint-disable testing-library/await-async-query */
import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react';
import { fetchImage, fetchImageUrls } from '../api';
import ImageCarousel from './ImageCarousel';

afterEach(() => cleanup());

test('Is mageCarousel component is rendered', () => {
  render(<ImageCarousel />);
  const imageCarouselElement = screen.getByTestId('ImageCarousel');
  expect(imageCarouselElement).toBeInTheDocument();
});

test('ImageCarousel - fetchImageUrls', async () => {
  const imageUrl = await fetchImageUrls();
  expect(imageUrl).toBeTruthy();
});

test('ImageCarousel - fetchImage', async () => {
  const image = await fetchImage();
  expect(image).toBeTruthy();
});
