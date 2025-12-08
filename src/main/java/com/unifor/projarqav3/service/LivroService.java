package com.unifor.projarqav3.service;

import com.unifor.projarqav3.model.Livro;
import com.unifor.projarqav3.repository.LivroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LivroService {

    private final LivroRepository livroRepository;

    public LivroService(LivroRepository livroRepository) {
        this.livroRepository = livroRepository;
    }

    public Livro salvar(Livro livro) {
        return livroRepository.save(livro);
    }

    public List<Livro> listar() {
        return livroRepository.findAll();
    }

    public Livro buscarPorId(Long id) {
        return livroRepository.findById(id).orElse(null);
    }

    public void deletar(Long id) {
        livroRepository.deleteById(id);
    }

    public Livro atualizar(Long id, Livro livroAtualizado) {
        Livro existente = livroRepository.findById(id).orElse(null);

        if (existente == null) {
            return null;
        }

        existente.setTitulo(livroAtualizado.getTitulo());
        existente.setAutor(livroAtualizado.getAutor());
        existente.setAno(livroAtualizado.getAno());
        existente.setGenero(livroAtualizado.getGenero());
        existente.setQuantidadeTotal(livroAtualizado.getQuantidadeTotal());
        existente.setQuantidadeDisponivel(livroAtualizado.getQuantidadeDisponivel());

        return livroRepository.save(existente);
    }



}
