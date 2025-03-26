export type CallToAction = {
  key: string;
  label: string;
  onClick: () => void;
};

export type PrimaryCallToAction = CallToAction;

export type SecondaryCallToAction = CallToAction[];

export type NavigationContext = {
  ctaButton: CallToAction | null;
  setCtaButton: (button: CallToAction | null) => void;
};
