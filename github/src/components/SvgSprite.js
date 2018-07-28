import React from 'react';

require('@/assets/rsuite.svg')

function SvgSprite({ id, size = 40, ...props }) {

  return (
    <svg
      width={size}
      height={size}
      {...props}
    >
      <use xlinkHref={`#icon-${id}`} />
    </svg>
  );
}

export default SvgSprite;
