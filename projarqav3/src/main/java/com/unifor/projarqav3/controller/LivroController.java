package com.unifor.projarqav3.controller;

import com.unifor.projarqav3.model.Livro;
import com.unifor.projarqav3.service.LivroService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/livros")
public class LivroController {

    private final LivroService livroService;

    public LivroController(LivroService livroService) {
        this.livroService = livroService;
    }

    @PostMapping
    public Livro adicionar(@RequestBody Livro livro) {
        return livroService.salvar(livro);
    }

    @GetMapping
    public List<Livro> listar() {
        return livroService.listar();
    }

    @GetMapping("/{id}")
    public Livro buscarPorId(@PathVariable Long id) {
        return livroService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        livroService.deletar(id);
    }
}
