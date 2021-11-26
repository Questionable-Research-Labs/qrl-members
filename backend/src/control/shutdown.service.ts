import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class ShutdownService implements OnModuleDestroy {
  // Create an rxjs Subject that your application can subscribe to
  private shutdownListener$: Subject<void> = new Subject();

  // Your hook will be executed
  onModuleDestroy() {
    console.log('Executing OnDestroy Hook');
  }

  // Subscribe to the shutdown in your main.ts
  subscribeToShutdown(shutdownFn: () => void): void {
    this.shutdownListener$.subscribe(() => shutdownFn());
  }

  // Emit the shutdown event
  shutdown() {
    this.shutdownListener$.next();
  }
}
