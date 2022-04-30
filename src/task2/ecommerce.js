////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from '../api';

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const fetchAllOrders = async () => {
  //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
  try {
    const ids = allIds;
    const fetchedOrders = ids.map((id) => fetchOrderById(id));
    return Promise.all(fetchedOrders);
  } catch (error) {
    console.error(error);
  }
};

const bucketOrdersByUsers = async () => {
  //   2. TODO: using the function from section 1 you should now bucket the orders by user.
  // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
  try {
    let ordersByUsers = {};
    const allOrders = await fetchAllOrders();

    allOrders.forEach((order) => {
      if (ordersByUsers[order.userId]) {
        ordersByUsers[order.userId] = [...ordersByUsers[order.userId], order];
      } else {
        ordersByUsers[order.userId] = [order];
      }
    });

    return ordersByUsers;
  } catch (error) {
    console.error(error);
  }
};

const getLast2WeeksOrders = async () => {
  //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
  try {
    const twoWeeks = Date.now() - 1000 * 60 * 60 * 24 * 14;

    const allOrders = await fetchAllOrders();

    return allOrders.filter((order) => order.timestamp < twoWeeks);
  } catch (error) {
    console.error(error);
  }
};

const bucketOrdersByDate = async () => {
  //   4. TODO: using the function from section 3 bucket the orders by date.
  // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
  let ordersByDate = {};
  try {
    const ordersFromLastTwoWeeks = await getLast2WeeksOrders();

    ordersFromLastTwoWeeks.forEach((order) => {
      if (ordersByDate[order.timestamp]) {
        ordersByDate[order.timestamp] = [...ordersByDate[order.timestamp], order];
      } else {
        ordersByDate[order.timestamp] = [order];
      }
    });
    return ordersByDate;
  } catch (error) {
    console.error(error);
  }
};

fetchAllOrders();
// .then(console.log);

bucketOrdersByUsers();
// .then(console.log);

getLast2WeeksOrders();
// .then(console.log);

bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
