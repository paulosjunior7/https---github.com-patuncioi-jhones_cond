import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Pencil, Plus, Search, User, UserX } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { fetchNui } from "@/utils/fetchNui";
import { ToastMessage } from "@/components/ToastMessage";
import { toast } from "sonner";

interface Permission {
  name: string;
  state?: boolean;
}
interface ListPermissions {
  [key: string]: Permission;
}
interface UserPermissions {
  id: number;
  name: string;
  permissions: {
    [key: string]: Permission;
  };
}
interface PermissionsData {
  listPermissions: ListPermissions;
  userPermissions: {
    [key: string]: UserPermissions;
  };
}

interface Response {
  message: string;
  success: boolean;
}

export default function PermissoesUsuarios() {
  const [data, setData] = useState<PermissionsData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUserId, setNewUserId] = useState("");
  const [newPermissions, setNewPermissions] = useState<{
    [key: string]: Permission;
  }>({});

  const loadpermissions = () => {
    fetchNui("jhones_cond:userPermissions").then((data) => {
      const homeData = data as PermissionsData;
      setData(homeData);
      setNewPermissions(homeData.listPermissions);
    });
  };

  useEffect(() => {
    loadpermissions();
  }, []);

  const handleAddMember = async (userId: string) => {
    // Garante que todas as permissões tenham o campo state explicitamente definido (true ou false)
    const permissionsToSend: { [key: string]: Permission } = {};
    Object.entries(newPermissions).forEach(([key, perm]) => {
      permissionsToSend[key] = {
        ...perm,
        state: !!perm.state, // força booleano (true ou false)
      };
    });

    const response: Response = await fetchNui("jhones_cond:addUser", {
      userId,
      permissions: permissionsToSend,
    });

    if (response) {
      toast(
        <ToastMessage
          text={response.message}
          type={response.success ? "success" : "error"}
        />,
        {
          duration: 5000,
          style: {
            display: "none",
          },
        }
      );
    }

    setNewUserId("");
    setNewPermissions({});
    loadpermissions();
  };

  const handleEditPermissions = async (
    userId: string,
    permissions: { [key: string]: Permission }
  ) => {
    setData((prevData) => {
      if (!prevData) return null;
      const updatedUserPermissions = {
        ...prevData.userPermissions,
        [userId]: {
          ...prevData.userPermissions[userId],
          permissions: permissions,
        },
      };
      return { ...prevData, userPermissions: updatedUserPermissions };
    });
  };

  const handleConfirmEdit = async (userId: string) => {
    const response: Response = await fetchNui(
      "jhones_cond:setUserPermissions",
      {
        userId,
        permissions: data?.userPermissions[userId]?.permissions,
      }
    );

    if (response) {
      toast(
        <ToastMessage
          text={response.message}
          type={response.success ? "success" : "error"}
        />,
        {
          duration: 5000,
          style: {
            display: "none",
          },
        }
      );
    }

    loadpermissions();
  };

  const handleConfirmDelete = async (userId: string) => {
    const response: Response = await fetchNui("jhones_cond:deleteUser", {
      userId,
    });

    if (response) {
      toast(
        <ToastMessage
          text={response.message}
          type={response.success ? "success" : "error"}
        />,
        {
          duration: 5000,
          style: {
            display: "none",
          },
        }
      );
    }

    loadpermissions();
  };

  return (
    <div className="flex gap-6 flex-col py-10">
      <div className="flex-row flex justify-between items-center">
        <p className="font-semibold text-lg">Membros com permissões</p>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="text-gray-400 size-4 absolute left-2 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              className="bg-[#1e1e21] pl-10 border border-[#FFFFFF1A] rounded-lg text-sm p-2 h-[38px] w-[270px] font-semibold"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Dialog>
            <form>
              <DialogTrigger asChild>
                <button className="bg-[#FF204E] w-auto font-semibold flex items-center text-white px-4 py-2 h-[38px] rounded-lg text-sm">
                  <Plus className="size-4 mr-2" />
                  Adicionar membro
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px] p-10 modal-cut-corners">
                <DialogHeader className="flex gap-3">
                  <DialogTitle className="font-bold text-xl flex gap-3 leading-baseline">
                    <div className="bg-[#FF204E] size-8 rounded-lg  flex items-center justify-center">
                      <Check />
                    </div>
                    Permissões
                  </DialogTitle>
                  <DialogDescription className="font-normal text-base">
                    Gerencie as permissões deste membro na sua residência.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex w-full py-3">
                  <Input
                    type="number"
                    min="0"
                    className="bg-[#1e1e21] border border-[#FFFFFF1A] rounded-lg text-sm p-2 h-[38px] w-full font-semibold"
                    placeholder="Passaporte"
                    onChangeCapture={(e) =>
                      setNewUserId((e.target as HTMLInputElement).value)
                    }
                  />
                </div>
                <div className="grid gap-6 py-3 grid-cols-2 overflow-y-auto max-h-[300px]  ">
                  {newPermissions &&
                    Object.entries(newPermissions).map(([key, permission]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-white select-none">
                          {permission.name}
                        </span>
                        <Switch
                          checked={newPermissions[key]?.state || false}
                          onCheckedChange={(checked) => {
                            setNewPermissions((prev) => ({
                              ...prev,
                              [key]: {
                                ...permission,
                                state: checked ? checked : false,
                              },
                            }));
                          }}
                        />
                      </div>
                    ))}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      onClick={() => {
                        handleAddMember(newUserId);
                      }}
                      className="h-[40px] w-full font-semibold bg-[#FF204E]"
                    >
                      Confirmar alteração
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
      <div className="flex gap-2 flex-col max-h-[400px] overflow-y-auto pr-4">
        {Object.entries(data?.userPermissions || {})
          .filter(([userId, user]) => {
            const term = searchTerm.toLowerCase();
            return (
              user?.name?.toLowerCase().includes(term) ||
              userId.toString().includes(term)
            );
          })
          .map(([userId, user]) => (
            <div
              key={userId}
              className="flex gap-2 px-4 py-2  justify-between border-[#FFFFFF1A] bg-[#1e1e21] border-[1px] rounded-[6px]"
            >
              <div className="flex items-center gap-3">
                <User className="text-gray-400 size-5" />
                <p className="text-base font-semibold text-white">
                  {user?.name}
                </p>
                <div className="bg-[#FF204E] text-sm font-semibold px-2 rounded-md">
                  {userId}
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <button className="text-gray-400 bg-[#28282b] p-2 rounded-lg hover:text-white">
                        <Pencil className="size-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px] p-10 modal-cut-corners">
                      <DialogHeader className="flex gap-3">
                        <DialogTitle className="font-bold text-xl flex gap-3 leading-baseline">
                          <div className="bg-[#FF204E] size-8 rounded-lg  flex items-center justify-center">
                            <Check />
                          </div>
                          Permissões
                        </DialogTitle>
                        <DialogDescription className="font-normal text-base">
                          Gerencie as permissões deste membro na sua residência.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex w-full py-3">
                        <Input
                          type={user?.id ? "text" : "number"}
                          min="0"
                          disabled={user?.id !== undefined}
                          className="bg-[#1e1e21] border border-[#FFFFFF1A] rounded-lg text-sm p-2 h-[38px] w-full font-semibold"
                          placeholder="Passaporte"
                          defaultValue={user?.name.toString()}
                        />
                      </div>
                      <div className="grid gap-6 py-3 grid-cols-2 overflow-y-auto max-h-[300px]  ">
                        {Object.entries(data?.listPermissions || {}).map(
                          ([key, permission]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between"
                            >
                              <span className="text-sm font-medium text-white select-none">
                                {permission.name}
                              </span>
                              <Switch
                                checked={user.permissions[key]?.state || false}
                                onCheckedChange={(checked) => {
                                  handleEditPermissions(userId, {
                                    ...user.permissions,
                                    [key]: {
                                      ...permission,
                                      state: checked,
                                    },
                                  });
                                }}
                              />
                            </div>
                          )
                        )}
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            onClick={() => handleConfirmEdit(userId)}
                            className="h-[40px] w-full font-semibold bg-[#FF204E]"
                          >
                            Confirmar alteração
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>

                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <button className="bg-[#FF204E] p-2 rounded-lg text-gray-400 hover:text-white">
                        <UserX className="size-4 text-white" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] p-10 modal-cut-corners">
                      <DialogHeader className="flex gap-3">
                        <DialogTitle className="font-bold text-xl flex gap-3 leading-baseline">
                          <div className="bg-[#FF204E] size-8 rounded-lg  flex items-center justify-center">
                            <Check />
                          </div>
                          Exclusão
                        </DialogTitle>
                        <DialogDescription className="font-normal text-base">
                          {`Você realmente deseja remover este membro ${user.name}  da residência?`}
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter>
                        <div className="flex flex-row w-full gap-2 sm:max-w-[425px] justify-between">
                          <div className="w-full">
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="h-[40px]  w-full font-semibold bg-[#28282b] text-white"
                              >
                                Cancelar
                              </Button>
                            </DialogClose>
                          </div>
                          <div className="w-full">
                            <DialogClose asChild>
                              <Button
                                onClick={() => handleConfirmDelete(userId)}
                                className="h-[40px] w-full font-semibold bg-[#FF204E]"
                              >
                                Confirmar
                              </Button>
                            </DialogClose>
                          </div>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
