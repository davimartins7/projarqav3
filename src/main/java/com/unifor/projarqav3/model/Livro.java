package com.unifor.projarqav3.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Livro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String autor;
    private Integer ano;
    private String genero;

    // --- CORREÇÃO AQUI ---
    @Column(name = "quantidade_total")
    private Integer quantidadeTotal;

    @Column(name = "quantidade_disponivel")
    private Integer quantidadeDisponivel;
    // ---------------------
}