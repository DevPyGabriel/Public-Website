import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number | string;
  width?: number | string;
  heigth?: number | string;
}

export const EllipseVector = ({
  color = "currentColor",
  size = 24,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M139 39C139 60.5391 121.539 78 100 78C78.4609 78 61 60.5391 61 39C61 17.4609 78.4609 0 100 0C121.539 0 139 17.4609 139 39Z"
      fill={color}
    />
    <path
      d="M139 161C139 182.539 121.539 200 100 200C78.4609 200 61 182.539 61 161C61 139.461 78.4609 122 100 122C121.539 122 139 139.461 139 161Z"
      fill={color}
    />
    <path
      d="M161 139C139.461 139 122 121.539 122 100C122 78.4609 139.461 61 161 61C182.539 61 200 78.4609 200 100C200 121.539 182.539 139 161 139Z"
      fill={color}
    />
    <path
      d="M39 139C17.4609 139 -9.41504e-07 121.539 0 100C9.41504e-07 78.4609 17.4609 61 39 61C60.5391 61 78 78.4609 78 100C78 121.539 60.5391 139 39 139Z"
      fill={color}
    />
  </svg>
);

export const Star = ({
  color = "currentColor",
  size = 24,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24 0V0C24.0094 13.2509 34.7491 23.9906 48 24V24V24C34.7491 24.0094 24.0094 34.7491 24 48V48V48C23.9906 34.7491 13.2509 24.0094 0 24V24V24C13.2509 23.9906 23.9906 13.2509 24 0V0Z"
      fill={color}
    />
  </svg>
);

export const Moon = ({
  color = "currentColor",
  size = 24,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M27 199.999C9.66626 172.698 3.8147e-06 137.062 0 99.9993C0 62.9366 9.66625 27.3006 27 0V199.999Z"
      fill={color}
    />
    <path
      d="M200 200C173.478 200 148.043 189.464 129.289 170.711C110.536 151.957 100 126.522 100 100C100 73.4784 110.536 48.043 129.289 29.2893C148.043 10.5357 173.478 9.5351e-06 200 4.37114e-06L200 200Z"
      fill="white"
    />
    <path
      d="M60.2893 175.485C70.5101 186.396 82.7156 194.701 96 200V0C82.7156 5.2988 70.5101 13.6039 60.2893 24.5148C41.5357 44.5347 31 71.6875 31 99.9998C31 128.312 41.5357 155.465 60.2893 175.485Z"
      fill={color}
    />
  </svg>
);

export const BrandLogo = ({
  color = "currentColor",
  size = 24,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M40 26.0273V40H29.6895V31.0498L13.6436 12.1465H10.3105V40H0V0H17.9072L40 26.0273Z"
      fill={color}
    />
    <rect x="30" width="10" height="10" fill={color} />
  </svg>
);
