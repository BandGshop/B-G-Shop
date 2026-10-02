-- A executer une seule fois dans Supabase SQL Editor.
-- Supprime les articles actuellement presents afin de repartir avec un catalogue vide.
-- Les anciennes lignes de commande sont conservees; leur product_id devient NULL.

delete from public.products;