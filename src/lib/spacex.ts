import { cache } from 'react';

const SPACEX_API = 'https://spacex-production.up.railway.app/';

export interface CompanyInfo {
  name: string;
  founder: string;
  founded: number;
  employees: number;
  ceo: string;
  cto: string;
  coo: string;
  valuation: number;
  headquarters: {
    address: string;
    city: string;
    state: string;
  };
  summary: string;
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

async function fetchGraphQL(query: string, variables = {}) {
  try {
    const response = await fetch(SPACEX_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

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
        name
        founder
        founded
        employees
        ceo
        cto
        coo
        valuation
        headquarters {
          address
          city
          state
        }
        summary
      }
    }
  `;

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
    }
  `;

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
    }
  `;

  const { data } = await fetchGraphQL(query, { limit });
  return data.launchesPast;
});
