// components/ClientLayout.js
'use client'; // This directive indicates that this component is a client component

import { ModalProvider } from "../../context/ModalContext";
import { MatchProvider } from "@/app/context/MatchContext";
import { PusherProvider } from "@/app/context/PusherContext";

const ClientLayout = ({ children }) => {
  return (
    // <PusherProvider>
      <ModalProvider>
        <MatchProvider>
          <div>
            {/* You can add client-specific elements here */}
            {children}
          </div>
        </MatchProvider>
      </ModalProvider>
    // </PusherProvider>
  );
};

export default ClientLayout;
