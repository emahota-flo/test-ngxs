import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Add, App, AppStore, Change } from './app-store/app.store';

const apps: App[] = [
  { name: 'name 1', value1: 12938091, value2: 12938091, value3: 12938091 },
  { name: 'name 2', value1: 57657567, value2: 57657567, value3: 57657567 },
  { name: 'name 3', value1: 23423423, value2: 23423423, value3: 23423423 },
  { name: 'name 4', value1: 23436546, value2: 23436546, value3: 23436546 },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  sub: Subscription;
  @Select(AppStore.apps)
  apps$: Observable<App[]>;
  apps: App[];

  constructor(private store: Store) {
  }

  public ngOnInit(): void {
    this.sub = this.apps$
      .subscribe(data => {
        console.log(data);
        this.apps = data;
      });
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  add() {
    this.store.dispatch(new Add(apps));
  }

  change1() {
    this.store.dispatch(new Change(
      { name: 'name 2', value1: 57657567, value2: 57657567, value3: 57657567 },
      'value2',
      0,
    ));
  }

  change2() {
    const newApps = this.apps.map(app => {
      if (app.name === 'name 3') {
        app.value2 = 1;
      }
      return app;
    });
    this.store.dispatch(new Add(newApps));
  }

}
