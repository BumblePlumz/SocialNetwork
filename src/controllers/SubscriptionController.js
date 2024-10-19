import { Subscription } from '../models/Subscription.js';
import { SubscriptionError } from '../classes/SubscriptionError.js';


export const getSubscriptions = async (userID) => {
  try {
    const subscriptions = await Subscription.findAll({ where: { ownerID: userID } });
    return subscriptions;
  } catch (error) {
    throw new SubscriptionError(500, error.message);
  }
};

export const subscribe = async (userID, targetID) => {
  try {
    const subscription = await Subscription.create({ ownerID: userID, targetID });
  } catch (error) {
    throw new SubscriptionError(500, error.message);
  }
};

export const unsubscribe = async (userID, targetID) => {
  try {
    const subscription = await Subscription.destroy({ where: { ownerID: userID, targetID } });
  } catch (error) {
    throw new SubscriptionError(500, error.message);
  }
};