import { getConfig } from "../config";

export const ExcalidrawPlusPromoBanner = ({
  isSignedIn,
}: {
  isSignedIn: boolean;
}) => {
  return (
    <a
      href={
        isSignedIn
          ? getConfig("VITE_APP_PLUS_APP")
          : `${getConfig("VITE_APP_PLUS_LP")}/plus?utm_source=excalidraw&utm_medium=app&utm_content=guestBanner#excalidraw-redirect`
      }
      target="_blank"
      rel="noopener"
      className="plus-banner"
    >
      Excalidraw+
    </a>
  );
};
