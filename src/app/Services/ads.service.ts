import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environment';
import { Ads } from '../Models/Ads';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  private apiUrl =
    environment.apiUrl;

  constructor(
    private http:
      HttpClient
  ) { }

  /*
  CREATE ADS
  */
  createAds(
    formData: FormData
  ): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/createAds`,
      formData
    );

  }

  /*
  GET ALL ADS
  */
  getAllAds():
    Observable<Ads[]> {

    return this.http.get<Ads[]>(
      `${this.apiUrl}/get-all-ads`
    );

  }

  /*
  GET ADS BY ID
  */
  getAdsById(
    id: string
  ): Observable<Ads> {

    return this.http.get<Ads>(
      `${this.apiUrl}/get-ads/${id}`
    );

  }

  /*
  UPDATE ADS
  */
  updateAds(
    id: string,
    formData: FormData
  ): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/updateAds/${id}`,
      formData
    );

  }

  /*
  DELETE ADS
  */
  deleteAds(
    id: string
  ): Observable<any> {

    return this.http.delete<any>(
      `${this.apiUrl}/delete-ads/${id}`
    );

  }
}
