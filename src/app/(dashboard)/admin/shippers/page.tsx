import React from "react";

const ShipperPage = async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
  return <div>ShipperPage</div>;
};

export default ShipperPage;
