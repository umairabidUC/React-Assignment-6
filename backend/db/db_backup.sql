PGDMP  $                    |            topicsdb    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16408    topicsdb    DATABASE     ~   CREATE DATABASE topicsdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Pakistan.1252';
    DROP DATABASE topicsdb;
                umair    false            �            1259    16409    topics    TABLE     �   CREATE TABLE public.topics (
    id character varying(255) NOT NULL,
    topic character varying(255) NOT NULL,
    duration numeric NOT NULL,
    link character varying(255) NOT NULL,
    status boolean NOT NULL
);
    DROP TABLE public.topics;
       public         heap    umair    false            �          0    16409    topics 
   TABLE DATA                 public          umair    false    215   W                  2606    16415    topics topics_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.topics DROP CONSTRAINT topics_pkey;
       public            umair    false    215            �   �   x����O�0������nk��'�M��l�x!�V�kӖ�{�N#�p{�|�����$���A��S ۲�lb��L�w?��sp�B�
��\�� ط�1R?L������&L��7����щ�#�E�J�_��<��Bz1C���\mu����/�I����C��O��V��S�^�&�p7LW`E�\�5\���@�£�
n�rQ�{��Y����8�p�,�ps��Ӻ��q� '�Y     