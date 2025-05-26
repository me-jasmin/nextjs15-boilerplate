import { cache } from 'react';





export interface CompanyInfo {
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
}

export interface Rocket {
    id: string;
    name: string;
    type: string;
    active: boolean;
    stages: number;
    boosters: number;
    cost_per_launch: number;
    success_rate_pct: number;
    first_flight: string;
    country: string;
    company: string;
    height: {
        meters: number;
        feet: number;
    };
    diameter: {
        meters: number;
        feet: number;
    };
    mass: {
        kg: number;
        lb: number;
    };
    description: string;
    wikipedia: string;
}

export interface Launch {
    id: string;
    mission_name: string;
    launch_date_utc: string;
    launch_success: boolean;
    details: string;
    links: {
        mission_patch: string;
        article_link: string;
        video_link: string;
        wikipedia: string;
    };
    rocket: {
        rocket_name: string;
        rocket_type: string;
    };
}

async function fetchGraphQL(query: string, variables = {}, revalidate = 3600) {
    const endpoint = process.env.REACT_APP_SPACEX_API;

    if (!endpoint) throw new Error('Missing environment variable: REACT_APP_SPACEX_API');

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
            next: {
                revalidate,
            },
        });

        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getCompanyInfo = cache(async (): Promise<CompanyInfo> => {
    const query = `
    query GetCompanyInfo {
        company {
            ceo
            coo
            cto
            cto_propulsion
            employees
            founded
            founder
            headquarters {
                state
                city
                address
            }
            launch_sites
            links {
                website
                twitter
                flickr
                elon_twitter
            }
            name
            summary
            test_sites
            valuation
            vehicles
        }
    }`;

    const { data } = await fetchGraphQL(query);
    return data.company;
});

export const getRockets = cache(async (): Promise<Rocket[]> => {
    const query = `
    query GetRockets {
        rockets {
            id
            name
            type
            active
            stages
            boosters
            cost_per_launch
            success_rate_pct
            first_flight
            country
            company
            height {
                meters
                feet
            }
            diameter {
                meters
                feet
            }
            mass {
                kg
                lb
            }
            description
            wikipedia
        }
    }`;

    const { data } = await fetchGraphQL(query);
    return data.rockets;
});

export const getLaunches = cache(async (limit = 10): Promise<Launch[]> => {
    const query = `
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

    const { data } = await fetchGraphQL(query, { limit });
    return data.launchesPast;
});