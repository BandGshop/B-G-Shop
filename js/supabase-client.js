/* Supabase browser client. Replace both values with your project settings. */
window.bgSupabaseConfig = {
  url: 'https://jnhlulosivgmekowkndv.supabase.co',
  anonKey: 'sb_publishable_6ysxfhQvacphBssvulYOMg_3nNDqBxE'
};

window.bgSupabase = {
  client: null,
  isConfigured() {
    return Boolean(
      window.supabase &&
      window.bgSupabaseConfig.url.startsWith('https://') &&
      !window.bgSupabaseConfig.url.includes('YOUR_PROJECT_REF') &&
      window.bgSupabaseConfig.anonKey &&
      !window.bgSupabaseConfig.anonKey.includes('YOUR_SUPABASE_ANON_KEY')
    );
  },
  getClient() {
    if (!this.isConfigured()) return null;
    if (!this.client) {
      this.client = window.supabase.createClient(
        window.bgSupabaseConfig.url,
        window.bgSupabaseConfig.anonKey
      );
    }
    return this.client;
  }
};
