import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LaunchPlan } from '../models/launchplan';
import { Observable, BehaviorSubject } from 'rxjs';
import { SpaceXService } from './api/space-x.service';
import { tap } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LaunchPlanService {

  public apiUrl: string = environment.dbHostUrl + "/launchplans";

  private readonly _launchPlans = new BehaviorSubject<LaunchPlan[]>([]);

  readonly launchPlans$ = this._launchPlans.asObservable();

  public get launchPlans(): LaunchPlan[] {
    return this._launchPlans.getValue();
  }
  public set launchPlans(lp: LaunchPlan[]) {
    this._launchPlans.next(lp);
  }


  constructor(private http: HttpClient) {
    this.GetAll();
  }

  public GetAll() {
    return this.http.get<LaunchPlan[]>(this.apiUrl)
      .subscribe(data => {
        //  console.log("data", data);
        this.launchPlans = data;
      });
  }

  public GetByID(id: number) {
    return this.http.get<LaunchPlan>(this.apiUrl + "/" + id);
  }

  public Create(toAdd: LaunchPlan) {
    return this.http.post<LaunchPlan>(this.apiUrl, toAdd);
  }

  public Update(toUpdate: LaunchPlan) {
    return this.http.put(this.apiUrl + '/' + toUpdate.id, toUpdate);
  }

  public Delete(toDelete: LaunchPlan) {
    return this.http.delete(this.apiUrl + "/" + toDelete.id)
      .subscribe(data => {
        let upPlans = this._launchPlans.getValue().filter(x => x.id != toDelete.id);
        this.launchPlans = upPlans;
      });
  }

  public MapToModel(data): LaunchPlan {
    let launchPlan = new LaunchPlan(data["flight_number"],
      data["mission_name"],
      data["mission_id"],
      data["details"],
      data["launch_date_utc"],
      data["launch_window"],
      data["launch_success"]);

    launchPlan.MapSpaceXToModel(data);
    return launchPlan;
  }
}
