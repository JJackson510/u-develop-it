drop table if exists candidates;
drop table if exists parties;

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