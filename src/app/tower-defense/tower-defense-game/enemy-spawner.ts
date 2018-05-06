import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {
  Enemy,
  GreenMinion,
  WhiteMinion,
  BrownMinion,
  GreyMinion,
  GreenTank,
  WhiteTank,
  GreenPlane,
  WhitePlane,
  GreenCannon,
  WhiteCannon,
} from './enemy';

export interface EnemyType {
  type: string;
  constructors: Array<typeof Enemy>;
  weight: (level: number) => number;
}

export class EnemySpawner {
  static enemyTypes: EnemyType[] = [{
    type: 'minion',
    constructors: [GreenMinion, WhiteMinion, BrownMinion, GreyMinion],
    weight(level) {
      return Math.max(5, 100 - level * 10);
    },
  }, {
    type: 'tank',
    constructors: [GreenTank, WhiteTank],
    weight(level) {
      return Math.min(35, Math.max(0, -5 + level * 15));
    },
  }, {
    type: 'plane',
    constructors: [GreenPlane, WhitePlane],
    weight(level) {
      return Math.min(20, Math.max(0, -15 + level * 10));
    },
  }, {
    type: 'cannon',
    constructors: [GreenCannon, WhiteCannon],
    weight(level) {
      return Math.min(40, Math.max(0, -40 + level * 20));
    },
  }];

  private numEnemies = 0;
  private ellapsed = 0;
  private rate: number;
  private maxEnemies: number;
  private maxTime: number;
  private subject: Subject<typeof Enemy>;
  private rng: Phaser.Math.RandomDataGenerator;
  private enemyTypes: EnemyType[];
  private cumulativeWeights: number[];

  constructor(private level: number, isInfinite = false) {
    this.rate = Math.min(10, Math.sqrt(level + 1));
    this.maxTime = 60000 + this.level * 10000;
    this.maxEnemies = this.rate * (this.maxTime / 1000 + 10);
    if (isInfinite) {
      this.maxTime = -1;
      this.maxEnemies = -1;
    }
    this.rng = new Phaser.Math.RandomDataGenerator([Date.now().toString()]);
    this.cumulativeWeights = EnemySpawner.enemyTypes.map((enemyType) => {
      return enemyType.weight(this.level);
    });
    const total = this.cumulativeWeights.reduce((s, e) => s + e, 0);
    for (let i = 0; i < this.cumulativeWeights.length; i++) {
      if (i === 0) {
        this.cumulativeWeights[i] /= total;
      } else {
        this.cumulativeWeights[i] = this.cumulativeWeights[i] / total + this.cumulativeWeights[i - 1];
      }
    }
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
      } else if (this.rng.frac() < rate) {
        this.spawn();
      }
    }
  }

  private spawn(): void {
    const rand = this.rng.frac();
    let i: number;
    for (i = 0; i < this.cumulativeWeights.length; i++) {
      if (rand < this.cumulativeWeights[i]) {
        break;
      }
    }
    const ctors = EnemySpawner.enemyTypes[i].constructors;
    this.subject.next(ctors[Phaser.Math.Between(0, ctors.length - 1)]);
    this.numEnemies += 1;
  }
}
