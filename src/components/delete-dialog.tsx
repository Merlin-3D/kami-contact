import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { SpinnerLoader } from "./spinner-loader";

interface DeleteDialogProps {
  handleOpen: () => void;
  handleDelete: () => void;
  open: boolean;
  loading?: boolean;

  title: string;
  description: string;
}

export function DeleteDialog({
  open,
  title,
  description,
  loading,
  handleOpen,
  handleDelete,
}: DeleteDialogProps) {
  return (
    <>
      <Dialog
        size="xs"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        open={open}
        handler={handleOpen}
        placeholder={""}
      >
        <DialogHeader placeholder={""}>
          <Typography variant="h5" color="blue-gray" placeholder={""}>
            Votre attention est requise!
          </Typography>
        </DialogHeader>
        <DialogBody
          divider
          className="grid place-items-center gap-4"
          placeholder={""}
        >
          <TrashIcon className="h-16" color="red" />
          <Typography color="red" variant="h4" placeholder={""}>
            {title}
          </Typography>
          <Typography className="text-center font-normal" placeholder={""}>
            {description}
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2" placeholder={""}>
          <Button
            variant="text"
            color="blue-gray"
            onClick={handleOpen}
            placeholder={""}
          >
            Fermer
          </Button>
          <Button
            disabled={loading}
            variant="gradient"
            color="red"
            onClick={handleDelete}
            placeholder={""}
          >
            {loading ? <SpinnerLoader size="sm" /> : "Ok, je l'ai compris"}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
