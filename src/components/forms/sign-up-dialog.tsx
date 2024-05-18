import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { isEmpty, isNil } from "lodash";

import { useMutation } from "@tanstack/react-query";
import AlertNotification from "../alert-notification";
import { SpinnerLoader } from "../spinner-loader";
import {
  actionsType,
  ContactRequest,
  ContactResponse,
  ContactUpdateRequest,
  User,
} from "../../core/entities/user";
import { createContact, updateContact } from "../../core/api/api";

interface SignUpDialogProps {
  handleOpen: () => void;
  open: boolean;
  title: string;
  description: string;
  action: actionsType;
  contact?: ContactResponse;
  dispatch?: (contact: ContactUpdateRequest | any) => void;
}

export function SignUpDialog({
  open,
  title,
  description,
  action,
  contact,
  handleOpen,
  dispatch,
}: SignUpDialogProps) {
  const [firstname, setFirstName] = React.useState<string>("");
  const [lastname, setLastName] = React.useState<string>("");
  const [city, setCity] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);

  const { mutate: createUserMutate, isPending: createUserIsPending } =
    useMutation({
      mutationFn: (contactRequest: ContactRequest) => {
        return createContact(contactRequest);
      },
      async onSuccess(res) {
        if (res.status === 201) {
          toast("Contact ajouter", { type: "success" });
          const data = await res.json();
          const contact = data as ContactResponse;
          dispatch!(contact);
          handleOpen();
        } else {
          const message = (await res.json()).message;

          if (message.includes("constraint failed: contacts.phone")) {
            setErrorMessage("Le télèphone est déja utilisé.");
          } else {
            setErrorMessage("Erreur de lenregistrement du contact");
          }

          setOpenAlert(true);
        }
      },
      onError(error) {
        toast(error.message, { type: "error" });
      },
    });

  const { mutate: updateUserMutate, isPending: updateUserIsPending } =
    useMutation({
      mutationFn: (contactUpdate: ContactUpdateRequest) => {
        return updateContact(contactUpdate.id, contactUpdate);
      },
      async onSuccess(res) {
        if (res.status === 200) {
          toast("Contact mise a jour", { type: "success" });
          const data = await res.json();
          const user = data as User;
          dispatch!(user);
          handleOpen();
        } else {
          const message = (await res.json()).message;

          if (message.includes("constraint failed: contacts.phone")) {
            setErrorMessage("Le télèphone est déja utilisé.");
          } else {
            setErrorMessage("Erreur de lenregistrement du contact");
          }

          setOpenAlert(true);
        }
      },
      onError(error) {
        toast(error.message, { type: "error" });
      },
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setOpenAlert(false);
    if (action === "add") {
      createUserMutate({
        firstName: firstname,
        lastName: lastname,
        city: city,
        phone: phone,
      });
    } else {
      updateUserMutate({
        id: contact!.id,
        lastName: isEmpty(lastname) ? contact!.lastName : lastname,
        firstName: isEmpty(firstname) ? contact!.firstName : firstname,
        city: isEmpty(city) ? contact!.city : city,
        phone: isEmpty(phone) ? contact!.phone : phone,
      });
    }
  };

  const content = action === "add" ? "Créer" : "Mise à jour";

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none relative"
        placeholder={""}
      >
        <div className="flex items-center gap-2 bg-gray-500 rounded-lg absolute right-0 -top-4 z-50">
          <IconButton
            variant="text"
            size="sm"
            onClick={handleOpen}
            placeholder={""}
          >
            <XMarkIcon color="white" className="h-6" />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto w-full max-w-[24rem]" placeholder={""}>
            <CardBody className="flex flex-col gap-4" placeholder={""}>
              <Typography variant="h4" color="blue-gray" placeholder={""}>
                {title}
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
                placeholder={""}
              >
                {description}
              </Typography>
              <AlertNotification
                open={openAlert}
                handleOpen={() => setOpenAlert(!openAlert)}
                content={errorMessage}
                color={"red"}
                type={"danger"}
              >
                {" "}
              </AlertNotification>
              <Typography className="-mb-2" variant="h6" placeholder={""}>
                Nom
              </Typography>
              <Input
                label="Nom"
                size="lg"
                required
                type="text"
                defaultValue={!isEmpty(contact) ? contact.lastName : ""}
                disabled={createUserIsPending || updateUserIsPending}
                onChange={(e) => setLastName(e.target.value)}
                crossOrigin=""
              />
              <Typography className="-mb-2" variant="h6" placeholder={""}>
                Prénom
              </Typography>
              <Input
                label="Prénom"
                size="lg"
                required
                type="text"
                defaultValue={!isEmpty(contact) ? contact.firstName : ""}
                disabled={createUserIsPending || updateUserIsPending}
                onChange={(e) => setFirstName(e.target.value)}
                crossOrigin=""
              />

              <Typography className="-mb-2" variant="h6" placeholder={""}>
                Téléphone
              </Typography>
              <Input
                label="Téléphone"
                size="lg"
                type="number"
                required
                defaultValue={!isEmpty(contact) ? contact.phone : ""}
                disabled={createUserIsPending || updateUserIsPending}
                onChange={(e) => setPhone(e.target.value)}
                crossOrigin=""
              />

              <Typography className="-mb-2" variant="h6" placeholder={""}>
                Pays / Ville
              </Typography>
              <Input
                label="Pays / Ville"
                size="lg"
                type="text"
                required
                defaultValue={!isEmpty(contact) ? contact.city : ""}
                disabled={createUserIsPending || updateUserIsPending}
                onChange={(e) => setCity(e.target.value)}
                crossOrigin=""
              />
            </CardBody>
            <CardFooter className="pt-0" placeholder={""}>
              <Button
                variant="gradient"
                color={action === "add" ? "green" : "yellow"}
                fullWidth
                type="submit"
                placeholder={""}
              >
                {!createUserIsPending || !updateUserIsPending ? (
                  content
                ) : (
                  <SpinnerLoader size="sm" />
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}
