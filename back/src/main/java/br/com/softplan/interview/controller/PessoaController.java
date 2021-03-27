package br.com.softplan.interview.controller;

import br.com.softplan.interview.controller.dto.PessoaRq;
import br.com.softplan.interview.controller.dto.PessoaRs;
import br.com.softplan.interview.model.Pessoa;
import br.com.softplan.interview.repository.PessoaRepository;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/pessoa")
public class PessoaController {

    @Inject
     private PessoaRepository pessoaRepository;

    public PessoaController(PessoaRepository pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }

    @GetMapping("")
    public List<PessoaRs> listarTodos() {
        List<Pessoa> pessoas = pessoaRepository.findAll();
        return pessoas.stream().map(PessoaRs::converterParaDto).collect(Collectors.toList());

    }

    @GetMapping("/{id}")
    public PessoaRs consultarPorId (@PathVariable("id") Long id) throws Exception {
        try {
            Pessoa pessoa = pessoaRepository.getOne(id);
            return PessoaRs.converterParaDto(pessoa);
        } catch (Exception e) {
            throw new Exception("Pessoa não encontrada!");
        }
    }

    @PostMapping("")
    public String cadastrarPessoa (@RequestBody PessoaRq pessoa) {
        try {
            Pessoa p = new Pessoa();
            p.setSexo(pessoa.getSexo());
            p.setEmail(pessoa.getEmail());
            p.setDataNascimento(pessoa.getDataNascimento());
            p.setNaturalidade(pessoa.getNaturalidade());
            p.setNacionalidade(pessoa.getNacionalidade());
            p.setCpf(pessoa.getCpf());
            p.setNome(pessoa.getNome());
            pessoaRepository.save(p);
            return "Pessoa cadastrada com sucesso!";
        } catch (Exception e) {
            return "Erro ao realizar cadastro...";
        }
    }

    @PutMapping("/{id}")
    public String alterarCadastro (@PathVariable("id") Long id, @RequestBody PessoaRq pessoa) throws Exception {
        Optional<Pessoa> p = pessoaRepository.findById(id);
        if(p.isPresent()) {
            Pessoa pessoaSave = p.get();
            pessoaSave.setNome(pessoa.getNome());
            pessoaSave.setCpf(pessoa.getCpf());
            pessoaSave.setNacionalidade(pessoa.getNacionalidade());
            pessoaSave.setNaturalidade(pessoa.getNaturalidade());
            pessoaSave.setSexo(pessoa.getSexo());
            pessoaSave.setEmail(pessoa.getEmail());
            pessoaSave.setDataNascimento((pessoa.getDataNascimento()));
            pessoaRepository.save(pessoaSave);
            return "Dados alterados com sucesso.";
        } else {
            return "Pessoa não encontrada!";
        }
    }

    @DeleteMapping("/{id}")
    public String ExcluirPorId (@PathVariable("id") Long id) throws Exception {
        try {
            pessoaRepository.deleteById(id);
            return "Cadastro excluído com sucesso.";
        } catch (Exception e) {
            return "Pessoa não encontrada!";
        }
    }
}
