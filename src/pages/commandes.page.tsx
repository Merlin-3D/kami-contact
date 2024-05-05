import {
  ArrowsRightLeftIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  LockClosedIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import LayoutContent from "../layouts/layout-content";
import { BreadcrumbsMenu } from "../components";
import { EditIcon, PeopleIcon } from "../components/icons";
import { SignUpDialog } from "../components/forms/sign-up-dialog";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCommande, getAllCommandes } from "../core/api/api";
import { isEmpty, isNil } from "lodash";
import { SpinnerLoader } from "../components/spinner-loader";
import { CommandeResponse, CommandeUpdateRequest } from "../core/entities/user";
import { formatDate } from "../utils/common";
import { toast } from "react-toastify";
import { DeleteDialog } from "../components/delete-dialog";
import { CreateCommand } from "../components/forms/create-command-dialog";
import Drawer from "../components/drawer";
import { UpdateOperationdDialog } from "../components/forms/update-operation-dialog";

const TABLE_HEAD = [
  "Date",
  "Article",
  "Quantité",
  "Fournisseur",
  "Prix d'achat",
  "Prix douana",
  "Prix total d'achat",
  "Prix total",
  "Créer le",
  "Actions",
];

export function CommandesPage() {
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openUpadeSignUp, setOpenUpdateSignUp] = React.useState(false);
  const [openUpadePassword, setOpenUpdatePassword] = React.useState(false);
  const [query, setQuery] = React.useState<string>("");
  const [commande, setCommande] = React.useState<CommandeResponse>();
  const [page, setPage] = React.useState<number>(1);
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [filteredCommandes, setFilteredCommande] = React.useState<
    CommandeResponse[]
  >([]);

  const {
    data: commandesData,
    isLoading: isLoadingAgents,
    refetch: refreshCommandes,
    error,
  } = useQuery<CommandeResponse[]>({
    queryKey: ["all-commandes", query],
    queryFn: () => getAllCommandes(query),
  });

  const { mutate: handleDeleteCommande, isPending: deleteISpending } =
    useMutation({
      mutationFn: (userId: number) => {
        return deleteCommande(userId);
      },
      onSuccess(data) {
        if (!isNil(data)) {
          handleResponse();
          toast("Commande supprimer", { type: "success" });
          setOpen(!open);
        } else {
          toast("Erreur de suppression", { type: "error" });
          setOpen(!open);
        }
      },
      onError(error) {},
    });

  const handleResponse = React.useCallback(() => {
    refreshCommandes();
  }, [refreshCommandes]);

  const handleUpdateResponse = React.useCallback(
    (commande: CommandeUpdateRequest) => {
      handleResponse();
    },
    [handleResponse]
  );

  const handleUpdate = React.useCallback((item: any) => {
    setCommande(item);
    setOpenUpdateSignUp(true);
  }, []);

  const handleConfirmDelete = React.useCallback(async () => {
    handleDeleteCommande(commande!.id);
  }, [handleDeleteCommande, commande]);

  const handleDelete = React.useCallback((contact: CommandeResponse) => {
    setCommande(contact);
    setOpen(true);
  }, []);

  const handleDetail = React.useCallback((contact: CommandeResponse) => {
    setCommande(contact);
    setOpenDrawer(true);
  }, []);

  const handleSearch = React.useCallback(
    (param: string) => {
      if (isEmpty(param)) {
        setFilteredCommande(() => {
          return [];
        });
      }
      setFilteredCommande(() => {
        return commandesData!.filter((item) => {
          return (
            item.article!.toLowerCase().includes(param.toLowerCase()) ||
            item.delivery!.toLowerCase().includes(param.toLowerCase())
          );
        });
      });
    },
    [commandesData]
  );
  const commandes = !isEmpty(filteredCommandes)
    ? filteredCommandes
    : commandesData!;
  return (
    <>
      <LayoutContent>
        <BreadcrumbsMenu
          label="Kami"
          name="Commandes"
          path="/dashboard/commandes"
        />

        <Card placeholder={""} className="shadow-none w-full">
          <CardHeader
            placeholder={""}
            floated={false}
            shadow={false}
            className="rounded-none"
          >
            <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="flex gap-x-2">
                  <PeopleIcon className="" />
                  <Typography placeholder={""} variant="h5" color="blue-gray">
                    Commandes
                  </Typography>
                </div>
                <Typography
                  placeholder={""}
                  color="gray"
                  className="mt-1 font-normal"
                >
                  Consulter l'ensemble des commandes
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <div className="w-full md:w-72">
                  <Input
                    label="Rechercher..."
                    crossOrigin={""}
                    onChange={(e) => handleSearch(e.target.value)}
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
                <Button
                  placeholder={""}
                  className="flex items-center gap-3"
                  size="sm"
                  color="green"
                  onClick={() => setOpenSignUp(true)}
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter
                  une commande
                </Button>
              </div>
            </div>
          </CardHeader>
          {isLoadingAgents ? (
            <SpinnerLoader size="lg" />
          ) : (
            <CardBody placeholder={""} className="overflow-scroll px-0">
              {!isEmpty(commandes) ? (
                <table className="mt-4 w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                        >
                          <Typography
                            placeholder={""}
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {!isEmpty(commandes) ? (
                      commandes?.map((item, index) => {
                        const isLast = index === commandes.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <tr key={item.id}>
                            <td className={classes}>
                              <div className="w-max">
                                <Typography
                                  placeholder={""}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {item.date}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Typography
                                  placeholder={""}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {item.article}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Typography
                                  placeholder={""}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {item.qantity}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Typography
                                  placeholder={""}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {item.delivery}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Typography
                                  placeholder={""}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {item.prixAch} FCFA
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Typography
                                  placeholder={""}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {item.prixDouane} FCFA
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Typography
                                  placeholder={""}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {item.prixAchatTot} FCFA
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Typography
                                  placeholder={""}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {item.prixTot} FCFA
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography
                                placeholder={""}
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {formatDate(item.createdAt)}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Tooltip content="Voir les details">
                                <IconButton
                                  variant="text"
                                  onClick={() => handleDetail(item)}
                                  placeholder={""}
                                >
                                  <InformationCircleIcon
                                    className="h-6 w-6"
                                    color="green"
                                  />
                                </IconButton>
                              </Tooltip>

                              <Tooltip content="Edit Commande">
                                <IconButton
                                  color="blue"
                                  placeholder={""}
                                  variant="text"
                                  onClick={() => handleUpdate(item)}
                                >
                                  <EditIcon className="h-6 w-6 text-blue-400" />
                                </IconButton>
                              </Tooltip>

                              <Tooltip content="Delete Commande">
                                <IconButton
                                  variant="text"
                                  onClick={() => handleDelete(item)}
                                  placeholder={""}
                                >
                                  <TrashIcon className="h-6 w-6" color="red" />
                                </IconButton>
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              ) : (
                <div className="w-full flex justify-center items-center">
                  <span>Aucune Données</span>
                </div>
              )}
            </CardBody>
          )}
          {/* <CardFooter
            placeholder={""}
            className="hidden md:flex items-center justify-center border-t border-blue-gray-50 p-4"
          >
            <PaginationCustom
              prevPage={(index) => handleChangePage(index - 1)}
              nextPage={(index) => handleChangePage(index + 1)}
              changePage={handleChangePage}
              totalPages={Math.floor(agentsData?.count! / 10) + 1}
              page={page}
            />
          </CardFooter> */}
        </Card>
      </LayoutContent>
      <DeleteDialog
        open={open}
        loading={deleteISpending}
        handleOpen={() => setOpen(!open)}
        handleDelete={() => handleConfirmDelete()}
        title="Supprimer cette commande"
        description="Êtes-vous sûr de vouloir supprimer cette commande ?"
      />
      <CreateCommand
        open={openSignUp}
        handleOpen={() => setOpenSignUp(!openSignUp)}
        dispatch={handleResponse}
        title="Créer un nouvel commande"
        description="Entrez les informations completes de la commande"
        action="add"
      />
      <CreateCommand
        open={openUpadeSignUp}
        handleOpen={() => setOpenUpdateSignUp(!openUpadeSignUp)}
        dispatch={handleUpdateResponse}
        commande={commande}
        title="Mettre à jour ce commande"
        description="Mettez à jour les informations de la commande."
        action="edit"
      />
      {commande ? (
        <Drawer
          commande={commande}
          openDrawer={openDrawer}
          setRefreshData={() => {
            setOpenDrawer(!openDrawer);
            handleResponse();
          }}
          setDrawer={() => setOpenDrawer(!openDrawer)}
        />
      ) : (
        <></>
      )}
    </>
  );
}
