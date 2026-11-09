insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists product_images_read_public on storage.objects;
create policy product_images_read_public on storage.objects
for select using (bucket_id = 'product-images');

drop policy if exists product_images_upload_admin on storage.objects;
create policy product_images_upload_admin on storage.objects
for insert to authenticated with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists product_images_delete_admin on storage.objects;
create policy product_images_delete_admin on storage.objects
for delete to authenticated using (bucket_id = 'product-images' and public.is_admin());