export type Rocket = {
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
};

export const rocket = `
query Rockets {
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
