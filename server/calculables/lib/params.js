var params;

CF.CurrentData.calculatables.lib = CF.CurrentData.calculatables.lib || {};

var clone = function _clone(item) {
  return _.clone(item);
}

var scoreWeightsPerLinksCount = {
  baseBoolean: [
    [0, 0]
  ],
  base10: [
    [0, 0],
    [1, 0.2],
    [3, 0.4],
    [5, 0.6],
    [9, 0.8]
  ],
  neverMind: [
    [1000, 0]
  ],
  fiveSteps: [
    [0, 0],
    [1, 0.2],
    [2, 0.4],
    [3, 0.6],
    [4, 0.8]
  ],
  tenSteps: [
    [0, 0],
    [1, 0.1],
    [2, 0.2],
    [3, 0.3],
    [4, 0.4],
    [5, 0.5],
    [6, 0.6],
    [7, 0.7],
    [8, 0.8],
    [9, 0.9]
  ],
  max005: [
    [0, 0],
    [1, 0.01],
    [5, 0.025],
    [9, 0.04],
  ],
  max01: [
    [0, 0],
    [1, 0.02],
    [5, 0.05],
    [9, 0.08],
  ],
  max03: [
    [0, 0],
    [1, 0.06],
    [5, 0.15],
    [9, 0.24],
  ],
  max04: [
    [0, 0],
    [1, 0.08],
    [5, 0.2],
    [9, 0.32],
  ]
}
params = {
  weightsRATING: {
    'Project': {
      CS: 1,
      LV: 4,
      WL: 0,
      BR: 0,
      AM: 0
    },
    'Pre-Public': {
      CS: 1,
      LV: 2.5,
      WL: 0.5,
      BR: 0.5,
      AM: 0.5
    },
    'Private': {
      CS: 1,
      LV: 3,
      WL: 0,
      BR: 0.5,
      AM: 0.5
    },
    'Public': {
      CS: 1,
      LV: 2,
      WL: 1,
      BR: 0.5,
      AM: 0.5
    },
    'Dead': {},
    'live': {}
  },
  weightsCS: {
    'cryptocurrency': {
      'Public': {
        site: 0.05,
        community: 0.05,
        updates: 0.05,
        code: 0.05,
        science: 0.05,
        knowledge: 0.05,
        buy: 0.3,
        hold: 0.1,
        analyze: 0.1,
        earn: 0.1
      },
      'Pre-Public': {
        site: 0.15,
        community: 0.15,
        updates: 0.20,
        code: 0.20,
        science: 0.15,
        knowledge: 0.15
      },
      'Project': {
        site: 0.15,
        community: 0.15,
        updates: 0.20,
        code: 0.20,
        science: 0.15,
        knowledge: 0.15
      },
      'Running': {
        site: 0.15,
        community: 0.15,
        updates: 0.20,
        code: 0.20,
        science: 0.15,
        knowledge: 0.15
      }
    },
    'cryptoasset': {
      'Public': {
        site: 0.05,
        community: 0.05,
        updates: 0.10,
        code: 0.20,
        science: 0.05,
        knowledge: 0.05,
        buy: 0.4,
        hold: 0.05,
        analyze: 0.05,
        earn: 0
      },
      'Pre-Public': {
        site: 0.15,
        community: 0.15,
        updates: 0.20,
        code: 0.20,
        science: 0.15,
        knowledge: 0.15
      },
      'Project': {
        site: 0.15,
        community: 0.15,
        updates: 0.20,
        code: 0.20,
        science: 0.15,
        knowledge: 0.15
      },
      'Running': {
        site: 0.15,
        community: 0.15,
        updates: 0.20,
        code: 0.20,
        science: 0.15,
        knowledge: 0.15
      }
    }
  },

  linkWeightsCS: function(state, type) {
    var scores = scoreWeightsPerLinksCount;
    var ret = {
      site: clone(scores.baseBoolean),
      community: clone(scores.baseBoolean),
      updates: clone(scores.baseBoolean),
      code: clone(scores.baseBoolean),
      science: clone(scores.baseBoolean),
      knowledge: clone(scores.baseBoolean),
      buy: clone(scores.neverMind),
      hold: clone(scores.neverMind),
      analyze: clone(scores.neverMind),
      earn: clone(scores.baseBoolean),
    };

    if (state === "Public") {
      ret.buy = clone (scores.base10)
      ret.hold = clone (scores.base10)
      ret.analyze = clone (scores.base10)
      ret.earn = clone (scores.base10),
    }

    return ret;
  }
};

_.extend(CF.CurrentData.calculatables.lib, {
  params: params
});
