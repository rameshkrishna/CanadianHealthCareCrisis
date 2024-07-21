// components/TurnstileWidget.tsx
import React from "react";
import Turnstile, { useTurnstile } from "react-turnstile";

interface TurnstileWidgetProps {
  siteKey: string;
  onTokenVerify: (token: string) => void;
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  siteKey,
  onTokenVerify,
}) => {
  const turnstile = useTurnstile();

  return (
    <Turnstile
      sitekey={siteKey}
      onVerify={(token) => {
        onTokenVerify(token);
      }}
      fixedSize={true}
    />
  );
};

export default TurnstileWidget;
