import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Instructions() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState("paper");

    const abrirModalNoPrimeiroAcessoApenas = () => {
        if (localStorage.getItem("dialog-seen") === null || localStorage.getItem("dialog-seen") === false) {
            setOpen(true);
            localStorage.setItem("dialog-seen", true);
        }
    }

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => abrirModalNoPrimeiroAcessoApenas(), []);

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Button onClick={handleClickOpen("paper")}>Instruções de uso</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">INSTRUÇÕES DE USO DO SOFTWARE</DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {[...new Array(1)]
                            .map(
                                () => `
                    1 - DESCRIÇÃO: Este software pode ser utilizado para gravar cadastros de pessoas, 
                    bem como excluir, editar, e consultar estes registros posteriormente, gravando os 
                    dados em um banco de dados MySQL disponível em nuvem. ${"///".repeat(40)} 2 - COMO USAR: Após realizar o login, uma consulta é
                    feita no banco, e caso existam registros de pessoas, estes dados serão carregados na área verde,
                    do lado direito da tela. Caso não seja listado, nenhum registro, é possível realizar novos cadastros.
                    Primeiramente deve-se selecionar uma das três opções no canto superior direito (CRIAR, EDITAR ou EXCLUIR). ${"///".repeat(40)} 2.1 - 
                    CRIAR: Selecione a opção criar. Com este botão selecionado, todos os campos ficarão habilitados, com exceção do ID, e todos,
                    com exceção do email, são obrigatórios. Ao preencher os dados corretamente, o botão CRIAR ficará habilitado pra clique. 
                    Observando que se o CPF já estiver cadastrado no banco, este botão também ficará desabilitado. ${"///".repeat(40)} 2.2 - EDITAR: 
                    Aplicam-se a esta opção as mesmas descritas no item 2.1, acrescentando-se que agora o campo ID fica habilitado para inserção. Deve-se colocar
                    neste campo o ID do registro (pode ser encontrado na tabela). Obervando que se o ID não constar na tabela, o botão EDITAR
                    permanece DESABILITADO. ${"///".repeat(40)} 2.3 - EXCLUIR: Nesta opção, todos os campos ficam desabilitados, com exceção
                    do id, que é o único parâmetro necessário para exclusão. Obervando que se o ID não constar na tabela, o botão EXCLUIR
                    permanece DESABILITADO. ${"///".repeat(40)} 3 - APIs: Foi criado no back o CRUD básico, disponibilizando as seguintes rotas e endpoints:
                    ${"///".repeat(40)} 3.1 - LISTAR: Para listar os registros, deve-se utilizar o endpoint "/pessoa", a listagem não é paginada, e nem filtrada 
                    (por enquanto). Exemplo de uso: GET http://localhost:8080/pessoa ${"///".repeat(40)}
                    3.2 - INSERIR: Para cadastrar um novo registro, deve-se utilizar o mesmo endpoint "/pessoa", porém utilizando-se o método POST,
                    e caso a requisição seja chamada no Software Postman ou similar, deve-se preencher o json no body, com os mesmos campos informados neste
                    formulário do front. Exemplo de uso: POST http://localhost:8080/pessoa (preencher json no body da requisição!). ${"///".repeat(40)}
                    3.3 - ALTERAR: Para alterar algum dado cadastral de algum registro, deve-se utilizar o mesmo endpoint do item 3.2, concatenando-se
                    o ID do cadastro que será alterado, alterando-se o dado desejado dentro do json, no body da requisição, e também alterando-se o método
                    pra PUT. Exemplo de uso: PUT http://localhost:8080/pessoa/1 (Alterar dado no json, no body da requisição!) ${"///".repeat(40)}
                    3.4 - DELETAR: Para deletar um registro do banco, utiliza-se a mesma rota do item 3.3, alterando-se o método para DELETE, informando
                    também o ID do registro, e não há a necessidade de envio de JSON. Exemplo de uso: DELETE http://localhost:8080/pessoa/1.
            
                `
                            )
                            .join("\n")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Fechar
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
