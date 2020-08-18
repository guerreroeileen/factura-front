import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FacturaServiceService {
  private REST_API_SERVER = "http://localhost:8080/factura/";

  constructor(private httpClient: HttpClient) { }


  public save ( factura: any): Observable<any>{
    return this.httpClient.post(this.REST_API_SERVER, factura);
  }

  public getNITReceptor (NITReceptor: string): Observable<any>{
    return this.httpClient.get(this.REST_API_SERVER+'nitreceptor')
  }


}
