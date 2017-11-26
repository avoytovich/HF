export const isNot = {
  "not":[
    {
      "match":[
        {
          "key":"q_lowerback_pain_level",
          "op":">",
          "value":"7"
        }
      ]
    },{
    "match":
      [
        {
          "key":"q_neck_pain_level",
          "op":">",
          "value":"7"
        }
      ]
    },{
    "match":
      [
        {
          "key":"q_shoulder_pain_level",
          "op":">",
          "value":"7"
        }
      ]
  },{
    "match":
      [
        {
          "key":"q_leg_pain_level",
          "op":">",
          "value":"7"
        }
      ]
  },{
    "match":
      [
        {
          "key":"q_arm_pain_level",
          "op":">",
          "value":"7"
        }
      ]
  },{
    "match":
      [
        {
          "key":"q_elbow_pain_level",
          "op":">","value":"7"
        }
      ]
  },{
    "match":
      [
        {
          "key":"q_knee_pain_level",
          "op":">",
          "value":"7"
        }
      ]
    }
  ]
};

export const andV1 = {
  "and":
    [
      {
        "match": [
          {
            "key":"q_pain_loc",
            "op":"==",
            "value":["A","G"]
          }
        ]
      },
      {
        "or":[
          {
            "match":[
              {
                "key":"q_neck_pain_type",
                "op":"==",
                "value":["C","E"]
              }
            ]
          },
          {
            "match":[
              {
                "key":"q_arm_pain_type",
                "op":"==","value":["C","E"]
              }
            ]
          }
        ]
      },
      {
        "not":[
          {
            "match": [
              {
                "key":"q_lowerback_redflag",
                "op":"==",
                "value":["A"]
              }
            ]
          },
          {
            "match":[
              {
                "key":"q_neck_redflag",
                "op":"==",
                "value":["A"]
              }
            ]
          }
        ]
      }
    ]
};


export const mixid = {
  "and":
    [
      {
        "or":
          [
            {
              "and":
                [
                  {
                    "match":
                      [
                        {
                          "key":"q_pain_loc",
                          "op":"==",
                          "value":["G"]
                        }
                      ]
                  },
                  {
                    "match":
                      [
                        {
                          "key":"q_arm_elbow",
                          "op":"==",
                          "value":["A"]
                        }
                      ]
                  }
                ]
            },
            {
              "and":
                [
                  {
                    "match":
                      [
                        {
                          "key":"q_pain_loc",
                          "op":"==",
                          "value":["E"]
                        }
                      ]
                  },
                  {
                    "not":
                      [
                        {
                          "match":
                            [
                              {
                                "key":"q_pain_loc",
                                "op":"==",
                                "value":["G"]
                              }
                            ]
                        }
                      ]
                  }
                ]
            }
          ]
      },
//      {
//        "not":
//          [
//            {
//              "match":
//                [
//                  {
//                    "key":"q_lowerback_redflag",
//                    "op" : "==",
//                    "value": ["A"]
//                  }
//                ]
//            },
//            {
//              "match":
//                [
//                  {
//                    "key":"q_neck_redflag",
//                    "op":"==",
//                    "value":["A"]
//                  }
//                ]
//            }
//          ]
//      }
    ]
};