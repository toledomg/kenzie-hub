import React from "react";
import { HomeSection } from "./style";
import FormLogin from "../../components/Main/Form/FormLogin";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function Home() {
  const navigate = useNavigate();

  const CadPage = () => navigate("/cadastro");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitFunction = async (data) => {
    console.log(data);

    try {
      const response = await api.post("sessions", data);
      console.log(response);
      toast.success("Login realizado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Algo deu errado");
    }
  };

  return (
    <HomeSection>
      <h1>Kenzie Hub</h1>
      <div>
        <h1>Login</h1>
        <FormLogin onSubmit={handleSubmit(onSubmitFunction)} />
        <div>
          <span>Ainda não possui uma conta?</span>
          <Link to="/cadastro">Cadastre-se</Link>
        </div>
      </div>
    </HomeSection>
  );
}

export default Home;
