import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ToastState, toast } from "./state";
import { ToasterProps, ToastHeight, ToastProps, X, Y } from "./types";
import "./styles.css";

const GAP = 12;

const Toast = ({
  dismissToast,
  toast,
  index: idx,
  setHeights,
  heights,
  expanded,
  expandByDefault,
  duration = 3000,
  unmountDuration = 500,
  gap = GAP,
  yPosition,
}: ToastProps) => {
  let timeoutId = useRef<number>(0).current;
  const toastRef = useRef<HTMLLIElement>(null);

  const [removed, setRemoved] = useState(false);
  const [mounted, setMounted] = useState(false);

  const invert = useMemo(() => (yPosition === "top" ? 1 : -1), [yPosition]);
  const index = useMemo(
    () => (heights.length ? heights.findIndex((h) => h.id === toast.id) : 0),
    [heights, toast.id]
  );
  const isVisible = useMemo(() => index < 4, [index]);
  const zIndex = useMemo(() => heights.length - idx, [idx, heights]);
  const lift = useMemo(
    () =>
      index === 0
        ? 0
        : heights[0].height - heights[index]?.height + gap * index,
    [heights]
  );
  const offset = useMemo(
    () =>
      index === 0
        ? 0
        : heights.reduce((prev, curr, idx) => {
            if (idx >= index) {
              return prev;
            }
            return prev + curr.height + gap;
          }, 0),
    [heights]
  );

  const removeToast = useCallback(() => {
    setRemoved(true);
    setHeights((h) => h.filter((height) => height.id !== toast.id));
    setTimeout(() => {
      dismissToast(toast.id);
    }, unmountDuration);
  }, [heights, toast.id]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    timeoutId = setTimeout(() => {
      removeToast();
    }, duration);

    return () => clearTimeout(timeoutId);
  }, []);

  useLayoutEffect(() => {
    const toastNode = toastRef.current;
    if (toastNode) {
      const height = toastNode.getBoundingClientRect().height;
      setHeights((h) => [{ id: toast.id, height }, ...h]);
    }

    return () =>
      setHeights((h) => h.filter((height) => height.id !== toast.id));
  }, [toastRef.current]);

  return (
    <li
      ref={toastRef}
      className="toast"
      style={
        {
          "--gap": `${gap}px`,
          "--z-index": zIndex,
          "--index": index,
          "--offset": `${offset}px`,
          "--lift": `${lift}px`,
          "--invert": invert,
        } as React.CSSProperties
      }
      data-y-position={yPosition}
      data-removed={removed}
      data-mounted={mounted}
      data-expanded={expandByDefault || expanded}
      onClick={removeToast}
      data-visible={isVisible}
    >
      {toast.message}
    </li>
  );
};

const Toaster = ({
  expand = false,
  position = "bottom-right",
}: ToasterProps) => {
  const [toasts, setToasts] = useState<any[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [heights, setHeights] = useState<ToastHeight[]>([]);

  const [y, x] = position.split("-") as [Y, X];

  const dismissToast = useCallback(
    (id: number) => {
      ToastState.dismiss(id);
    },
    [toasts]
  );

  useEffect(() => {
    ToastState.subscribe((data: any) => {
      if (data.dismiss) {
        setToasts((toasts) => toasts.filter((toast) => toast.id !== data.id));
        return;
      }

      setToasts((toasts) => {
        return [data, ...toasts];
      });
    });
  }, []);
  return (
    <ul
      className="toastr"
      data-x-position={x}
      data-y-position={y}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {toasts.map((toast, index) => (
        <Toast
          yPosition={y}
          expanded={expanded}
          expandByDefault={expand}
          heights={heights}
          setHeights={setHeights}
          key={toast.id}
          toast={toast}
          dismissToast={dismissToast}
          index={index}
        />
      ))}
    </ul>
  );
};

export { Toaster, toast };
