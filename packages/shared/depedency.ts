export type VoidFunc<T> = (param: T) => void;

export interface ISubscribable<T> {
  subscribe: (param: VoidFunc<T | undefined>) => VoidFunc<undefined>;
}

export class Depedency<T> implements ISubscribable<T> {
  private subscribers: VoidFunc<T>[];
  private state: T;

  constructor(initialVal: T) {
    this.subscribers = [];
    this.state = initialVal;
  }

  /*
   * @param{}
   * @return - closure to unsubscribe dependency
   */
  public subscribe(param: VoidFunc<T>) {
    this.subscribers.push(param);
    const subscriberIndex = this.subscribers.length - 1;
    return () => {
      this.subscribers = this.subscribers.filter(
        (_, index) => index !== subscriberIndex,
      );
    };
  }

  get value(): T {
    return this.state;
  }

  set value(newValue: T) {
    this.state = newValue;
    this.subscribers.forEach((notify) => {
      notify(newValue);
    });
  }
}
