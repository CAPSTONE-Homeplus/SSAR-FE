import React from "react";
import { CredenzaCreateCluster } from "./_components/credenza-create-cluster";
import { CredenzaUpdateCluster } from "./_components/credenza-update-cluster";
import { TClusterRequest } from "@/schema/cluster.schema";

const ClustersPage = () => {
  // Mock data for the update cluster
  const mockClusterData: TClusterRequest = {
    id: "123",
    name: "Test Cluster",
    description: "This is a test cluster",
    location: "Test Location",
    createdBy: "Admin",
    updatedBy: "Admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <div>
      <h1>Clusters Page</h1>
      <CredenzaCreateCluster className="" />
      {/* Passing mock data as initialData to CredenzaUpdateCluster */}
      <CredenzaUpdateCluster className="" initialData={mockClusterData} />
    </div>
  );
};

export default ClustersPage;
