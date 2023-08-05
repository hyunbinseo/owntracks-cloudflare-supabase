import { z } from 'zod';

export const Location = z.object({
	_type: z.literal('location'),

	// Required
	bs: z.number().int().gte(0).lte(3), // Battery Status 0=unknown, 1=unplugged, 2=charging, 3=full (iOS, Android)
	created_at: z.number().int(), // identifies the time at which the message is constructed (vs. tst which is the timestamp of the GPS fix) (iOS,Android)
	lat: z.number(), // latitude (iOS,Android/float/degree/required)
	lon: z.number(), // longitude (iOS,Android/float/degree/required)
	topic: z.string(), // (only in HTTP payloads) contains the original publish topic (e.g. owntracks/jane/phone). (iOS,Android >= 2.4,string)
	tst: z.number().int(), // UNIX epoch timestamp in seconds of the location fix (iOS,Android/integer/epoch/required)

	// Optional
	acc: z.number().int().optional(), // Accuracy of the reported location in meters without unit (iOS,Android/integer/meters/optional)
	alt: z.number().int().optional(), // Altitude measured above sea level (iOS,Android/integer/meters/optional)
	batt: z.number().int().optional(), // Device battery level (iOS,Android/integer/percent/optional)
	BSSID: z.string().optional(), // if available, identifies the access point. (iOS,string/optional)
	cog: z.number().int().optional(), // Course over ground (iOS/integer/degree/optional)
	conn: z.enum(['w', 'o', 'm']).optional(), // Internet connectivity status (route to host) when the message is created (iOS,Android/string/optional/extended data)
	inregions: z.string().array().optional(), // contains a list of regions the device is currently in (e.g. ["Home","Garage"]). Might be empty. (iOS,Android/list of strings/optional)
	inrids: z.string().array().optional(), // contains a list of region IDs the device is currently in (e.g. ["6da9cf","3defa7"]). Might be empty. (iOS,Android/list of strings/optional)
	m: z.number().int().gte(1).lte(2).optional(), // identifies the monitoring mode at which the message is constructed (significant=1, move=2) (iOS/integer/optional)
	p: z.number().optional(), // barometric pressure (iOS/float/kPa/optional/extended data)
	poi: z.string().optional(), // point of interest name (iOS/string/optional)
	rad: z.number().int().optional(), // radius around the region when entering/leaving (iOS/integer/meters/optional)
	SSID: z.string().optional(), // if available, is the unique name of the WLAN. (iOS,string/optional)
	t: z.enum(['p', 'c', 'b', 'r', 'u', 't', 'v']).optional(), // trigger for the location report (iOS,Android/string/optional)
	tag: z.string().optional(), // name of the tag (iOS/string/optional)
	tid: z.string().optional(), // Tracker ID used to display the initials of a user (iOS,Android/string/optional) required for http mode
	vac: z.number().int().optional(), // vertical accuracy of the alt element (iOS/integer/meters/optional)
	vel: z.number().int().optional(), // velocity (iOS,Android/integer/kmh/optional)
});
