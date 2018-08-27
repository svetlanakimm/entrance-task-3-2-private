import ratesSplit from './rates_split';

const kwatt = 1000.;

export default function consumedEnergy(config, sch) {
  const HOURS = 24;
  let power = {};
  let devices = {};
  let rates = {};
  let value = 0.0;

  rates = ratesSplit(config.rates);

  // init devices, create power index
  for (let i = 0; i < config.devices.length; i++) {
    let currentDevice = config.devices[i];
    power[currentDevice.id] = currentDevice.power;
    devices[currentDevice.id] = 0.0;
  }

  // account consumed energy
  for (let i = 0; i < HOURS; i++) {
    for (let j = 0; j < sch[i].length; j++) {
      let currentId = sch[i][j];
      const currentValue = power[currentId] * rates[i];
      devices[currentId] += currentValue;
      value += currentValue;
    }
  }

  value /= kwatt;
  for (let deviceId in devices) {
    if (devices.hasOwnProperty(deviceId)) {
      devices[deviceId] /= kwatt;
    }
  }

  return {
    value: value,
    devices: devices
  };
}
