--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: topics; Type: TABLE; Schema: public; Owner: umair
--

CREATE TABLE public.topics (
    id character varying(255) NOT NULL,
    topic character varying(255) NOT NULL,
    duration numeric NOT NULL,
    link character varying(255) NOT NULL,
    status boolean NOT NULL
);


--
-- Data for Name: topics; Type: TABLE DATA; Schema: public; Owner: umair
--

COPY public.topics (id, topic, duration, link, status) FROM stdin;
oCI71kuriNacBZpK-1lDs	DOM Manipulation	443	https://go3223ogle.com	f
1	Basis	721	https://go0ogle.com	t
r1UgbF_79tw_k0e3gP8vF	AJAXJ	444	https://goowwgle.com	t
2	Arrayssss	444	https://gLogle.com	t
4Lc2sGa7SsdhsPP7HDA_B	Objects	344	https://google.com	f
2WKkvnM3wahXN16XR8tMN	dsfdsfg	144	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter	f
\.


--
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: umair
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

