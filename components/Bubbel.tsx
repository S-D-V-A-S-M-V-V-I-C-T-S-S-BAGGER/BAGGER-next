"use client";

import { CSSProperties, FC, PropsWithChildren } from "react";

interface BubbelProps {
  style?: CSSProperties;
  className?: string;
}

const Bubbel: FC<PropsWithChildren<BubbelProps>> = ({
  children,
  style,
  className,
}) => {
  const combinedClassName = className
    ? [className, "bubbel"].join(" ")
    : "bubbel";
  return (
    <div className={combinedClassName} style={style}>
      {children}
    </div>
  );
};

export default Bubbel;
