import {
  ControllerFirmwareUpdateResult,
  FirmwareUpdateResult,
  SetValueResult,
  SetValueStatus,
} from "zwave-js";

export type SetValueResultType =
  | { result: SetValueResult } // schemaVersion >= 29
  | { success: boolean }; // schemaVersion < 29

export function setValueOutgoingMessage(
  result: SetValueResult,
  schemaVersion: number,
): SetValueResultType {
  if (schemaVersion < 29) {
    return {
      success: [
        SetValueStatus.Working,
        SetValueStatus.Success,
        SetValueStatus.SuccessUnsupervised,
      ].includes(result.status),
    };
  }
  return { result };
}

export type FirmwareUpdateResultType =
  | { result: ControllerFirmwareUpdateResult | FirmwareUpdateResult } // schemaVersion >= 29
  | { success: boolean }; // schemaVersion < 29

export function firmwareUpdateOutgoingMessage<
  T extends ControllerFirmwareUpdateResult | FirmwareUpdateResult,
>(result: T, schemaVersion: number): { result: T } | { success: boolean } {
  if (schemaVersion < 29) {
    return {
      success: result.success,
    };
  }
  return { result };
}
