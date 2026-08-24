import { useState } from 'react';

export function Hoverable({ as: Tag = 'div', style, hoverStyle, activeStyle, onClick, children, ...rest }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const merged = { ...style, ...(hover && hoverStyle ? hoverStyle : null), ...(active && activeStyle ? activeStyle : null) };
  return (
    <Tag
      style={merged}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
