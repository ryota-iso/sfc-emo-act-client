import type { FC } from "react";
import type { LatLngExpression } from "leaflet";

type Props = {
  location?: LatLngExpression;
  setLocation?: (location: LatLngExpression) => void;
};

export const AccelerationLogger: FC = () => {
  console.log("AccelerationLogger");
  return undefined;
};
