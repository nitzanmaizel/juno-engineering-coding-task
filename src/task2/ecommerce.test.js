/* eslint-disable jest/no-conditional-expect */
import { render, screen, cleanup } from '@testing-library/react';

import { fetchOrderById } from '../api';
import {
  fetchAllOrders,
  bucketOrdersByUsers,
  getLast2WeeksOrders,
  bucketOrdersByDate,
} from './ecommerce';

const ORDER_ID = '70ef599e5eca171b2bce84d1';

afterEach(() => cleanup());

test('Ecommerce - fetchOrderById', async () => {
  const orders = await fetchOrderById(ORDER_ID);
  expect(orders).toBeTruthy();
});

test('Ecommerce - fetchAllOrders', async () => {
  const allOrders = await fetchAllOrders();
  expect(allOrders).toBeTruthy();
});

test('Ecommerce - bucketOrdersByUsers', async () => {
  const usersBucket = await bucketOrdersByUsers();
  expect(usersBucket).toBeTruthy();
});

test('Ecommerce - getLast2WeeksOrders', async () => {
  const last2WeekOrders = await getLast2WeeksOrders();
  expect(last2WeekOrders).toBeTruthy();
});

test('Ecommerce - bucketOrdersByDate', async () => {
  const ordersByDate = await bucketOrdersByDate();
  expect(ordersByDate).toBeTruthy();
});
