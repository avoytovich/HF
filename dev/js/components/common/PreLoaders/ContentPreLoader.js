import React from 'react';

const DEFAULT_MATRIX = [
  [ 50 ],
  [ 50 ],
  [ 50, 50 ],
  [ [100, 90] ],
  [ 20, 20 ],
  [ 100 ],
  [ 20, 20, 30 ],
  [ 35,],
  [ 100 ],
  [ 100 ],
  [ 100 ],
];

export default ({matrix}) => {
  const multiItem = (arr, value, index) => {
    const marginRight = arr.length - 1 !== index ? '15px' : 0;

    if (Array.isArray(value)) {
      const [ width, height ] = value;
      return {
        //
        width: `${width}%`,
        height: `${height}px`,
        marginRight,
      }
    }
    else {
      return {
        width: `${value}%`,
        marginRight
      };
    }
  };

  return <div className="content_pre_loader">
      <div className="animated-background">

        <div className="fail-background"></div>

        {matrix.map((row, i) =>
          (<div className="markers-row" key={i}>

            {row.map((item, index, arr) =>{
              return <div key={index}
                          style={{...multiItem(arr, item, index)}}
                          className="background-masker"></div>
            })}

          </div>)
        )}

      </div>
  </div>
};