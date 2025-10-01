import { ToastData } from "src/types";

let toasterCount = 1;

class Observer {
  public subscribers = new Set<Function>();

  subscribe(callback: Function) {
    this.subscribers.add(callback);
  }

  publish(data: ToastData | string) {
    let temp;
    if (typeof data == "string") {
      temp = { message: data };
    }

    const toastData = {
      ...temp,
      id: toasterCount++,
      dismiss: false,
    };

    this.subscribers.forEach((callback) => {
      callback(toastData);
    });
  }

  dismiss(id: number) {
    if (id) {
      this.subscribers.forEach((callback) => {
        callback({ id, dismiss: true });
      });
    }
  }
}

export const ToastState = new Observer();

export const toast = ToastState.publish.bind(ToastState);
