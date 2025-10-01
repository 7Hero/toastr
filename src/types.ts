export type ToastData = {
  id: number;
  message: string;
  dismiss: boolean;
};

export type ToastHeight = {
  id: number;
  height: number;
};

export type ToastProps = {
  dismissToast: Function;
  toast: ToastData;
  duration?: number;
  unmountDuration?: number;
  index: number;
  heights: ToastHeight[];
  expanded: boolean;
  setHeights: (setFunc: (heights: ToastHeight[]) => ToastHeight[]) => void;
  expandByDefault: boolean;
  gap?: number;
  yPosition: Y;
};

export type Y = "top" | "bottom";
export type X = "left" | "center" | "right";

export type Position = `${Y}-${X}`;

export type ToasterProps = {
  expand?: boolean;
  position?: Position;
};
