type LaunchTypes = {
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

const launches = `
query launches($limit: Int, $offset: Int, $sort: String, $order: String) {
    launchesPast(limit: $limit, offset: $offset, sort: $sort, order: $order) {
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

export default launches;
export type { LaunchTypes };
