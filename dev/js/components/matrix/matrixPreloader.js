import React from 'react';
import { ContentPreLoader } from '../common';


const MATRIX_LIST = {
  '1' : [
    [ 50         ],
    [ 50         ],
    [ 50, 50     ],
    [ [100, 90]  ],
    [ 20, 20     ],
    [ 100        ],
    [ 20, 20, 30 ],
    [ 35         ],
    [ 100        ],
    [ 100        ],
    [ 100        ]
  ],

  '2': [
    [ [100, 72]  ],
    [ [100, 72]  ],
    [ [100, 159] ],
    [ [100, 72]  ],
    [ [100, 116] ]
  ],

  '3': [
    [ 50     ],
    [ 50, 50 ],
    [ 100    ],
  ],
  '4': [
    [ 50     ],
    [ 50, 50 ],
    [ 50     ],
    [ 100    ],
    [ 70     ]
  ],
  '5': [
    [ [50, 60 ]  ],
    [ 33, 33, 33 ],
    [ 100        ],
    [ [100, 60]  ],
    [ 33, 33, 33 ],
  ]
};


export default ({left, right}) => {
  const _left  =  MATRIX_LIST[left  || '1'];
  const _right =  MATRIX_LIST[right || '1'];

  return <div className="matrix_pre_loaders">

    <div className="item">
      <ContentPreLoader matrix={_left}/>
    </div>

    <div className="item">
      <ContentPreLoader matrix={_right}/>
    </div>
  </div>
};