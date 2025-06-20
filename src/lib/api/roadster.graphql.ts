type RoadsterTypes = {
    details: string;
    earth_distance_km: number;
    launch_date_utc: string;
    launch_mass_kg: number;
    mars_distance_km: number;
    period_days: number;
    speed_kph: number;
    wikipedia: string;
};

const roadster = `
query Roadster {
    roadster {
        details
        earth_distance_km
        launch_date_utc
        launch_mass_kg
        mars_distance_km
        period_days
        speed_kph
        wikipedia
    }
}`;

export default roadster;
export type { RoadsterTypes };
