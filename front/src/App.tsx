import React, { useEffect, useState } from 'react';
import logo from './images/people.png';
import CountrySelect from './components/CountrySelect';
import './App.css';
import RadioButtonsGroup from './components/RadioButtonsGroup';
import { Button, Grid, TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';
import ReactVirtualizedTable from './components/ReactVirtualizedTable'
import SaveIcon from '@material-ui/icons/Save';
import moment from "moment";
import RadioButtonCriarAlterar from './components/RadioButtonCriarAlterar';
import Instructions from './components/Instructions';


function App() {

  const [nome, setNome] = useState<string>();
  const [sexo, setSexo] = useState<string>("masculino");
  const [email, setEmail] = useState<string>();
  const [dataNascimento, setDataNascimento] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [naturalidade, setNaturalidade] = useState<string>();
  const [nacionalidade, setNacionalidade] = useState<string>();
  const [cpf, setCpf] = useState<string>();
  const [user, setUser] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [authMessage, setAuthMessage] = useState<string>("");
  const [modo, setModo] = useState<string>("criar");
  const [idPessoa, setIdPessoa] = useState<number>();
  const [buttonText, setButtonText] = useState<string>("CADASTRAR");
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [registros, setRegistros] = useState([]);


  function handleLogout() {
    localStorage.removeItem('aut.user');
    updatePage();
  }

  function validarCampos() {
    switch (modo) {
      case "criar":
        if (nome !== "" && nome !== undefined &&
          cpf !== "" && cpf !== undefined && cpf?.toString()?.replaceAll("_", "").replaceAll(".", "").replace("-", "").length === 11 && registros?.filter((reg: any) => reg.cpf === cpf).length === 0 &&
          naturalidade !== "" && naturalidade !== undefined &&
          nacionalidade !== "" && nacionalidade !== undefined) {
          setButtonEnabled(true);
          if (email !== undefined && email != "" && (!email.includes("@") || !email.includes("."))) {
            setButtonEnabled(false);
          }
        } else {
          setButtonEnabled(false);
        }
        break;
      case "editar":
        if (nome !== "" && nome !== undefined &&
          cpf !== "" && cpf?.replaceAll("_", "").replaceAll(".", "").replace("-", "").length === 11 && registros?.filter((reg: any) => reg.cpf === cpf).length === 0 &&
          naturalidade !== "" && naturalidade !== undefined &&
          nacionalidade !== "" && nacionalidade !== undefined &&
          (idPessoa && idPessoa > 0 && registros?.filter((reg: any) => reg.id == idPessoa).length > 0)) {
          setButtonEnabled(true);
        } else {
          setButtonEnabled(false);
        }
        break;
      case "excluir":
        if (idPessoa && idPessoa > 0 && registros?.filter((reg: any) => reg.id == idPessoa).length > 0) {
          setButtonEnabled(true);
        } else {
          setButtonEnabled(false);
        }
        break;
      default:
        setButtonEnabled(false);
    }
  }

  function updatePage() {
    window.location.href = window.location.pathname + window.location.search + window.location.hash;
  }

  useEffect(() => {
    if (localStorage.getItem("aut.user") !== undefined && localStorage.getItem("aut.user") === "ZWx0b246MTIzNDU=")
      window.document.body.style.zoom = '0.8';
  }, []);

  useEffect(() => {
    validarCampos();
  }, [idPessoa, nome, email, cpf, naturalidade, nacionalidade, modo, registros]);

  const alterarId = (event: any) => setIdPessoa(event.target.value);
  const alterarModo = (textoModo: string) => {
    setButtonText(textoModo);
    setModo(textoModo);
  }
  const alterarNome = (event: any) => setNome(event.target.value);
  const alterarEmail = (event: any) => setEmail(event.target.value);
  const alterarCpf = (event: any) => setCpf(event.target.value);
  const alterarNaturalidade = (event: any) => setNaturalidade(event.target.value);
  const alterarUsuario = (event: any) => setUser(event.target.value);
  const alterarSenha = (event: any) => setPassword(event.target.value);

  function enterKey(event: any) {
    if (event.key === 'Enter') {
      fazerLogin();
    }
  }

  function criarObjetoPessoa() {
    let newCadastroObj = {
      nome: nome,
      email: email,
      cpf: cpf,
      naturalidade: naturalidade,
      nacionalidade: nacionalidade,
      dataNascimento: dataNascimento,
      sexo: sexo
    }
    return newCadastroObj
  }

  const persistirPessoa = () => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let reqBody = JSON.stringify(criarObjetoPessoa());

    fetch(`http://localhost:8080/pessoa/${modo === "criar" ? "" : idPessoa}`, {
      method: modo === "criar" ? "POST" : (modo === "editar" ? "PUT" : "DELETE"),
      body: buttonText !== "excluir" ? reqBody : "",
      headers: myHeaders
    })
      .then(function (response) {
        window.location.href = window.location.pathname + window.location.search + window.location.hash;
      })
      .catch(function (err) {
        console.error(err);
      });


  }

  const fazerLogin = () => {
    if (btoa(user + ":" + password) === "ZWx0b246MTIzNDU=") {
      localStorage.setItem("aut.user", "ZWx0b246MTIzNDU=");
      updatePage();
    }
    else {
      setAuthMessage("Falha na autenticação, tente novamente");
      setPassword("");
    }
  }

  return (

    localStorage.getItem("aut.user") !== undefined && localStorage.getItem("aut.user") === "ZWx0b246MTIzNDU=" ? (
      <div className="App">
        <header className="App-header  anim-typewriter line-1">
          <svg height="34" width="34" className="linkedin">
            <path d="M34,2.5v29A2.5,2.5,0,0,1,31.5,34H2.5A2.5,2.5,0,0,1,0,31.5V2.5A2.5,2.5,0,0,1,2.5,0h29A2.5,2.5,0,0,1,34,2.5ZM10,13H5V29h5Zm.45-5.5A2.88,2.88,0,0,0,7.59,4.6H7.5a2.9,2.9,0,0,0,0,5.8h0a2.88,2.88,0,0,0,2.95-2.81ZM29,19.28c0-4.81-3.06-6.68-6.1-6.68a5.7,5.7,0,0,0-5.06,2.58H17.7V13H13V29h5V20.49a3.32,3.32,0,0,1,3-3.58h.19c1.59,0,2.77,1,2.77,3.52V29h5Z" fill="currentColor"></path>
          </svg>
          <a className="name" href="https://www.linkedin.com/in/elton-alves-ribeiro/" target="_blank" rel="noreferrer">Elton Alves Ribeiro</a>
          <button type="button" className="logout-button" onClick={handleLogout}>Lougout</button>
          <img src={logo} className="App-logo" alt="logo" />
          <h3>
            Cadastro de pessoas
        </h3>
        </header>
        <div className="container">
          <section className="cadastro-section">
            <div>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <form noValidate autoComplete="off">
                    <RadioButtonCriarAlterar changeRadio={(e: any) => alterarModo(e.target.value)} />
                  </form>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <form noValidate autoComplete="off">
                    <TextField className="text-field" disabled={modo === "criar"} value={idPessoa} onChange={alterarId} id="outlined-basic" autoComplete="off" label="ID" variant="outlined" />
                  </form>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <form noValidate autoComplete="off">
                    <TextField className="text-field" disabled={modo === "excluir"} value={nome} onChange={alterarNome} id="outlined-basic" autoComplete="off" label="Nome" variant="outlined" />
                  </form>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField className="text-field" disabled={modo === "excluir"} value={email} onChange={alterarEmail} id="outlined-basic" autoComplete="off" label="E-mail" variant="outlined" type="email" />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <InputMask
                    mask="999.999.999-99"
                    value={cpf}
                    disabled={modo === "excluir"}
                    onChange={alterarCpf}
                  >
                    {(props2: any) =>
                      <TextField className="text-field" disabled={props2.disabled} value={cpf} autoComplete="off" id="outlined-basic" label="CPF" variant="outlined" />
                    }
                  </InputMask>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField className="text-field" disabled={modo === "excluir"} value={naturalidade} onChange={alterarNaturalidade} id="outlined-basic" autoComplete="off" label="Naturalidade (cidade)" variant="outlined" />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <form noValidate autoComplete="off">
                    <CountrySelect value={nacionalidade} autoComplete={false} disabled={modo === "excluir"} onChange={(e: any) => setNacionalidade(e.target.textContent.toString().trim().substring(4))} />
                  </form>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <form noValidate autoComplete="off">
                    <TextField
                      disabled={modo === "excluir"}
                      type="date"
                      label="Data de nascimento"
                      name="dataInicial"
                      value={dataNascimento}
                      onChange={(e) => setDataNascimento(e.target.value)}
                      required
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </form>
                </Grid>
              </Grid>

              <div style={{ padding: '20px' }}></div>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <form noValidate autoComplete="off">
                    <RadioButtonsGroup disabled={modo === "excluir"} value={sexo} changeValue={(value: any) => setSexo(value)} />
                  </form>
                </Grid>

              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    disabled={!buttonEnabled}
                    color={buttonText === "criar" ? "primary" : buttonText === "excluir" ? "secondary" : "default"}
                    size="large"
                    className="text-field"
                    startIcon={<SaveIcon />}
                    onClick={() => persistirPessoa()}
                  >
                    {buttonText}
                  </Button>
                </Grid>
              </Grid>
            </div>

          </section>
          <section className="table-section">
            <ReactVirtualizedTable preencherDados={(registros: any) => setRegistros(registros)} />
          </section>
        </div>
        <Instructions />

      </div>) : (
        <div className="login-page">
          <div className="login-card">
            <div>LOGIN SOFTPLAN</div>
            <input type="text" onKeyPress={enterKey} id="login" name="login" value={user} placeholder="usuário" onChange={alterarUsuario} />
            <input type="password" onKeyPress={enterKey} id="senha" name="senha" value={password} placeholder="senha" onChange={alterarSenha} />
            <div />
            <button onClick={() => fazerLogin()}>Acessar</button>
            <p>{authMessage}</p>
          </div>
        </div>

      ))
}

export default App;
