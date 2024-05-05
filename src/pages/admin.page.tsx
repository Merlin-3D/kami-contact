import React from "react";
import classNames from "classnames";
import { useAuthContext } from "../core/context/auth-context";
import LayoutContent from "../layouts/layout-content";
import {
  CheckIcon,
  PeopleIcon,
  Profile2Icon,
  RefreshIcon,
  Send2Icon,
} from "../components/icons";
import Chart from "../components/admin/chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BreadcrumbsMenu } from "../components";
import { useQuery } from "@tanstack/react-query";
import { getAllDashboard } from "../core/api/api";
import { isEmpty } from "lodash";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminPage() {
  const { currentUser } = useAuthContext();
  const {
    data: countData,
    isLoading: isLoadingCount,
    error,
  } = useQuery({
    queryKey: ["all-dasboard"],
    queryFn: () => getAllDashboard(),
  });

  return (
    <LayoutContent>
      <>
        <BreadcrumbsMenu label="Kami" name="Contact" path="/dashboard/admin" />
        <div className="grid grid-cols-1 gap-4 m-4 sm:grid-cols-4 p-6">
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-green-400">
              <Send2Icon className="h-12 w-12 text-white" />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total Des Commandes</h3>
              <p className="text-3xl">
                {!isEmpty(countData) ? countData.commandes : 0}
              </p>
            </div>
          </div>

          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-indigo-400">
              <PeopleIcon className="h-12 w-12 text-white" />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total Des Contacts</h3>
              <p className="text-3xl">
                {!isEmpty(countData) ? countData.contacts : 0}
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-yellow-400">
              <RefreshIcon className="h-12 w-12 text-white" />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Opérations Entrées</h3>
              <p className="text-3xl">
                {!isEmpty(countData) ? countData.in : 0}
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-red-400">
              <CheckIcon className="h-12 w-12 text-white" />
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Opérations Sorties</h3>
              <p className="text-3xl">
                {!isEmpty(countData) ? countData.out : 0}
              </p>
            </div>
          </div>
        </div>
        {!isEmpty(countData) ? (
          <Chart bar={countData.chart.bar} pie={countData.chart.pie} />
        ) : (
          <></>
        )}
      </>
    </LayoutContent>
  );
}
