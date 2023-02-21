import { createContext, useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

import { UserTechContext } from "./UserTechContext";
import { ModalTechContext } from "./ModalTechContext";

export const UserTechAddContext = createContext({});

export const UserTechAddProvider = ({ children }) => {
  const { setShowModalAdd } = useContext(ModalTechContext);
  const { renderTech, setRenderTech } = useContext(UserTechContext);

  const { techID, setTechID } = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [user, setUser] = useState("");

  const createTechProfile = async (data) => {
    const token = JSON.parse(localStorage.getItem("@HubKenzieToken"));
    console.log(data);
    try {
      const response = await api.post("users/techs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRenderTech([...renderTech, response.data]);
      setShowModalAdd(false);
      toast.success(
        `A Categoria ${response.data.title} foi cadastrada com sucesso`
      );
    } catch (error) {
      console.log(error);

      toast.error("Algo deu errado");
    }
  };

  const editTechProfile = async (data, id) => {
    const token = JSON.parse(localStorage.getItem("@HubKenzieToken"));
    console.log(data);
    try {
      const response = await api.put(`/users/techs/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newTech = renderTech.map((tech) => {
        if (id === tech.id) {
          return { ...renderTech, ...data };
        } else {
          return renderTech;
        }
      });

      setRenderTech(newTech);
      setShowModalAdd(false);
      toast.success(
        `A Categoria ${response.data.title} foi editada com sucesso`
      );
    } catch (error) {
      console.log(error);

      toast.error("Algo deu errado");
    }
  };

  const deleteTechProfile = async (id) => {
    const token = JSON.parse(localStorage.getItem("@HubKenzieToken"));
    // console.log(data);
    try {
      const response = await api.delete(`/users/techs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRenderTech(renderTech.filter((tech) => tech.id !== id));
      setShowModalAdd(false);
      toast.success(
        `A Categoria ${response.data.title} foi deletada com sucesso`
      );
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado");
    }
  };

  return (
    <UserTechAddContext.Provider
      value={{
        createTechProfile,
        editTechProfile,
        deleteTechProfile,
        renderTech,
        setRenderTech,
        techID,
        setTechID,
      }}
    >
      {children}
    </UserTechAddContext.Provider>
  );
};
