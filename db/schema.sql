drop table if exists votes;
drop table if exists candidates;
drop table if exists parties;
drop table if exists voters;

create table parties(
    id integer auto_increment primary key,
    name varchar(50) not null,
    description text
);

CREATE TABLE candidates (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
party_id integer,
industry_connected BOOLEAN NOT NULL,
constraint fk_party foreign key (party_id) references parties(id) on delete set null
);

create table voters (
    id integer auto_increment primary key,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    email varchar(50) not NULL,
    create_at datetime default current_timestamp
);

create table votes(
    id integer auto_increment primary key,
    voter_id integer not null,
    candidate_id integer not null,
    create_at datetime default current_timestamp,
    constraint uc_voter unique(voter_id),
    constraint fk_voter foreign key(voter_id) references voters(id) on delete cascade,
    constraint fk_candidate foreign key(candidate_id) references candidates(id) on delete cascade
);