import { Map } from "./_map";
import type { LatLngExpression } from "leaflet";

export default () => {
  const position: LatLngExpression = [35.3943477, 139.4453645];
  return (
    <>
      <Map currentPosition={position} />
    </>
  );
};
