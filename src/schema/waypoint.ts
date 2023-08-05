import { z } from 'zod';

export const Waypoint = z.object({
	_type: z.literal('waypoint'),

	// Required
	desc: z.string(), // Name of the waypoint that is included in the sent transition message, copied into the location message inregions array when a current position is within a region. (iOS,Android,string/required)
	tst: z.number().int(), // Timestamp of creation of region, copied into the wtst element of the transition message (iOS,Android/integer/epoch/required)

	// Optional
	lat: z.number().optional(), // Latitude (iOS,Android/float/meters/optional)
	lon: z.number().optional(), // Longitude (iOS,Android/float/meters/optional)
	major: z.number().int().optional(), // Major number of the BLE Beacon (iOS/integer/optional)
	minor: z.number().int().optional(), // Minor number of the BLE Beacon_(iOS/integer/optional)_
	rad: z.number().int().optional(), // Radius around the latitude and longitude coordinates (iOS,Android/integer/meters/optional)
	rid: z.string().optional(), // region ID, created automatically, copied into the location payload inrids array (iOS/string)_
	uuid: z.string().optional(), // UUID of the BLE Beacon (iOS/string/optional)
});
