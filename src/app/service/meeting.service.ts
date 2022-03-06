import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  MOBILE_BASS_URL: string = 'https://mobilebaas.com/backend/api/manage/db';
  tableName: string = 'meeting';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'MOBILEBAASKEY': 'MTY0NjU5NzExOTcyMVdpbGxpYW0gQWZvbnNvIExlbW9zIEFsb25zbw=='
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  insert(meeting: any) {
    return this.http.post(this.MOBILE_BASS_URL+'?table='+this.tableName, meeting, this.httpOptions);
  }

  update(meeting: any) {
    return this.http.put(this.MOBILE_BASS_URL+'?table='+this.tableName, meeting, this.httpOptions);
  }

  delete(id: string) {
    return this.http.delete(this.MOBILE_BASS_URL+'/'+id+'?table='+this.tableName, this.httpOptions);
  }

  getById(id: string) {
    return this.http.get(this.MOBILE_BASS_URL+'/'+id+'?table='+this.tableName, this.httpOptions);
  }

  getAll(pageNumber: number, totalRecordsPerPage: number, sortField: string, filters: string) {
    
    let parameters = '?table=' + this.tableName;

    if(pageNumber != null) {
      parameters += '&pageNumber=' +  pageNumber;
    }

    if(totalRecordsPerPage != null) {
      parameters += '&totalRecordsPerPage=' +  totalRecordsPerPage;
    }

    if(sortField != null) {
      parameters += '&sortField=' +  sortField;
    }

    if(filters != null) {
      parameters += '&filters=' +  filters;
    }

    return this.http.get(this.MOBILE_BASS_URL + '/find' + parameters, this.httpOptions);

  }

}
