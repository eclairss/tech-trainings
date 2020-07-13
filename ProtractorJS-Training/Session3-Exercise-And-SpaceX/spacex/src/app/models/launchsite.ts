export class LaunchSite {
    public id: number;
    public SiteName: string;
    public Location: string;
    public Region: string;
    public Details: string;

    public MapSpaceXToModel(item) : LaunchSite
    {
        if(item !== null && item !== undefined)
        {
          let launchSite = new LaunchSite();
          this.id = item["id"];
          this.SiteName = item["site_name_long"];
          this.Details = item["details"];
    
          var location = item["location"]
          if(location !== null && location !== undefined)
          {
            this.Location = location["name"];
            this.Region = location["region"];
          }
          else 
          {
            this.Location = item["site_name"];
          }
          return this;
        }
            
        return null;
    }
}