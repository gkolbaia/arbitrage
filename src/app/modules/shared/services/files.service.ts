import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private _http: HttpClient) {}
  uploadFile(data: FormData) {
    return this._http.post('api/file', data);
  }
  donwloadFile(id: string, fileName: string) {
    return this._http.get(`api/file/${id}`, { responseType: 'blob' }).pipe(
      map((res) => {
        const file = URL.createObjectURL(res);
        const anchor = document.createElement('a');
        anchor.href = file;
        anchor.download = fileName;
        anchor.click();
        URL.revokeObjectURL(file);
        anchor.remove();
      })
    );
  }
}
