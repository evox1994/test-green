import { makeAutoObservable } from 'mobx';
import type { SetAuthPayload } from './types';

export class AuthStore {
  idInstance: string | null = null;
  apiTokenInstance: string | null = null;

  constructor() {
    makeAutoObservable(this);
    const id = localStorage.getItem('id');
    const apiToken = localStorage.getItem('apiToken');
    if (id && apiToken) {
      this.idInstance = id;
      this.apiTokenInstance = id;
    }
  }

  get isAuth() {
    return this.apiTokenInstance && this.idInstance;
  }

  setAuthValues = ({ id, token }: SetAuthPayload) => {
    this.idInstance = id;
    this.apiTokenInstance = token;
  };
}
