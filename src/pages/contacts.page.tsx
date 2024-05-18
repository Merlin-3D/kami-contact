import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
import { deleteContact, getAllContacts } from "../core/api/api";
import { isEmpty, isNil } from "lodash";
import { SpinnerLoader } from "../components/spinner-loader";
import { ContactResponse, ContactUpdateRequest } from "../core/entities/user";
import { formatDate } from "../utils/common";
import { toast } from "react-toastify";
import { DeleteDialog } from "../components/delete-dialog";

const TABLE_HEAD = [
  "Nom & Prénom",
  "Télèphone",
  "Pays / Ville",
  "Créer le",
  "Actions",
];

export function ContactPage() {
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openUpadeSignUp, setOpenUpdateSignUp] = React.useState(false);
  const [query, setQuery] = React.useState<string>("");
  const [search, setSearch] = React.useState<string>("");
  const [contact, setContact] = React.useState<ContactResponse>();
  const [page, setPage] = React.useState<number>(1);
  const [open, setOpen] = React.useState(false);
  const [filteredContact, setFilteredContact] = React.useState<
    ContactResponse[]
  >([]);

  const {
    data: contactsData,
    isLoading: isLoadingCommandes,
    refetch: refreshContacts,
    error,
  } = useQuery<ContactResponse[]>({
    queryKey: ["all-contacts", query],
    queryFn: () => getAllContacts(query),
  });

  const { mutate: handleDeleteContact, isPending: deleteISpending } =
    useMutation({
      mutationFn: (userId: number) => {
        return deleteContact(userId);
      },
      onSuccess(data) {
        if (data.status === 200) {
          refreshContacts();
          toast("Contact supprimer", { type: "success" });
          setOpen(!open);
        } else {
          toast("Erreur de suppression", { type: "error" });
          setOpen(!open);
        }
      },
      onError(error) {},
    });

  const handleResponse = React.useCallback(() => {
    refreshContacts();
  }, [refreshContacts]);

  const handleUpdateResponse = React.useCallback(
    (contact: ContactUpdateRequest) => {
      refreshContacts();
    },
    [refreshContacts]
  );

  const handleUpdate = React.useCallback((item: any) => {
    setContact(item);
    setOpenUpdateSignUp(true);
  }, []);

  const handleChangePage = (item: number) => {
    setPage(item);
    setQuery(`?page=${item}`);
  };

  const handleConfirmDelete = React.useCallback(async () => {
    handleDeleteContact(contact!.id);
  }, [handleDeleteContact, contact]);

  const handleDelete = React.useCallback((contact: ContactResponse) => {
    setContact(contact);
    setOpen(true);
  }, []);

  const handleSearch = React.useMemo(() => {
    if (isEmpty(search)) {
      return contactsData;
    }
    return contactsData!.filter((item) => {
      return (
        item.firstName!.toLowerCase().includes(search.toLowerCase()) ||
        item.phone!.toLowerCase().includes(search.toLowerCase()) ||
        item.city!.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName!.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [contactsData, search]);

  return (
    <>
      <LayoutContent>
        <BreadcrumbsMenu
          label="Kami"
          name="Contacts"
          path="/dashboard/contacts"
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
                    Contacts
                  </Typography>
                </div>
                <Typography
                  placeholder={""}
                  color="gray"
                  className="mt-1 font-normal"
                >
                  Consulter l'ensemble des contacts
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <div className="w-full md:w-72">
                  <Input
                    label="Rechercher..."
                    crossOrigin={""}
                    onChange={(e) => setSearch(e.target.value)}
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
                  un contact
                </Button>
              </div>
            </div>
          </CardHeader>
          {isLoadingCommandes ? (
            <SpinnerLoader size="lg" />
          ) : (
            <CardBody placeholder={""} className="overflow-scroll px-0">
              {!isEmpty(handleSearch) ? (
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
                    {handleSearch?.map((item, index) => {
                      const isLast = index === handleSearch.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={item.id}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              {/* <Avatar
                              placeholder={""}
                              src={item.img}
                              alt={item.name}
                              size="sm"
                            /> */}
                              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-400 text-white">
                                {item.firstName!.slice(0, 1) +
                                  item.lastName!.slice(0, 1)}
                              </div>
                              <div className="flex flex-col">
                                <Typography
                                  placeholder={""}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {item.firstName + " " + item.lastName}
                                </Typography>
                                <Typography
                                  placeholder={""}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                                  {item.phone}
                                </Typography>
                              </div>
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
                                {item.phone}
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
                                {item.city}
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
                            <Tooltip content="Edit Contact">
                              <IconButton
                                color="blue"
                                placeholder={""}
                                variant="text"
                                onClick={() => handleUpdate(item)}
                              >
                                <EditIcon className="h-6 w-6 text-blue-400" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip content="Delete Contact">
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
                    })}
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
        title="Supprimer ce contact"
        description="Êtes-vous sûr de vouloir supprimer ce contact ?"
      />
      <SignUpDialog
        open={openSignUp}
        handleOpen={() => setOpenSignUp(!openSignUp)}
        dispatch={handleResponse}
        title="Créer un nouvel contact"
        description="Entrez les informations completes du contact"
        action="add"
      />
      <SignUpDialog
        open={openUpadeSignUp}
        handleOpen={() => setOpenUpdateSignUp(!openUpadeSignUp)}
        dispatch={handleUpdateResponse}
        contact={contact}
        title="Mettre à jour ce contact"
        description="Mettez à jour le nom complet et l'adresse e-mail."
        action="edit"
      />
    </>
  );
}
