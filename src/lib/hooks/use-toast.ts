import toast from "react-hot-toast";

type ToastVariant = "success" | "error";

interface ToastOptions {
  duration?: number;
  position?: "top-center" | "top-right" | "top-left" | "bottom-center" | "bottom-right" | "bottom-left";
  icon?: string;
  message: string;
}

const defaultOptions = {
  duration: 3000,
  position: "top-center" as const,
  icon: "🔔",
};

const toastStyles = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "center" as const,
  padding: "10px",
  margin: "10px",
  border: "1px solid #fff",
};

const variantIcons: Record<ToastVariant, string> = {
  success: "✅",
  error: "❌",
};

export const useToast = () => {
  const showToast = (variant: ToastVariant, options: ToastOptions) => {
    const toastOptions = {
      ...defaultOptions,
      ...options,
      icon: options.icon || variantIcons[variant],
      style: toastStyles,
      ariaProps: {
        role: "status" as const,
        "aria-live": "polite" as const,
      },
    };

    switch (variant) {
      case "success":
        toast.success(options.message, toastOptions);
        break;
      case "error":
        toast.error(options.message, toastOptions);
        break;
    }
  };

  return {
    success: (message: string, options?: Omit<ToastOptions, "message">) =>
      showToast("success", { ...options, message }),
    error: (message: string, options?: Omit<ToastOptions, "message">) =>
      showToast("error", { ...options, message }),
  };
}; 