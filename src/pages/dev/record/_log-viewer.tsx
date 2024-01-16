import type { FC } from "react";

import type { AccelData, GPSData } from "./__index";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Props = {
  className?: string;
  accelData?: AccelData;
  gpsData?: GPSData;
};

export const LogViewer: FC<Props> = ({ className, accelData, gpsData }) => {
  const timestamp = accelData?.timestamp ?? "undefined";
  const x = accelData?.x ?? "undefined";
  const y = accelData?.y ?? "undefined";
  const z = accelData?.z ?? "undefined";
  const latitude = gpsData?.latitude ?? "undefined";
  const longitude = gpsData?.longitude ?? "undefined";

  return (
    <ScrollArea
      className={
        className + " w-full p-2 whitespace-nowrap shadow-md rounded-lg border"
      }
    >
      <h2 className="ml-2 text font-bold">現在の加速度とGPS</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-48 text-right">
              タイムスタンプ
            </TableHead>
            <TableHead className="min-w-48 text-right">加速度 X</TableHead>
            <TableHead className="min-w-48 text-right">加速度 Y</TableHead>
            <TableHead className="min-w-48 text-right">加速度 Z</TableHead>
            <TableHead className="min-w-48 text-right">GPS latitude</TableHead>
            <TableHead className="min-w-48 text-right">GSP longitude</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="min-w-48 text-right">{timestamp}</TableCell>
            <TableCell className="min-w-48 text-right">{x}</TableCell>
            <TableCell className="min-w-48 text-right">{y}</TableCell>
            <TableCell className="min-w-48 text-right">{z}</TableCell>
            <TableCell className="min-w-48 text-right">{latitude}</TableCell>
            <TableCell className="min-w-48 text-right">{longitude}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
