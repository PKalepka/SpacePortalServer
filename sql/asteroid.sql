-- Table: public.asteroid

-- DROP TABLE public.asteroid;

CREATE TABLE public.asteroid
(
    id integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    date text COLLATE pg_catalog."default" NOT NULL,
    is_potentially_hazardous boolean NOT NULL,
    CONSTRAINT asteroid_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.asteroid
    OWNER to postgres;