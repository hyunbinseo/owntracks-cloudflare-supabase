type Configuration = { _type: 'configuration' } & Partial<{
	monitoring: -1 | 0 | 1 | 2; // Location reporting mode (iOS,Android/integer)
	// -1 Quiet
	// 0 Manual
	// 1 Significant
	// 2 Move
	locatorInterval: number; // maximum interval between location source updates (iOS,Android/integer/seconds)
	// The desired interval for active location updates.
	// The location client will actively try to obtain location updates for your application at this interval,
	// so it has a direct influence on the amount of power used by your application. Choose your interval wisely.
	locatorDisplacement: number; // maximum distance between location source updates (iOS,Android/integer/meters)
	// The smallest displacement in meters the user must move between location updates.
	// Defaults to 0 and is an and relationship with interval.
	// Can be used to only receive updates when the device has moved.
	moveModeLocatorInterval: number;
	// How often should locations be requested from the device whilst in Move mode (seconds)
	// Android's move mode ignores `locatorDisplacement` and uses a separate `moveModeLocatorInterval` value.
	// However, the JSON API `_type=configuration` docs does not mention the `moveModeLocatorInterval` key.
	// Referenced the Android application's configuration management menu. (2.4.10)
}>;

const monitoringEnum = {
	quiet: -1,
	manual: 0,
	significant: 1,
	move: 2,
} as const;

// Move mode in iOS and Android are different.
// iOS: https://owntracks.org/booklet/features/location/#move-mode
// Android: https://owntracks.org/booklet/features/location/#move-mode_1

const generateConfiguration = ({ mode }: { mode: keyof typeof monitoringEnum }): Configuration => ({
	_type: 'configuration',
	monitoring: monitoringEnum[mode],
	locatorDisplacement: 1,
	locatorInterval: 60,
	moveModeLocatorInterval: 60,
});
