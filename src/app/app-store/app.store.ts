import { Action, Selector, State, StateContext } from '@ngxs/store';

export class Add {
  static readonly type = '[APP]: add';

  constructor(public apps: App[]) {
  }
}

export class Change {
  static readonly type = '[APP]: change';

  constructor(public app: App, public field: string, public value: any) {
  }
}

export interface App {
  name: string;
  value1: number;
  value2: number;
  value3: number;
}

export interface AppStateModel {
  apps: App[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    apps: [],
  },
})

export class AppStore {

  @Selector()
  static apps({ apps }: AppStateModel): App[] {
    return apps;
  }

  @Action(Add)
  add({ setState, getState }: StateContext<AppStateModel>, { apps }: Add) {
    setState({
      apps,
    });
  }

  @Action(Change)
  change({ setState, getState }: StateContext<AppStateModel>,
         { app, field, value }: Change) {
    const { apps } = getState();
    const newApps: App[] = apps.map(itemApp => {
      if (itemApp.name === app.name) {
        return {
          ...itemApp,
          [field]: value,
        };
      }
      return itemApp;
    });
    setState({
      apps: newApps,
    });
  }

}
