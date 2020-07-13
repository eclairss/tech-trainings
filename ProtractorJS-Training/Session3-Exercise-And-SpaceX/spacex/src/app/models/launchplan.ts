import { LaunchSite } from "./launchsite";
import { Payload } from "./payload";
import { Rocket } from "./rocket";

//A class model that defines the launches that were set during scheduling launchers.
export class LaunchPlan {
  public id: number;

  public FlightNumber: number;
  public MissionName: string;
  public MissionID: string;

  public Details: string;

  public LaunchDate: Date;
  public LaunchedWindow: number;
  public LaunchSuccess: string;
  public LaunchSite: LaunchSite;
  public LaunchStatusDetails: string;
  public ActualLaunchDate: Date;

  public Rocket: Rocket;
  public Ships: string[];
  public Payloads: Payload[];

  constructor(
    flightNumber: number,
    missionName: string,
    missionID: string,
    details: string,
    launchDate: Date,
    launchWindow: number,
    // rockets: Rocket[], payloads: Payload[], launchsite: LaunchSite,
    launchSuccess = null
  ) {
    this.FlightNumber = flightNumber;
    this.MissionName = missionName;
    this.MissionID = missionID;
    this.Details = details;
    this.LaunchDate = launchDate;
    this.LaunchedWindow = launchWindow;
    // this.Rockets = rockets;
    // this.Payloads = payloads;
    // this.LaunchSite = launchsite;
    this.LaunchSuccess = launchSuccess;
  }

  public MapSpaceXToModel(data): LaunchPlan {
    if (data["launch_site"] !== undefined && data["launch_site"] !== null) {
      let loc: LaunchSite = new LaunchSite().MapSpaceXToModel(
        data["launch_site"]
      );
      this.LaunchSite = loc;
    }

    if (data["ships"] !== undefined && data["ship"] !== null) {
      this.Ships = [...data["ships"]];
    }

    if (data["rocket"] !== undefined && data["rocket"] !== null) {
      let rocket = data["rocket"],
        details = rocket["second_stage"],
        loads = details["payloads"];

      this.Rocket = new Rocket(
        rocket["rocket_id"],
        rocket["rocket_name"],
        "",
        rocket["rocket_type"]
      );

      this.Payloads = [];
      let payloads = Object.keys(loads).map((i) => loads[i]);
      for (let payload of payloads) {
        let pl = new Payload(payload["payload_id"], payload["payload_type"]);
        this.Payloads.push(pl);
      }
    }

    return this;
  }
}
