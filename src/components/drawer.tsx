import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PencilIcon, PlusIcon } from "@heroicons/react/20/solid";
import { CommandeResponse } from "../core/entities/user";
import { formatDate } from "../utils/common";
import { UpdateOperationdDialog } from "./forms/update-operation-dialog";

interface DrawerProps {
  commande: CommandeResponse;
  openDrawer: boolean;
  setDrawer: () => void;
  setRefreshData: () => void;
}
export default function Drawer({
  commande,
  openDrawer,
  setDrawer,
  setRefreshData,
}: DrawerProps) {
  const [type, setType] = React.useState<"Entrée" | "Sortie">("Entrée");
  const [openOperationDialog, setOpenOperationDialog] = React.useState(false);

  return (
    <>
      <Transition.Root show={openDrawer} as={Fragment}>
        <Dialog className="relative z-50 " onClose={setDrawer}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-96">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={setDrawer}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-full overflow-y-auto bg-white p-8">
                      <div className="space-y-6 pb-16">
                        <div>
                          <div className="mt-4 flex items-start justify-between">
                            <div>
                              <h2 className="text-base font-semibold leading-6 text-gray-900">
                                <span className="sr-only">Details for </span>
                                DÉTAIL DE LA COMMANDE
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Informations
                          </h3>
                          <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Date</dt>
                              <dd className="text-gray-900">{commande.date}</dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Artilce</dt>
                              <dd className="text-gray-900">
                                {commande.article}
                              </dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Quantité</dt>
                              <dd className="text-gray-900">
                                {commande.qantity}
                              </dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Fournisseur</dt>
                              <dd className="text-gray-900">
                                {commande.delivery}
                              </dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Prix d'achat</dt>
                              <dd className="text-gray-900">
                                {commande.prixAch} FCFA
                              </dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">
                                Prix d'achat Total
                              </dt>
                              <dd className="text-gray-900">
                                {commande.prixAchatTot} FCFA
                              </dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Prix douane</dt>
                              <dd className="text-gray-900">
                                {commande.prixDouane} FCFA
                              </dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Prix Total</dt>
                              <dd className="text-gray-900">
                                {commande.prixTot} FCFA
                              </dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Créer le</dt>
                              <dd className="text-gray-900">
                                {formatDate(commande.createdAt)}
                              </dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Modifier le</dt>
                              <dd className="text-gray-900">
                                {formatDate(commande.updatedAt)}
                              </dd>
                            </div>
                          </dl>
                        </div>
                        <div className="flex w-full justify-between">
                          <h3 className="font-medium text-gray-900">
                            Opérations
                          </h3>
                          <div className="flex">
                            <button
                              onClick={() => {
                                setType("Entrée");
                                setOpenOperationDialog(true);
                              }}
                              className="flex-1 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            >
                              Entrée
                            </button>
                            <button
                              onClick={() => {
                                setType("Sortie");
                                setOpenOperationDialog(true);
                              }}
                              className="flex-1 ml-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                              Sortie
                            </button>
                          </div>
                        </div>
                        <div>
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className="text-base font-semibold text-gray-900">
                                  Initiale
                                </th>
                                <th className="text-base font-semibold text-gray-900">
                                  Effectuée
                                </th>
                                <th className="text-base font-semibold text-gray-900">
                                  Total
                                </th>
                                <th className="text-base font-semibold text-gray-900">
                                  Opéra
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {commande.operations.map((item, i) => {
                                return (
                                  <tr className="text-base font-medium text-gray-700">
                                    <td className="text-center">
                                      {item.initQte}
                                    </td>
                                    <td className="text-center">
                                      {Number(item.newQte) -
                                        Number(item.initQte)}
                                    </td>
                                    <td className="text-center">
                                      {item.newQte}
                                    </td>
                                    <td>
                                      {" "}
                                      {item.type === "in" ? (
                                        <span className="ml-6 rounded-md bg-green-100 px-1 text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                          Entrée
                                          <span className="sr-only"> </span>
                                        </span>
                                      ) : (
                                        <span className="ml-6 rounded-md bg-red-100 px-1 text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                          Sortie
                                          <span className="sr-only"> </span>
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          <ul
                            role="list"
                            className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200"
                          ></ul>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <UpdateOperationdDialog
        commandeId={commande.id}
        open={openOperationDialog}
        handleOpen={() => {
          setRefreshData();
          setOpenOperationDialog(!openOperationDialog);
        }}
        label={type}
      />
    </>
  );
}
