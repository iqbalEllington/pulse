import Link from 'next/link';
import { forwardRef } from 'react'

const CustomToggle = forwardRef(({ children, variant, onClick }, ref) => (
  (<Link
    href="/"
    ref={ref}
    className={variant}
    style={{ color: 'unset' }}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}>

    {children}

  </Link>)
));
export default CustomToggle;