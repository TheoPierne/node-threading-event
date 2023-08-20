import type { EventEmitter } from 'node:events';

declare class PythonLikeEvent {
  private constructor();
  private event: EventEmitter;
  private _flag: boolean;
  public set(): void;
  public isSet(): boolean;
  public clear(): void;
  public wait(timeout: number|null): Promise<boolean>;
}

declare namespace PythonLikeEvent {
  const PythonLikeEvent: PythonLikeEvent;
}

export = PythonLikeEvent;