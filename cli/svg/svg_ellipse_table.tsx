import React from 'react';

export const ELLIPS_DIMS = { cx: 395, cy: 300, rx: 250, ry: 150 };

export default function SvgEllipseTable(props) {
  return (<><ellipse {...ELLIPS_DIMS} fill="linen" stroke="lavender" strokeWidth="3" />
  </>
  );
}
