package br.com.softplan.interview.controller.dto;

import br.com.softplan.interview.model.Pessoa;

import java.util.Date;

public class PessoaRs {
    private String nome;
    private String sexo;
    private String email;
    private Date dataNascimento;
    private String naturalidade;
    private String nacionalidade;
    private String cpf;
    private Long id;

    public static PessoaRs converterParaDto(Pessoa p) {
        PessoaRs pessoa = new PessoaRs();
        pessoa.setNome(p.getNome());
        pessoa.setSexo(p.getSexo());
        pessoa.setEmail(p.getEmail());
        pessoa.setDataNascimento(p.getDataNascimento());
        pessoa.setNaturalidade(p.getNaturalidade());
        pessoa.setNacionalidade(p.getNacionalidade());
        pessoa.setCpf(p.getCpf());
        pessoa.setId(p.getId());


        return pessoa;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getNaturalidade() {
        return naturalidade;
    }

    public void setNaturalidade(String naturalidade) {
        this.naturalidade = naturalidade;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

}
