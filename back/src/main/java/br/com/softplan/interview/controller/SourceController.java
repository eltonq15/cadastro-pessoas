package br.com.softplan.interview.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/source")
public class SourceController {

    @GetMapping("")
    public String retornarLinkGithub() {
        return "https://github.com/eltonq15/cadastro-pessoas.git";
    }
}