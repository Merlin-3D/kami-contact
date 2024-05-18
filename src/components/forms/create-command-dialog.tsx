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
import { isEmpty } from "lodash";

import { useMutation } from "@tanstack/react-query";
import AlertNotification from "../alert-notification";
import { SpinnerLoader } from "../spinner-loader";
import {
  actionsType,
  CommandeRequest,
  CommandeResponse,
  CommandeUpdateRequest,
  User,
} from "../../core/entities/user";
import { createCommande, updateCommande } from "../../core/api/api";

interface CreateCommandProps {
  handleOpen: () => void;
  open: boolean;
  title: string;
  description: string;
  action: actionsType;
  commande?: CommandeResponse;
  dispatch?: (commande: CommandeUpdateRequest | any) => void;
}

export function CreateCommand({
  open,
  title,
  description,
  action,
  commande,
  handleOpen,
  dispatch,
}: CreateCommandProps) {
  const [date, setDate] = React.useState<string>("");
  const [article, setArticle] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(0);
  const [delivery, setDelivery] = React.useState<string>("");
  const [prixAch, setPrixAch] = React.useState<string>("");
  const [prixDouane, setPrixDouane] = React.useState<string>("");
  const [prixAchatTo, setPrixAchatTo] = React.useState<string>("");
  const [prixTot, setPrixTot] = React.useState<string>("");

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);

  const { mutate: createUserMutate, isPending: createUserIsPending } =
    useMutation({
      mutationFn: (commandeRequest: CommandeRequest) => {
        return createCommande(commandeRequest);
      },
      async onSuccess(res) {
        if (res.status === 201) {
          const data = await res.json();
          toast("Commande ajouter", { type: "success" });
          const commandeRequest = data as CommandeResponse;
          dispatch!(commandeRequest);
          handleOpen();
        } else {
          setErrorMessage("Echet d'enregistrement de la commande.");
          setOpenAlert(true);
        }
      },
      onError(error) {
        toast(error.message, { type: "error" });
      },
    });

  const { mutate: updateUserMutate, isPending: updateUserIsPending } =
    useMutation({
      mutationFn: (commandeUpdate: CommandeUpdateRequest) => {
        return updateCommande(commandeUpdate.id, commandeUpdate);
      },
      async onSuccess(res) {
        if (res.status === 200) {
          const data = await res.json();
          toast("Commande mise a jour", { type: "success" });
          const commande = data as CommandeResponse;
          dispatch!(commande);
          handleOpen();
        } else {
          setErrorMessage("Echec de mise a jour");
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
        date: date,
        article: article,
        qantity: quantity.toString(),
        delivery: article,
        prixAch: prixAch,
        prixAchatTot: prixAchatTo,
        prixDouane: prixDouane,
        prixTot: prixTot,
      });
    } else {
      updateUserMutate({
        id: commande!.id,
        article: isEmpty(article) ? commande!.article : article,
        qantity: isEmpty(quantity) ? commande!.qantity : quantity.toString(),
        date: isEmpty(date) ? commande!.date : date,
        delivery: isEmpty(delivery) ? commande!.delivery : delivery,
        prixAch: isEmpty(prixAch) ? commande!.prixAch : prixAch,
        prixAchatTot: isEmpty(prixAchatTo)
          ? commande!.prixAchatTot
          : prixAchatTo,
        prixDouane: isEmpty(prixDouane) ? commande!.prixDouane : prixDouane,
        prixTot: isEmpty(prixTot) ? commande!.prixTot : prixTot,
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
        <form onSubmit={handleSubmit} className="">
          <Card className="mx-auto w-full max-w-[24rem]" placeholder={""}>
            <CardBody placeholder={""}>
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
              <div className="flex flex-col gap-4 h-[600px] overflow-auto">
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
                  Date
                </Typography>
                <Input
                  label="Date"
                  size="lg"
                  required
                  type="date"
                  defaultValue={!isEmpty(commande) ? commande.date : ""}
                  disabled={createUserIsPending || updateUserIsPending}
                  onChange={(e) => setDate(e.target.value)}
                  crossOrigin=""
                />
                <Typography className="-mb-2" variant="h6" placeholder={""}>
                  Article
                </Typography>
                <Input
                  label="Article"
                  size="lg"
                  required
                  type="text"
                  defaultValue={!isEmpty(commande) ? commande.article : ""}
                  disabled={createUserIsPending || updateUserIsPending}
                  onChange={(e) => setArticle(e.target.value)}
                  crossOrigin=""
                />

                <Typography className="-mb-2" variant="h6" placeholder={""}>
                  Quantité
                </Typography>
                <Input
                  label="Quantité"
                  size="lg"
                  type="number"
                  required
                  defaultValue={!isEmpty(commande) ? commande.qantity : ""}
                  disabled={createUserIsPending || updateUserIsPending}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  crossOrigin=""
                />
                <Typography className="-mb-2" variant="h6" placeholder={""}>
                  Fournisseur
                </Typography>
                <Input
                  label="Fournisseur"
                  size="lg"
                  required
                  type="text"
                  defaultValue={!isEmpty(commande) ? commande.delivery : ""}
                  disabled={createUserIsPending || updateUserIsPending}
                  onChange={(e) => setDelivery(e.target.value)}
                  crossOrigin=""
                />

                <Typography className="-mb-2" variant="h6" placeholder={""}>
                  Prix d'achat
                </Typography>
                <Input
                  label="Prix d'achat"
                  size="lg"
                  type="number"
                  required
                  defaultValue={!isEmpty(commande) ? commande.prixAch : ""}
                  disabled={createUserIsPending || updateUserIsPending}
                  onChange={(e) => setPrixAch(e.target.value)}
                  crossOrigin=""
                />

                <Typography className="-mb-2" variant="h6" placeholder={""}>
                  Prix douane
                </Typography>
                <Input
                  label="Prix douane"
                  size="lg"
                  type="number"
                  required
                  defaultValue={!isEmpty(commande) ? commande.prixDouane : ""}
                  disabled={createUserIsPending || updateUserIsPending}
                  onChange={(e) => setPrixDouane(e.target.value)}
                  crossOrigin=""
                />

                <Typography className="-mb-2" variant="h6" placeholder={""}>
                  Prix total D'achat
                </Typography>
                <Input
                  label="Prix total D'achat"
                  size="lg"
                  type="number"
                  required
                  defaultValue={!isEmpty(commande) ? commande.prixDouane : ""}
                  disabled={createUserIsPending || updateUserIsPending}
                  onChange={(e) => setPrixAchatTo(e.target.value)}
                  crossOrigin=""
                />

                <Typography className="-mb-2" variant="h6" placeholder={""}>
                  Prix total
                </Typography>
                <Input
                  label="Prix total"
                  size="lg"
                  type="number"
                  required
                  defaultValue={!isEmpty(commande) ? commande.prixTot : ""}
                  disabled={createUserIsPending || updateUserIsPending}
                  onChange={(e) => setPrixTot(e.target.value)}
                  crossOrigin=""
                />
              </div>
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
