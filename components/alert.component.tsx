import React, { FC } from "react";
import { Alert, AlertType } from "../types/Alert";

interface AlertComponentProps {
  alert?: Alert;
}

export const AlertComponent: FC<AlertComponentProps> = ({ alert }) => {
  if (!alert || !alert.message) {
    return null;
  }

  function getAlertClass(): string | null {
    switch (alert?.type) {
      case AlertType.Error:
        return "alert-error";
      case AlertType.Warning:
        return "alert-warning";
      case AlertType.Success:
        return "alert-success";
    }

    return null;
  }

  return <div className={`alert ${getAlertClass()}`}>{alert?.message}</div>;
};
