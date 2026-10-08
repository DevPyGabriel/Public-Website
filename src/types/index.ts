export interface AnimationConfig {
  duration: number;
  ease?: string;
  delay?: number;
}

export interface ScrollTriggerConfig {
  trigger: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean;
  pin?: boolean;
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export type GSAPTarget = string | Element | Element[] | gsap.TweenTarget;