## [3.0.0](https://github.com/disenchant/hassio-trash-card/compare/2.4.8...3.0.0) (2026-03-30)

### BREAKING CHANGES

* Rebranded the entire Home Assistant card from `TrashCard` to `Calendar Event Tracker` (and `custom:trash-card` to `custom:calendar-event-tracker`). The JavaScript file is now `calendar-event-tracker.js`. All configuration keys and internal logic have been updated to reflect the new generic event tracking purpose.

### Features

* Complete card rebranding to support generic calendar events instead of just trash collection.
* Default fallback icon changed to a calendar icon.
* Updated configuration to `calendar-event-tracker`.

## [2.4.8](https://github.com/disenchant/hassio-calendar-event-tracker/compare/2.4.7...2.4.8) (2026-03-30)

### Features

* Add support for HEX color values in patterns
* Add max_items feature for patterns

### Bug Fixes

* Only show events that match a pattern (prevents non-trash events from appearing)

## [1.2.2](https://github.com/idaho/hassio-calendar-event-tracker/compare/1.2.1...1.2.2) (2023-12-15)


### Bug Fixes

* adjust link of help icon in editor card ([#111](https://github.com/idaho/hassio-calendar-event-tracker/issues/111)) ([2765e49](https://github.com/idaho/hassio-calendar-event-tracker/commit/2765e49a1db4788f4c044ad5620c64d40e1bc12f))
* invalid date in cases its not a full day event ([#109](https://github.com/idaho/hassio-calendar-event-tracker/issues/109)) ([7f831c8](https://github.com/idaho/hassio-calendar-event-tracker/commit/7f831c8f52c7851cc4dbaee2670a1995b0c8943b))

## [1.2.1](https://github.com/idaho/hassio-calendar-event-tracker/compare/1.2.0...1.2.1) (2023-12-13)


### Bug Fixes

* editor labels ([#108](https://github.com/idaho/hassio-calendar-event-tracker/issues/108)) ([3a0b57f](https://github.com/idaho/hassio-calendar-event-tracker/commit/3a0b57fc772f6207980c198a925480299278662c))

# [1.2.0](https://github.com/idaho/hassio-calendar-event-tracker/compare/1.1.0...1.2.0) (2023-12-13)


### Bug Fixes

* actions install job ([#90](https://github.com/idaho/hassio-calendar-event-tracker/issues/90)) ([c2d7360](https://github.com/idaho/hassio-calendar-event-tracker/commit/c2d736090c98d6205a4b95c1c0dea6b5e03d4fad))
* add full_size option to readme and visual editor ([#107](https://github.com/idaho/hassio-calendar-event-tracker/issues/107)) ([2e5e0b4](https://github.com/idaho/hassio-calendar-event-tracker/commit/2e5e0b43159fffa922488bd252f5e0f91943492a))
* bump lovelace-mushroom from v3.0.5 to v3.1.0 ([#36](https://github.com/idaho/hassio-calendar-event-tracker/issues/36)) ([bc94643](https://github.com/idaho/hassio-calendar-event-tracker/commit/bc9464385b746b9cf70f24687c0fd5729eedccd0))


### Features

* add config for date range ([#106](https://github.com/idaho/hassio-calendar-event-tracker/issues/106)) ([3f9a970](https://github.com/idaho/hassio-calendar-event-tracker/commit/3f9a970052351ed7c78541a14f262cfff4a5e17d))
* add french translations ([#105](https://github.com/idaho/hassio-calendar-event-tracker/issues/105)) ([8786a2d](https://github.com/idaho/hassio-calendar-event-tracker/commit/8786a2d1ed817e6e7532994073a840302e690266))

# [1.1.0](https://github.com/idaho/hassio-calendar-event-tracker/compare/1.0.1...1.1.0) (2023-12-04)


### Features

* add configuration value to set full size card ([#88](https://github.com/idaho/hassio-calendar-event-tracker/issues/88)) ([35fd092](https://github.com/idaho/hassio-calendar-event-tracker/commit/35fd092373dc90c97020e41a16b7001d371c1f5b))
* add language slovak ([1755fd4](https://github.com/idaho/hassio-calendar-event-tracker/commit/1755fd4396e0b1f5213de76ccb2984e5e69864b6))

## [1.0.1](https://github.com/idaho/hassio-calendar-event-tracker/compare/1.0.0...1.0.1) (2023-08-25)


### Bug Fixes

* bump home-assistant-js-websocket from 8.1.0 to 8.2.0 ([#13](https://github.com/idaho/hassio-calendar-event-tracker/issues/13)) ([bcc6876](https://github.com/idaho/hassio-calendar-event-tracker/commit/bcc6876f4b0810eb897598f1a4694f2a1e444378))
* bump lit from 2.7.6 to 2.8.0 ([#9](https://github.com/idaho/hassio-calendar-event-tracker/issues/9)) ([6dc266a](https://github.com/idaho/hassio-calendar-event-tracker/commit/6dc266a1a3841c5a723ea80ca4d4bc624234d531))
* bump superstruct from 0.15.2 to 1.0.3 ([#11](https://github.com/idaho/hassio-calendar-event-tracker/issues/11)) ([c56d8ce](https://github.com/idaho/hassio-calendar-event-tracker/commit/c56d8ce27c139e93497b5ee6ef70c9d8b9161d16))
* normalise name over the whole project ([#4](https://github.com/idaho/hassio-calendar-event-tracker/issues/4)) ([a716170](https://github.com/idaho/hassio-calendar-event-tracker/commit/a7161701179128eb678f481f5ab6531c373354a2))
* update README with installation via HACS ([#23](https://github.com/idaho/hassio-calendar-event-tracker/issues/23)) ([fae1974](https://github.com/idaho/hassio-calendar-event-tracker/commit/fae197472402cbec268ce3a2b9f7ccad454057f4))

# 1.0.0 (2023-08-16)


### Features

* initial commit of working calendar-event-tracker ([#1](https://github.com/idaho/hassio-calendar-event-tracker/issues/1)) ([4d6f83e](https://github.com/idaho/hassio-calendar-event-tracker/commit/4d6f83e072823a43363671f32f392ec99787786c))
