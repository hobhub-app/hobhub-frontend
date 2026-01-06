import { useEffect, useState } from "react";
import { Keyboard } from "@capacitor/keyboard";
import { Capacitor } from "@capacitor/core";
import type { PluginListenerHandle } from "@capacitor/core";

export const useKeyboardVisible = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let showListener: PluginListenerHandle | undefined;
    let hideListener: PluginListenerHandle | undefined;

    const setupListeners = async () => {
      showListener = await Keyboard.addListener("keyboardWillShow", () => {
        setIsVisible(true);
      });

      hideListener = await Keyboard.addListener("keyboardWillHide", () => {
        setIsVisible(false);
      });
    };

    setupListeners();

    return () => {
      showListener?.remove();
      hideListener?.remove();
    };
  }, []);

  return isVisible;
};
