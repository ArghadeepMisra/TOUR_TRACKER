// src/components/Button.tsx
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styles from './Button.module.css';

interface BaseButtonProps {
  // children: React.ReactNode; // <-- REMOVE THIS LINE
  variant?: 'primary' | 'secondary';
  className?: string; // Allow passing extra classes
}

// This interface now extends BaseButtonProps (without children)
// and ButtonHTMLAttributes (which includes children implicitly)
interface ButtonAsButtonProps extends BaseButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button';
  href?: never; // Ensure href is not used with button
}

// LinkProps already includes children, so extending BaseButtonProps (without children) is fine
interface ButtonAsLinkProps extends BaseButtonProps, LinkProps { // Inherit LinkProps for 'to', 'state' etc.
  as: 'link';
  href?: never; // Ensure href is not used with link (use 'to')
}

// AnchorHTMLAttributes also includes children implicitly
interface ButtonAsExternalLinkProps extends BaseButtonProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
    as: 'a';
    to?: never; // Ensure 'to' is not used with 'a'
}


type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps | ButtonAsExternalLinkProps;

// The 'children' prop here is still valid because it comes from the
// specific type used (ButtonHTMLAttributes, LinkProps, AnchorHTMLAttributes)
const Button: React.FC<ButtonProps> = ({
  children, // This is okay!
  variant = 'primary',
  className = '',
  as = 'button', // Default to button
  ...props
}) => {
  const buttonStyles = `${styles.button} ${styles[variant]} ${className}`;

  if (as === 'link') {
    // Type assertion needed because props could be LinkProps or others
    const { to, ...rest } = props as ButtonAsLinkProps;
    return (
      <Link to={to} className={buttonStyles} {...rest}>
        {children}
      </Link>
    );
  }

  if (as === 'a') {
    const { href, target = "_blank", rel = "noopener noreferrer", ...rest } = props as ButtonAsExternalLinkProps;
    return (
      <a href={href} target={target} rel={rel} className={buttonStyles} {...rest}>
        {children}
      </a>
    );
  }

  // Default: render as button
  return (
    <button className={buttonStyles} {...props as ButtonAsButtonProps}>
      {children}
    </button>
  );
};

export default Button;