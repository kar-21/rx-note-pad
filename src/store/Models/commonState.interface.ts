export interface CommonStateType {
  selectedNoteId: string;
  spinnerState: SpinnerState;
  alertState: AlertState;
}

export interface SpinnerState {
  showSpinner: boolean;
  message: string;
}

export interface AlertState {
  showAlert: boolean;
  message: string;
  level: AlertLevel;
}

export enum AlertLevel {
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
}

export interface SetAlertPayload {
  message: string;
  level: AlertLevel;
}
