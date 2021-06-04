-- Table: public.asteroid

-- DROP TABLE public.asteroid;

CREATE TABLE public.asteroid
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 2147483647 CACHE 1 ),
    reference_id text COLLATE pg_catalog."default",
    name text COLLATE pg_catalog."default",
    is_potentially_hazardous boolean,
    date date,
    CONSTRAINT asteroid_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.asteroid
    OWNER to postgres;