type RocketTypes = {
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
    };
    diameter: {
        meters: number;
    };
    mass: {
        kg: number;
    };
    description: string;
    wikipedia: string;
};

const rocketFields = `
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
    }
    diameter {
        meters
    }
    mass {
        kg
    }
    description
    wikipedia
`;

const rocket = `
query rocket($id: ID!) {
    rocket(id: $id) {
        ${rocketFields}
    }
}`;

const rockets = `
query rockets {
    rockets {
        ${rocketFields}
    }
}`;

export { rockets, rocket };
export type { RocketTypes };
