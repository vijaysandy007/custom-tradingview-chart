import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricefeedService {

  constructor(private http:HttpClient) { }

  apiUrl = "https://api.lynxcrypto.app/v1/tokens/metadata?tokenId=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c:56,0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47:1'"
  apiKey = "g77CoMvJEG1KsS8eai7Oo5I9SREpnw1h2k76Y4Td"
  getPriceFromApi(){
    const headers = new HttpHeaders().set('x-api-key',this.apiKey)
    return this.http.get(this.apiUrl,{headers:headers});
  }

  getJsonData(): Observable<any> {
    return this.http.get<any>('../assets/js/data.json');
  }
}
