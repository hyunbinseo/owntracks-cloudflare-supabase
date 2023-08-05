import { z } from 'zod';

export const Transition = z.object({
	_type: z.literal('transition'),

	// Required
	acc: z.number(), // Accuracy of the geographical coordinates (iOS,Android/float/meters/required)
	event: z.enum(['enter', 'leave']), // Event that triggered the transition (iOS,Android/string/required)
	tst: z.number().int(), // Timestamp at which the event occured (iOS,Android/integer/epoch/required)
	wtst: z.number().int(), // Timestamp of waypoint creation (iOS,Android/integer/epoch/required)

	// Optional
	desc: z.string().optional(), // Name of the waypoint (iOS,Android/string/optional)
	lat: z.number().optional(), // Latitude at which the event occured (iOS,Android/float/meters/optional)
	lon: z.number().optional(), // Longitue at which the event occured (iOS,Android/float/meters/optional)
	rid: z.string().optional(), // Region ID (iOS/Android, after January 2021)
	t: z.enum(['c', 'b', 'l']).optional(), // Trigger of the event (iOS,Android/string/optional)
	tid: z.string().optional(), // Tracker ID of the waypoint (iOS/string/none/optional) || TrackerID required in http mode.
});
