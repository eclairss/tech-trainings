import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LaunchPlanService } from '../launch-plan.service';
import { LaunchPlan } from 'src/app/models/launchplan';
import { BehaviorSubject } from 'rxjs';
import { Rocket } from 'src/app/models/rocket';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpaceXService {
  private apiURL: string = 'https://api.spacexdata.com/v3/';

  private readonly _rockets = new BehaviorSubject<Rocket[]>([]);

  readonly rockets$ = this._rockets.asObservable();

  public get rockets(): Rocket[] {
    return this._rockets.getValue();
  }
  public set rockets(r: Rocket[]) {
    this._rockets.next(r);
  }

  constructor(private http: HttpClient,
              private launchPlanService: LaunchPlanService) { 

                this.getAllRockets();
                this.getAllShips();
              }

  getAllLaunches() {
    return this.http.get( this.apiURL + 'launches');
  }

  getAllRockets() {
    return this.http.get<Rocket[]>(this.apiURL + 'rockets')
    .subscribe(data => {
      data.forEach(r => {
        this.rockets.push(new Rocket(r["rocket_id"], r["rocket_name"], "", r["rocket_type"]));
      });
    });
  }

  getAllShips() {
    return this.http.get<string[]>(this.apiURL + "ships")
    .subscribe(data => {
      console.log("SHIPS PULLED FROM SERVICEX");
    });
  }

  InitialSeed(){
    //todo: add loading/initializing progress bar during first run of App.
    console.log("Seeding initial data...")
    this.getAllLaunches()
        .subscribe((launches: Object[])  => {
          console.log("START Seeding Launches", launches);
          let launchPlans = [];
          for(let i =0; i < 5; i++)
          {
            let launchPlan = this.launchPlanService.MapToModel(launches[i]);
            launchPlans.push(launchPlan);
            
            setTimeout(() => {
              this.launchPlanService.Create(launchPlan);
            }, 3000);
          }
          console.log("Launch Plans", launchPlans);
        });
  }
}
