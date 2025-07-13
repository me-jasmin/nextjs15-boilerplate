import { about } from '@/lib/api/about.graphql';
import { launch, launches } from '@/lib/api/launch.graphql';
import roadster from '@/lib/api/roadster.graphql';
import { rocket, rockets } from '@/lib/api/rocket.graphql';

import type { AboutTypes } from '@/lib/api/about.graphql';
import type { LaunchTypes } from '@/lib/api/launch.graphql';
import type { RoadsterTypes } from '@/lib/api/roadster.graphql';
import type { RocketTypes } from '@/lib/api/rocket.graphql';

export { about, launches, launch, roadster, rockets, rocket };

export type { AboutTypes, LaunchTypes, RoadsterTypes, RocketTypes };
