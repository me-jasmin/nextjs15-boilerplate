import about from '@/lib/api/about.graphql';
import launches from '@/lib/api/launch.graphql';
import roadster from '@/lib/api/roadster.graphql';
import rockets, { rocket } from '@/lib/api/rocket.graphql';

import type { AboutTypes } from '@/lib/api/about.graphql';
import type { LaunchTypes } from '@/lib/api/launch.graphql';
import type { RoadsterTypes } from '@/lib/api/roadster.graphql';
import type { RocketTypes } from '@/lib/api/rocket.graphql';

export { about, launches, roadster, rockets, rocket };

export type { AboutTypes, LaunchTypes, RoadsterTypes, RocketTypes };
