type LaunchTypes = {
    id: string;
    details: string;
    launch_date_utc: string;
    launch_site: {
        site_name: string;
    } | null;
    launch_success: string | null;
    links: {
        article_link: string;
        flickr_images: string[];
        wikipedia: string;
        video_link: string;
        mission_patch: string | null;
    };
    rocket: {
        rocket_name: string;
        rocket: {
            id: string;
        };
    };
    mission_name: string;
};

const launch = `
query launch($launchId: ID!) {
    launch(id: $launchId) {
        details
        launch_date_utc
        launch_site {
            site_name
        }
        launch_success
        links {
            article_link
            flickr_images
            wikipedia
            video_link
            mission_patch
        }
        rocket {
            rocket_name
            rocket {
                id
            }
        }
        mission_name
    }
}`;

const launches = `
query launches($limit: Int, $offset: Int, $sort: String, $order: String) {
    launchesPast(limit: $limit, offset: $offset, sort: $sort, order: $order) {
        id
        details
        launch_date_utc
        launch_site {
            site_name
        }
        launch_success
        links {
            article_link
            flickr_images
            wikipedia
            video_link
            mission_patch
        }
        rocket {
            rocket_name
            rocket {
                id
            }
        }
        mission_name
    }
}`;

export { launches, launch };
export type { LaunchTypes };
