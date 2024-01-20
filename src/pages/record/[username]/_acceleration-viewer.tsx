import type { FC } from "react";

type Props = {
  className?: string;
  acceleration: DeviceMotionEventAcceleration | undefined;
};

export const AccelerationViewer: FC<Props> = ({ className, acceleration }) => {
  return (
    <div
      className={`w-56 max-w-[80%] py-2 px-3 backdrop-blur-sm border border-gray-100 rounded ${className}`}
    >
      <p>x: {acceleration?.x}</p>
      <p>y: {acceleration?.y}</p>
      <p>z: {acceleration?.z}</p>
    </div>
  );
};
