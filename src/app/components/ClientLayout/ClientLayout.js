// components/ClientLayout.js
'use client'; // This directive indicates that this component is a client component

import { ModalProvider } from "../../context/ModalContext";
import { MatchProvider } from "@/app/context/MatchContext";

const ClientLayout = ({ children }) => {
  return (
    <ModalProvider>
      <MatchProvider>
        <div>
          {/* You can add client-specific elements here */}
          {children}
        </div>
      </MatchProvider>
    </ModalProvider>
  );
};

export default ClientLayout;
