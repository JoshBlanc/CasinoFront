import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import ProteinasPage from "./ProteinasPage";

const ProteinasProtected = () => {
  return (
    <PrivateRoute>
      <ProteinasPage />
    </PrivateRoute>
  );
};

export default ProteinasProtected;
