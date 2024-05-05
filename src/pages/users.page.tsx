import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import LayoutContent from "../layouts/layout-content";
import { BreadcrumbsMenu } from "../components";
import { PeopleIcon } from "../components/icons";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Nom & Email", "Télèphone", "Role", "Créer le", ""];

const TABLE_ROWS = [
  {
    img: "/logo512.png",
    name: "John Michael",
    email: "john@tim.com",
    job: "Admin",
    phone: "+237 655413390",
    date: "23/04/18",
  },
  {
    img: "/logo512.png",
    name: "Alexa Liras",
    email: "alexa@tim.com",
    job: "Admin",
    phone: "+237 655413390",
    date: "23/04/18",
  },
  {
    img: "/logo512.png",
    name: "Laurent Perrier",
    email: "laurent@tim.com",
    job: "Admin",
    phone: "+237 655413390",
    date: "19/09/17",
  },
  {
    img: "/logo512.png",
    name: "Michael Levi",
    email: "michael@tim.com",
    job: "Admin",
    phone: "+237 655413390",
    date: "24/12/08",
  },
  {
    img: "/logo512.png",
    name: "Richard Gran",
    email: "richard@tim.com",
    job: "Admin",
    phone: "+237 655413390",
    date: "04/10/21",
  },
];

export function UsersPage() {
  return (
    <LayoutContent>
      <BreadcrumbsMenu
        label="EasyPro Admin"
        name="Utilisateurs"
        path="/dashboard/users"
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
                  Utilisateurs
                </Typography>
              </div>
              <Typography
                placeholder={""}
                color="gray"
                className="mt-1 font-normal"
              >
                Consulter l'ensemble des utilisateurs
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <div className="w-full md:w-72">
                <Input
                  label="Rechercher..."
                  crossOrigin={""}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Button
                placeholder={""}
                className="flex items-center gap-3"
                size="sm"
                color="green"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter un
                utilisateur
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody placeholder={""} className="overflow-scroll px-0">
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
              {TABLE_ROWS.map(
                ({ img, name, email, job, phone, date }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            placeholder={""}
                            src={img}
                            alt={name}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              placeholder={""}
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                            <Typography
                              placeholder={""}
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
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
                            {phone}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            placeholder={""}
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {job}
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
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton
                            color="blue"
                            placeholder={""}
                            variant="text"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter
          placeholder={""}
          className="flex items-center justify-between border-t border-blue-gray-50 p-4"
        >
          <Button placeholder={""} variant="outlined" size="sm">
            Precedent
          </Button>
          <div className="flex items-center gap-2">
            <IconButton placeholder={""} variant="outlined" size="sm">
              1
            </IconButton>
            <IconButton placeholder={""} variant="text" size="sm">
              2
            </IconButton>
            <IconButton placeholder={""} variant="text" size="sm">
              3
            </IconButton>
            <IconButton placeholder={""} variant="text" size="sm">
              ...
            </IconButton>
            <IconButton placeholder={""} variant="text" size="sm">
              8
            </IconButton>
            <IconButton placeholder={""} variant="text" size="sm">
              9
            </IconButton>
            <IconButton placeholder={""} variant="text" size="sm">
              10
            </IconButton>
          </div>
          <Button placeholder={""} variant="outlined" size="sm">
            Suivant
          </Button>
        </CardFooter>
      </Card>
    </LayoutContent>
  );
}
