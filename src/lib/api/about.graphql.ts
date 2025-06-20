type AboutTypes = {
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

const about = `
query about {
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

export default about;
export type { AboutTypes };
