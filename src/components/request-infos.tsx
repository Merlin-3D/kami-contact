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
import { XMarkIcon } from "@heroicons/react/24/solid";

import { RequestResponse } from "../core/entities/request.entities";

interface RequestInfosProps {
  request: RequestResponse;
  handleOpen: () => void;
  open: boolean;
}

export function RequestInfos({ open, handleOpen, request }: RequestInfosProps) {
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
        <Card className="mx-auto w-full max-w-[24rem]" placeholder={""}>
          <CardBody className="flex flex-col gap-4" placeholder={""}>
            <Typography variant="h5" color="blue-gray" placeholder={""}>
              Requette: {request.code}
            </Typography>
            <hr />
            <div className="grid grid-cols-2 gap-2">
              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Civilité:{" "}
              </Typography>
              <span className="font-semibold text-black">
                {request.civility}
              </span>
              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Nom et Prénom:{" "}
              </Typography>
              <span className="font-semibold text-black">
                {request.fullName}
              </span>
              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Téléphone:{" "}
              </Typography>
              <span className="font-semibold text-black">
                {request.phoneNumber}
              </span>
              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Numéro Whatsapp:{" "}
              </Typography>
              <span className="font-semibold text-black">
                {request.whatsappContact}
              </span>
              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Civilité:{" "}
              </Typography>
              <span className="font-semibold text-black">
                {request.civility}
              </span>
              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Email:{" "}
              </Typography>
              <span className="font-semibold text-black">{request.email}</span>

              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Type d'usager:{" "}
              </Typography>
              <span className="font-semibold text-black">
                {request.typeUser}
              </span>
              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Ma Region et mon departement de naissance:{" "}
              </Typography>
              <span className="font-semibold text-black">
                {request.regionOfBirth}
              </span>
              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Lieu d'etablissement C.J:{" "}
              </Typography>
              <span className="font-semibold text-black">{request.court}</span>

              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Je residence à:{" "}
              </Typography>
              <span className="font-semibold text-black">
                {request.destination_location}
              </span>
              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Ma commune de résidence est:{" "}
              </Typography>
              <span className="font-semibold text-black">
                {request.destination_address}
              </span>
              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Code postal:{" "}
              </Typography>
              <span className="font-semibold text-black">
                {request.user_postal_code}
              </span>
              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Numéro de la personne à contacter:{" "}
              </Typography>
              <span className="font-semibold text-black">
                {request.user_close_friend_number}
              </span>
              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Nombre de casier judiciaire:{" "}
              </Typography>
              <span className="font-semibold text-black">
                {request.criminalRecordNumber}
              </span>
              <Typography
                className="-mb-2 text-base font-medium"
                placeholder={""}
              >
                Civilité:{" "}
              </Typography>
              <span className="font-semibold text-black">
                {request.civility}
              </span>
            </div>
          </CardBody>
          <CardFooter className="pt-0" placeholder={""}>
            <Button
              variant="gradient"
              color={"blue"}
              fullWidth
              type="submit"
              placeholder={""}
              onClick={handleOpen}
            >
              Fermer
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
