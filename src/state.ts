let toasterCount = 1;

class Observer {
  public subscribers = new Set<Function>();

  subscribe(callback: Function) {
    this.subscribers.add(callback);
  }

  publish(data: unknown) {
    const toastData = {
      ...(data as object),
      id: toasterCount++,
      dismiss: false,
    };
    console.log(toastData);
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
