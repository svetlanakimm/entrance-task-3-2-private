import ratesSplit from './rates_split';
import consumedEnergy from './consumed_energy';

let equal = require('deep-equal');

const referenceConfig = {
  "devices": [
    {
      "id": "F972B82BA56A70CC579945773B6866FB",
      "name": "Посудомоечная машина",
      "power": 950,
      "duration": 3,
      "mode": "night"
    },
    {
      "id": "C515D887EDBBE669B2FDAC62F571E9E9",
      "name": "Духовка",
      "power": 2000,
      "duration": 2,
      "mode": "day"
    },
    {
      "id": "02DDD23A85DADDD71198305330CC386D",
      "name": "Холодильник",
      "power": 50,
      "duration": 24
    },
    {
      "id": "1E6276CC231716FE8EE8BC908486D41E",
      "name": "Термостат",
      "power": 50,
      "duration": 24
    },
    {
      "id": "7D9DC84AD110500D284B33C82FE6E85E",
      "name": "Кондиционер",
      "power": 850,
      "duration": 1
    }
  ],
  "rates": [
    {
      "from": 7,
      "to": 10,
      "value": 6.46
    },
    {
      "from": 10,
      "to": 17,
      "value": 5.38
    },
    {
      "from": 17,
      "to": 21,
      "value": 6.46
    },
    {
      "from": 21,
      "to": 23,
      "value": 5.38
    },
    {
      "from": 23,
      "to": 7,
      "value": 1.79
    }
  ],
  "maxPower": 2100
};
const referenceOutput = {
  "schedule": {
    "0": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E", "F972B82BA56A70CC579945773B6866FB"],
    "1": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E", "F972B82BA56A70CC579945773B6866FB"],
    "2": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E", "F972B82BA56A70CC579945773B6866FB"],
    "3": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "4": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "5": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "6": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "7": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "8": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "9": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "10": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E", "C515D887EDBBE669B2FDAC62F571E9E9"],
    "11": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E", "C515D887EDBBE669B2FDAC62F571E9E9"],
    "12": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "13": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "14": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "15": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "16": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "17": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "18": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "19": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "20": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "21": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "22": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E"],
    "23": ["02DDD23A85DADDD71198305330CC386D", "1E6276CC231716FE8EE8BC908486D41E", "7D9DC84AD110500D284B33C82FE6E85E"]
  },
  "consumedEnergy": {
    "value": 38.939,
    "devices": {
      "F972B82BA56A70CC579945773B6866FB": 5.1015,
      "C515D887EDBBE669B2FDAC62F571E9E9": 21.52,
      "02DDD23A85DADDD71198305330CC386D": 5.398,
      "1E6276CC231716FE8EE8BC908486D41E": 5.398,
      "7D9DC84AD110500D284B33C82FE6E85E": 1.5215
    }
  }
};


