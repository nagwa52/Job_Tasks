PGDMP     4                      {            restaurant2 %   12.13 (Ubuntu 12.13-0ubuntu0.20.04.1) %   12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)      �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17692    restaurant2    DATABASE     }   CREATE DATABASE restaurant2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_GB.UTF-8' LC_CTYPE = 'en_GB.UTF-8';
    DROP DATABASE restaurant2;
                postgres    false            �            1259    17916    reservations    TABLE     $  CREATE TABLE public.reservations (
    id integer NOT NULL,
    "resDate" date NOT NULL,
    "resTime" time without time zone NOT NULL,
    people integer NOT NULL,
    "tableId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public.reservations;
       public         heap    postgres    false            �            1259    17914    reservations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.reservations_id_seq;
       public          postgres    false    208            �           0    0    reservations_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;
          public          postgres    false    207            �            1259    17883    roles    TABLE     �   CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    17905    tables    TABLE       CREATE TABLE public.tables (
    id integer NOT NULL,
    "Number" integer,
    "NumberOfSeats" integer,
    "isOccupied" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.tables;
       public         heap    postgres    false            �            1259    17903    tables_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tables_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.tables_id_seq;
       public          postgres    false    206            �           0    0    tables_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.tables_id_seq OWNED BY public.tables.id;
          public          postgres    false    205            �            1259    17890    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    "employeeNumber" integer,
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "RoleId" integer
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    17888    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    204            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    203            #           2604    17919    reservations id    DEFAULT     r   ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);
 >   ALTER TABLE public.reservations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    208    208            !           2604    17908 	   tables id    DEFAULT     f   ALTER TABLE ONLY public.tables ALTER COLUMN id SET DEFAULT nextval('public.tables_id_seq'::regclass);
 8   ALTER TABLE public.tables ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    206    206                        2604    17893    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    203    204            �          0    17916    reservations 
   TABLE DATA           m   COPY public.reservations (id, "resDate", "resTime", people, "tableId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    208   �$       �          0    17883    roles 
   TABLE DATA           C   COPY public.roles (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    202   �$       �          0    17905    tables 
   TABLE DATA           g   COPY public.tables (id, "Number", "NumberOfSeats", "isOccupied", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    206   %       �          0    17890    users 
   TABLE DATA           c   COPY public.users (id, "employeeNumber", password, "createdAt", "updatedAt", "RoleId") FROM stdin;
    public          postgres    false    204   $%       �           0    0    reservations_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.reservations_id_seq', 1, false);
          public          postgres    false    207            �           0    0    tables_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.tables_id_seq', 1, false);
          public          postgres    false    205            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    203            /           2606    17921    reservations reservations_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.reservations DROP CONSTRAINT reservations_pkey;
       public            postgres    false    208            %           2606    17887    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    202            +           2606    17913    tables tables_Number_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.tables
    ADD CONSTRAINT "tables_Number_key" UNIQUE ("Number");
 D   ALTER TABLE ONLY public.tables DROP CONSTRAINT "tables_Number_key";
       public            postgres    false    206            -           2606    17911    tables tables_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.tables
    ADD CONSTRAINT tables_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.tables DROP CONSTRAINT tables_pkey;
       public            postgres    false    206            '           2606    17897    users users_employeeNumber_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_employeeNumber_key" UNIQUE ("employeeNumber");
 J   ALTER TABLE ONLY public.users DROP CONSTRAINT "users_employeeNumber_key";
       public            postgres    false    204            )           2606    17895    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    204            1           2606    17922 &   reservations reservations_tableId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT "reservations_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES public.tables(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.reservations DROP CONSTRAINT "reservations_tableId_fkey";
       public          postgres    false    206    2861    208            0           2606    17898    users users_RoleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public.users DROP CONSTRAINT "users_RoleId_fkey";
       public          postgres    false    204    202    2853            �      x������ � �      �   D   x�3�LL����4202�50�52R02�26�20�360�60�#�eę�[��_���C�n@R\1z\\\ :|�      �      x������ � �      �      x������ � �     