-- SQLBook: Code
CREATE DATABASE IF NOT EXISTS kritique;
USE kritique;

CREATE TABLE usuarios (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(100),
    email VARCHAR(256),
    senha VARCHAR(100)
);

CREATE TABLE albuns (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    artista VARCHAR(100),
    link VARCHAR(300)
);

CREATE TABLE filmes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    diretor VARCHAR(100),
    link VARCHAR(300)
);

CREATE TABLE notas_albuns (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    album_id INT NOT NULL,
    usuario_id INT NOT NULL,
    nota INT CHECK(nota BETWEEN 0 AND 100),
    FOREIGN KEY (album_id) REFERENCES albuns(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE notas_filmes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    filme_id INT NOT NULL,
    usuario_id INT NOT NULL,
    nota INT CHECK(nota BETWEEN 0 AND 100),
    FOREIGN KEY (filme_id) REFERENCES filmes(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT INTO albuns (nome, artista, link) 
VALUES 
    ('Lungs', 'Florence + the Machine', "../LUNGS/index.html"),
    ('Favourite Worst Nightmare', 'Arctic Monkeys', "../FWN/index.html"),
    ('Pure Heroine', 'Lorde', '../PURE HEROINE/index.html');

INSERT INTO filmes (nome, diretor, link) 
VALUES 
    ('Mamma Mia', 'Phyllida Lloyd', '../MAMMA MIA/index.html'),
    ('La La Land', 'Damien Chazelle', '../LALAND/index.html'),
    ('Before Sunrise', 'Richard Linklater', '../BEFORE SUNRISE/index.html');