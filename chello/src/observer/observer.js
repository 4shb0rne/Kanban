import { GetNotification } from "../controller/NotificationController";

export class Observer {
  observers = [];

  subscribe(user) {
    this.observers.push();
  }

  unsubscribe(user) {
    this.observers = this.observers.filter(function (o) {
      if (o !== user) {
        return o;
      }
    });
  }

  async notifySubscriber(userId) {
    const notifications = await GetNotification(userId);
    return notifications;
  }
}
