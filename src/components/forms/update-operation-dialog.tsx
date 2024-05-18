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

import { useMutation } from "@tanstack/react-query";
import AlertNotification from "../alert-notification";
import { SpinnerLoader } from "../spinner-loader";
import { updateOperation } from "../../core/api/api";
import { Operation } from "../../core/entities/user";

interface UpdateOperationDialogProps {
  commandeId: number;
  label: "Entrée" | "Sortie";
  handleOpen: () => void;
  open: boolean;
}

export function UpdateOperationdDialog({
  commandeId,
  label,
  open,
  handleOpen,
}: UpdateOperationDialogProps) {
  const [qte, setQte] = React.useState<string>("");

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);

  const { mutate: updateOpeartionMutate, isPending } = useMutation({
    mutationFn: (operation: Operation) => {
      return updateOperation(commandeId, operation);
    },
    onSuccess(res) {
      if (res.status === 200) {
        toast("Opération éffectuée", { type: "success" });
        handleOpen();
      } else {
        setErrorMessage("data.message");
        setOpenAlert(true);
      }
    },
    onError(error) {},
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setOpenAlert(false);

    updateOpeartionMutate({
      type: label === "Entrée" ? "in" : "out",
      newQte: qte,
    });
  };

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
                Effectué l'opération {label}
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
                Nouvelle qantité
              </Typography>
              <Input
                label="Qté"
                size="lg"
                type="number"
                required
                // disabled={isPending}
                onChange={(e) => setQte(e.target.value)}
                crossOrigin=""
              />
            </CardBody>
            <CardFooter className="pt-0" placeholder={""}>
              <Button
                variant="gradient"
                color={label === "Entrée" ? "green" : "red"}
                fullWidth
                type="submit"
                placeholder={""}
              >
                {!isPending ? "Enregistrer" : <SpinnerLoader size="sm" />}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}
