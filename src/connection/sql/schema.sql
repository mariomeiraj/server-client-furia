-- create database central_furia

drop table if exists apostas_de_usuarios;
drop table if exists apostas_abertas;
drop table if exists jogos;
drop table if exists usuarios;

create table usuarios(
  id serial primary key,
  nome text not null,
  nick text not null unique,
  email text not null unique,
  senha text not null,
  pontos int default 500,
  jogador_favorito text,
  estado text,
  is_admin boolean default false
 );


create table torcidas(
  id serial primary key,
  nome_torcida text not null unique,
  tag_torcida text not null unique,
  descricao_torcida text,
  admin_torcida int not null references usuarios(id),
  logo_torcida text
);

create table membros_torcida(
  id serial primary key,
  id_torcida int not null references torcidas(id),
  id_membro int not null references usuarios(id),
  data_entrada date default now()
);


create table jogos(
  id serial primary key,
  time_1 text not null,
  time_2 text not null,
  logo_adversario text not null,
  modalidade text not null,
  data_jogo date default null,
  hora_jogo time default null
);


create table apostas_abertas(
  id serial primary key,
  id_jogo int not null references jogos(id),
  descricao text not null,
  opcao_1 text not null, 
  odd_1 float not null,
  opcao_2 text not null,
  odd_2 float not null
);

create table apostas_de_usuarios(
  id serial primary key,
  id_usuario int not null references usuarios(id),
  id_aposta_aberta int not null references apostas_abertas(id),
  pontos_apostado int not null,
  opcao text not null,
  odd float not null
);