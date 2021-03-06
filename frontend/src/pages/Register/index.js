import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import RegisterSuccess from '../RegisterSuccess';

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function Register() {
  const [successRegistration, setSuccessRegistration] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const [ong_key, setOngKey] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', data);
      setOngKey(response.data.id);
      setSuccessRegistration(true);
    } catch (error) {
      setSuccessRegistration(false);
      alert('Não foi possível fazer seu cadastro.');
    }
  }

  if (successRegistration) {
    return (
      <RegisterSuccess>
        {ong_key}
      </RegisterSuccess>
    );
  } else {
    return (
      <div className="register-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero" />
            <h1> Cadastro </h1> <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG. </p>
            <Link to="/" className="svg-link">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar para o logon
            </Link>
          </section>
          <form onSubmit={handleRegister}>
            <input
              placeholder="Nome da ONG"
              value={name}
              required
              onChange={e => setName(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="E-mail" 
              value={email} 
              required
              onChange={e => setEmail(e.target.value)}
            />
            <input 
              type="tel" 
              placeholder="Whatsapp"
              value={whatsapp} 
              required
              onChange={e => setWhatsapp(e.target.value)}
            />
            <div className="input-group">
              <input 
                placeholder="Cidade" 
                value={city}
                required
                onChange={e => setCity(e.target.value)}
              />
              <input
                value={uf}
                placeholder="UF"
                onChange={e => setUf(e.target.value)}
                required
                style={{
                    width: 80
                  }}
              />
            </div>
            <button className="button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}
