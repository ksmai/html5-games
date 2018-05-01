import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface EnemySpawnerOptions {
  rate?: number;
  maxEnemies?: number;
  maxTime?: number;
}

export class EnemySpawner {
  private numEnemies = 0;
  private ellapsed = 0;
  private rate: number;
  private maxEnemies: number;
  private maxTime: number;
  private subject: Subject<any>;

  static defaultOptions: EnemySpawnerOptions = {
    rate: 1,
    maxEnemies: -1,
    maxTime: -1,
  };

  constructor(options: EnemySpawnerOptions) {
    const mergedOptions = Object.assign({}, EnemySpawner.defaultOptions, options || {});
    this.rate = mergedOptions.rate;
    this.maxEnemies = mergedOptions.maxEnemies;
    this.maxTime = mergedOptions.maxTime;
  }

  startSpawn(): Observable<any> {
    this.subject = new Subject();
    this.numEnemies = 0;
    this.ellapsed = 0;

    return this.subject.asObservable();
  }

  update(dt: number) {
    this.ellapsed += dt;

    if (this.subject) {
      if (this.maxEnemies > 0 && this.maxEnemies <= this.numEnemies || this.maxTime > 0 && this.ellapsed >= this.maxTime) {
        this.subject.complete();
        this.subject = null;
        return;
      }

      const rate = this.rate * dt / 1000;
      if (rate > 1) {
        const count = Math.floor(rate);
        for (let i = 0; i < count; i++) {
          if (this.maxEnemies < 0 || this.maxEnemies > this.numEnemies) {
            this.spawn();
          } else {
            break;
          }
        }
      } else if (Math.random() < rate) {
        this.spawn();
      }
    }
  }

  private spawn(): void {
    this.subject.next();
    this.numEnemies += 1;
  }
}
