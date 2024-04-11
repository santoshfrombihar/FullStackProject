import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  private url = '/assets/states-and-districts.json';

  constructor(private http: HttpClient) { }

  getStates(): Observable<string[]> {
    return this.http.get<any>(this.url).pipe(
      map((data: { states: any }) => data.states.map((state: { state: any; }) => state.state))
    );
  }

  getDistrictsByState(stateName: string): Observable<string[]> {
    return this.http.get<any>(this.url).pipe(
      map((data: { states: any }) => {
        const state = data.states.find((s: any) => s.state === stateName);
        return state ? state.districts : [];
      })
    );
  }
}