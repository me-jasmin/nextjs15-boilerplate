export type Launch = {
    ceo: string;
    coo: string;
    cto: string;
    cto_propulsion: string;
    employees: number;
    founded: number;
    founder: string;
    headquarters: {
        state: string;
        city: string;
        address: string;
    };
    launch_sites: number;
    links: {
        website: string;
        twitter: string;
        flickr: string;
        elon_twitter: string;
    };
    name: string;
    summary: string;
    test_sites: number;
    valuation: number;
    vehicles: number;
};

export const launch = `
query GetLaunches($limit: Int!) {
    launchesPast(limit: $limit) {
        id
        mission_name
        launch_date_utc
        launch_success
        details
        links {
            mission_patch
            article_link
            video_link
            wikipedia
        }
        rocket {
            rocket_name
            rocket_type
        }
    }
}`;