const tests = {
  'testAxiom': function () {
    return true;
  },
  'testRates1': function () {
    const rates = [
      {
        "from": 5,
        "to": 5,
        "value": 6.46
      }];
    const splitted = {
      0: 6.46,
      1: 6.46,
      2: 6.46,
      3: 6.46,
      4: 6.46,
      5: 6.46,
      6: 6.46,
      7: 6.46,
      8: 6.46,
      9: 6.46,
      10: 6.46,
      11: 6.46,
      12: 6.46,
      13: 6.46,
      14: 6.46,
      15: 6.46,
      16: 6.46,
      17: 6.46,
      18: 6.46,
      19: 6.46,
      20: 6.46,
      21: 6.46,
      22: 6.46,
      23: 6.46,
    };

    return equal(ratesSplit(rates), splitted);
  },
  'testRatesReference': function () {
    const rates = [
      {
        "from": 7,
        "to": 10,
        "value": 6.46
      },
      {
        "from": 10,
        "to": 17,
        "value": 5.38
      },
      {
        "from": 17,
        "to": 21,
        "value": 6.46
      },
      {
        "from": 21,
        "to": 23,
        "value": 5.38
      },
      {
        "from": 23,
        "to": 7,
        "value": 1.79
      }];

    const splitted = {
      0: 1.79,
      1: 1.79,
      2: 1.79,
      3: 1.79,
      4: 1.79,
      5: 1.79,
      6: 1.79,
      7: 6.46,
      8: 6.46,
      9: 6.46,
      10: 5.38,
      11: 5.38,
      12: 5.38,
      13: 5.38,
      14: 5.38,
      15: 5.38,
      16: 5.38,
      17: 6.46,
      18: 6.46,
      19: 6.46,
      20: 6.46,
      21: 5.38,
      22: 5.38,
      23: 1.79,
    };

    return equal(ratesSplit(rates), splitted);
  },
  'testConsumedEnergy': function () {
    const testConfig = {
      "devices": [
        {
          "id": "02DDD23A85DADDD71198305330CC386D",
          "name": "Холодильник",
          "power": 50,
          "duration": 24
        }
      ],
      "rates": [
        {
          "from": 0,
          "to": 24,
          "value": 4.5
        }
      ],
      "maxPower": 2100
    };

    const testSchedule = {
      "0": ["02DDD23A85DADDD71198305330CC386D"],
      "1": ["02DDD23A85DADDD71198305330CC386D"],
      "2": ["02DDD23A85DADDD71198305330CC386D"],
      "3": ["02DDD23A85DADDD71198305330CC386D"],
      "4": ["02DDD23A85DADDD71198305330CC386D"],
      "5": ["02DDD23A85DADDD71198305330CC386D"],
      "6": ["02DDD23A85DADDD71198305330CC386D"],
      "7": ["02DDD23A85DADDD71198305330CC386D"],
      "8": ["02DDD23A85DADDD71198305330CC386D"],
      "9": ["02DDD23A85DADDD71198305330CC386D"],
      "10": ["02DDD23A85DADDD71198305330CC386D"],
      "11": ["02DDD23A85DADDD71198305330CC386D"],
      "12": ["02DDD23A85DADDD71198305330CC386D"],
      "13": ["02DDD23A85DADDD71198305330CC386D"],
      "14": ["02DDD23A85DADDD71198305330CC386D"],
      "15": ["02DDD23A85DADDD71198305330CC386D"],
      "16": ["02DDD23A85DADDD71198305330CC386D"],
      "17": ["02DDD23A85DADDD71198305330CC386D"],
      "18": ["02DDD23A85DADDD71198305330CC386D"],
      "19": ["02DDD23A85DADDD71198305330CC386D"],
      "20": ["02DDD23A85DADDD71198305330CC386D"],
      "21": ["02DDD23A85DADDD71198305330CC386D"],
      "22": ["02DDD23A85DADDD71198305330CC386D"],
      "23": ["02DDD23A85DADDD71198305330CC386D"]
    };

    const testConsumedEnergy = {
      "value": 50 * 24 * 4.5 / 1000,
      "devices": {
        "02DDD23A85DADDD71198305330CC386D": 50 * 24 * 4.5 / 1000
      }
    };

    return equal(consumedEnergy(testConfig, testSchedule), testConsumedEnergy);
  },
  'testConsumedEnergy2': function () {
    const testConfig = {
      "devices": [
        {
          "id": "02DDD23A85DADDD71198305330CC386D",
          "name": "Холодильник",
          "power": 50,
          "duration": 24
        },
        {
          "id": "7D9DC84AD110500D284B33C82FE6E85E",
          "name": "Кондиционер",
          "power": 850,
          "duration": 1
        }
      ],
      "rates": [
        {
          "from": 0,
          "to": 24,
          "value": 4.5
        }
      ],
      "maxPower": 2100
    };

    const testSchedule = {
      "0": ["02DDD23A85DADDD71198305330CC386D", "7D9DC84AD110500D284B33C82FE6E85E"],
      "1": ["02DDD23A85DADDD71198305330CC386D"],
      "2": ["02DDD23A85DADDD71198305330CC386D"],
      "3": ["02DDD23A85DADDD71198305330CC386D"],
      "4": ["02DDD23A85DADDD71198305330CC386D"],
      "5": ["02DDD23A85DADDD71198305330CC386D"],
      "6": ["02DDD23A85DADDD71198305330CC386D"],
      "7": ["02DDD23A85DADDD71198305330CC386D"],
      "8": ["02DDD23A85DADDD71198305330CC386D"],
      "9": ["02DDD23A85DADDD71198305330CC386D"],
      "10": ["02DDD23A85DADDD71198305330CC386D"],
      "11": ["02DDD23A85DADDD71198305330CC386D"],
      "12": ["02DDD23A85DADDD71198305330CC386D"],
      "13": ["02DDD23A85DADDD71198305330CC386D"],
      "14": ["02DDD23A85DADDD71198305330CC386D"],
      "15": ["02DDD23A85DADDD71198305330CC386D"],
      "16": ["02DDD23A85DADDD71198305330CC386D"],
      "17": ["02DDD23A85DADDD71198305330CC386D"],
      "18": ["02DDD23A85DADDD71198305330CC386D"],
      "19": ["02DDD23A85DADDD71198305330CC386D"],
      "20": ["02DDD23A85DADDD71198305330CC386D"],
      "21": ["02DDD23A85DADDD71198305330CC386D"],
      "22": ["02DDD23A85DADDD71198305330CC386D"],
      "23": ["02DDD23A85DADDD71198305330CC386D"]
    };

    const testConsumedEnergy = {
      "value": (50 * 24 * 4.5 + 850 * 4.5) / 1000,
      "devices": {
        "02DDD23A85DADDD71198305330CC386D": 50 * 24 * 4.5 / 1000,
        "7D9DC84AD110500D284B33C82FE6E85E": 850 * 4.5 / 1000
      }
    };

    return equal(consumedEnergy(testConfig, testSchedule), testConsumedEnergy);
  },
  'testConsumedEnergyReference': function () {
    return equal(consumedEnergy(referenceConfig, referenceOutput['schedule']),
                 referenceOutput['consumedEnergy']);
  }
};

export default function runTests() {
  let i = 0;
  for (let testname in tests) {
    if (tests.hasOwnProperty(testname)) {
      console.log(`Test ${i}: ${testname}...`);
      const result = tests[testname]();
      console.log(`${result ? 'OK' : ' == FAILED == '}`);
      i++;
    }
  }

  return false;
}
