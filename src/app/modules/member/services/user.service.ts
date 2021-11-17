import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}
  registrateUser(user: any) {
    return this._http.post('api/user', { data: user });
  }
  editUser(id: string, data: any) {
    return this._http.put(`api/user/${id}`, { data });
  }
  getUsers(role?: string) {
    let data = role ? { role } : {};

    return this._http.post('api/user/find', { data });
  }
  getArbitrs() {
    return this._http.post('api/user/arbitr/find', {});
  }
  deleteUser(id: string) {
    return this._http.delete(`api/user/${id}`);
  }
  resetPassword(id: string) {
    return this._http.patch(`api/user/${id}/password`, {});
  }
  changePassword(data: { password: string; newPassword: string }) {
    return this._http.patch(`api/user/password`, { data });
  }
}
