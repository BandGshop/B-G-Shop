// ===== SYSTEM DATA MANAGEMENT =====
const app = {
  // Initialize app data
  init() {
    this.ensureDefaultData();
    this.checkAuth();
    return this.hydrateFromSupabase();
  },

  async hydrateFromSupabase() {
    const client = window.bgSupabase?.getClient();
    if (!client) return;
    const { data: sessionData } = await client.auth.getSession();
    if (sessionData.session?.user) {
      const authUser = sessionData.session.user;
      const { data: profile } = await client.from('profiles').select('*').eq('id', authUser.id).maybeSingle();
      localStorage.setItem('bgshop_currentUser', JSON.stringify(profile || {
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata?.name || authUser.email?.split('@')[0],
        role: 'user'
      }));
    }
    await this.syncProductsFromSupabase();

    const { data: orders } = await client.from('orders').select('*, order_items(*)').order('created_at', { ascending: false });
    if (orders) localStorage.setItem('bgshop_orders', JSON.stringify(orders.map((order) => ({
      id: order.id,
      userId: order.customer_id,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address,
      status: order.status,
      createdDate: order.created_at,
      productId: order.order_items?.[0]?.product_id,
      productTitle: order.order_items?.[0]?.product_title,
      productPrice: order.order_items?.[0]?.product_price,
      paymentMethod: order.payment_method,
      paymentProof: order.payment_proof
    }))));

    const [{ data: messages }, { data: profiles }] = await Promise.all([
      client.from('messages').select('*').order('created_at', { ascending: true }),
      client.from('profiles').select('id, email, name, role')
    ]);
    if (messages) localStorage.setItem('bgshop_messages', JSON.stringify(messages.map((message) => ({
      id: message.id,
      userId: message.user_id,
      userEmail: profiles?.find((profile) => profile.id === message.user_id)?.email || message.user_id,
      sender: profiles?.find((profile) => profile.id === message.sender_id)?.role === 'admin'
        ? 'admin'
        : profiles?.find((profile) => profile.id === message.sender_id)?.email || message.sender_id,
      receiver: message.receiver_role === 'admin' ? 'admin' : profiles?.find((profile) => profile.id === message.user_id)?.email || message.user_id,
      text: message.text,
      isReadByAdmin: message.is_read_by_admin,
      isReadByUser: message.is_read_by_user,
      createdDate: message.created_at
    }))));

    const [{ data: videos }, { data: adLinks }] = await Promise.all([
      client.from('videos').select('*').order('created_at', { ascending: false }),
      client.from('ad_videos').select('video_id, position').order('position', { ascending: true })
    ]);
    if (videos) {
      const adVideoIds = new Set((adLinks || []).map((link) => link.video_id));
      const contentVideos = videos.filter((video) => !adVideoIds.has(video.id));
      const videoIds = contentVideos.map((video) => video.id);
      const [{ data: views }, { data: likes }, { data: comments }, { data: favorites }] = await Promise.all([
        client.from('video_views').select('*').in('video_id', videoIds),
        client.from('video_likes').select('*').in('video_id', videoIds),
        client.from('video_comments').select('*').in('video_id', videoIds),
        client.from('video_favorites').select('*').in('video_id', videoIds)
      ]);
      localStorage.setItem('bgshop_videos', JSON.stringify(contentVideos.map((video) => ({
        id: video.id,
        title: video.title,
        description: video.description,
        videoUrl: video.video_url,
        postedDate: video.created_at,
        views: (views || []).filter((item) => item.video_id === video.id).map((item) => ({ userId: item.user_id, date: item.created_at })),
        likes: (likes || []).filter((item) => item.video_id === video.id).map((item) => ({ userId: item.user_id, date: item.created_at })),
        comments: (comments || []).filter((item) => item.video_id === video.id).map((item) => ({ id: item.id, userId: item.user_id, text: item.text, date: item.created_at }))
      }))));
      localStorage.setItem('bgshop_ad_videos', JSON.stringify((adLinks || []).map((link) => {
        const video = videos.find((item) => item.id === link.video_id);
        return video ? {
          id: video.id,
          title: video.title,
          description: video.description,
          videoUrl: video.video_url,
          postedDate: video.created_at,
          position: link.position
        } : null;
      }).filter(Boolean)));
      localStorage.setItem('bgshop_favorites_remote', JSON.stringify(favorites || []));
    }

    const { data: notifications } = await client.from('notifications').select('*').order('created_at', { ascending: false });
    if (notifications) localStorage.setItem('bgshop_notifications', JSON.stringify(notifications.map((item) => ({ ...item, createdDate: item.created_at }))));
    const user = this.checkAuth();
    if (user?.id) {
      const [{ data: settings }, { data: cartItems }, { data: collections }] = await Promise.all([
        client.from('user_settings').select('*').eq('user_id', user.id).maybeSingle(),
        client.from('cart_items').select('product_id').eq('cart_id', user.id),
        client.from('product_collections').select('product_id, collection').eq('user_id', user.id)
      ]);
      if (settings) {
        localStorage.setItem(`bgshop_settings_${user.email}`, JSON.stringify({
          language: settings.language,
          siteBackground: settings.site_background,
          messageBackground: settings.message_background
        }));
      }
      if (cartItems) localStorage.setItem('bgshop_cart', JSON.stringify(cartItems.map((item) => item.product_id)));
      if (collections) {
        for (const key of ['liked', 'favorites']) {
          localStorage.setItem(`bgshop_product_${key}_${user.email}`, JSON.stringify(collections.filter((item) => item.collection === key).map((item) => item.product_id)));
        }
      }
    }
    window.dispatchEvent(new CustomEvent('bgshop-data-synced'));
  },

  async syncProductsFromSupabase() {
    const client = window.bgSupabase?.getClient();
    if (!client) return;
    const [{ data, error }, { data: productViews }] = await Promise.all([
      client
      .from('products')
      .select('*')
      .order('created_at', { ascending: false }),
      client.from('product_views').select('product_id, user_id, created_at')
    ]);
    if (error || !data) {
      console.error('Supabase produits indisponibles.', error?.message);
      return;
    }
    localStorage.setItem('bgshop_products', JSON.stringify(data.map((product) => ({
      ...product,
      postedDate: product.created_at,
      views: (productViews || []).filter((view) => view.product_id === product.id).map((view) => ({
        userId: view.user_id,
        date: view.created_at
      }))
    }))));
    window.dispatchEvent(new CustomEvent('bgshop-products-synced'));
  },

  // Ensure default data exists in localStorage
  ensureDefaultData() {
    const localUsers = JSON.parse(localStorage.getItem('bgshop_users') || '[]');
    localStorage.setItem('bgshop_users', JSON.stringify(localUsers.filter((user) => user.email !== 'admin@bgshop.com')));
    const currentUser = JSON.parse(localStorage.getItem('bgshop_currentUser') || 'null');
    if (currentUser?.email === 'admin@bgshop.com') localStorage.removeItem('bgshop_currentUser');

    if (localStorage.getItem('bgshop_products')) {
      const products = JSON.parse(localStorage.getItem('bgshop_products'));
      const demoProductTitles = new Set([
        'iPhone 15 Pro',
        'Chien Golden Retriever',
        'Robe de Soirée Noire',
        'Montre Rolex Submariner',
        'Toyota Corolla Location'
      ]);
      const legacyCategoryNames = {
        fashion: 'Vêtements',
        Fashion: 'Vêtements'
      };
      const normalizedProducts = products.filter((product) => !demoProductTitles.has(product.title)).map((product) => ({
        ...product,
        category: legacyCategoryNames[product.category] || product.category,
        views: Array.isArray(product.views) ? product.views : []
      }));
      localStorage.setItem('bgshop_products', JSON.stringify(normalizedProducts));
    }

    if (!localStorage.getItem('bgshop_orders')) {
      localStorage.setItem('bgshop_orders', JSON.stringify([]));
    }

    if (!localStorage.getItem('bgshop_messages')) {
      localStorage.setItem('bgshop_messages', JSON.stringify([]));
    }

    if (!localStorage.getItem('bgshop_videos')) {
      localStorage.setItem('bgshop_videos', JSON.stringify([]));
    }

    if (!localStorage.getItem('bgshop_notifications')) {
      localStorage.setItem('bgshop_notifications', JSON.stringify([]));
    }
    const videos = JSON.parse(localStorage.getItem('bgshop_videos') || '[]');
    const storedAds = JSON.parse(localStorage.getItem('bgshop_ad_videos') || '[]');
    if (storedAds.length && storedAds.every((ad) => typeof ad !== 'object')) {
      const adIds = new Set(storedAds);
      const legacyAds = videos.filter((video) => adIds.has(video.id));
      localStorage.setItem('bgshop_ad_videos', JSON.stringify(legacyAds));
      localStorage.setItem('bgshop_videos', JSON.stringify(videos.filter((video) => !adIds.has(video.id))));
    } else if (!localStorage.getItem('bgshop_ad_videos')) {
      localStorage.setItem('bgshop_ad_videos', JSON.stringify([]));
    }
  },

  // Authentication management
  checkAuth() {
    const user = localStorage.getItem('bgshop_currentUser');
    return user ? JSON.parse(user) : null;
  },

  async getAuthenticatedUser() {
    const client = window.bgSupabase?.getClient();
    if (!client) return this.checkAuth();
    const { data: sessionData, error: sessionError } = await client.auth.getSession();
    if (sessionError || !sessionData.session?.user) {
      localStorage.removeItem('bgshop_currentUser');
      return null;
    }
    const authUser = sessionData.session.user;
    const { data: profile, error: profileError } = await client
      .from('profiles')
      .select('id, email, name, profile_image, role')
      .eq('id', authUser.id)
      .maybeSingle();
    if (profileError) throw new Error(`Impossible de charger votre profil : ${profileError.message}`);
    if (!profile) throw new Error('Votre compte Supabase n’a pas encore de profil dans la table profiles.');
    const user = {
      ...profile,
      profileImage: profile.profile_image,
      email: profile.email || authUser.email
    };
    localStorage.setItem('bgshop_currentUser', JSON.stringify(user));
    return user;
  },

  async login(email, password) {
    const client = window.bgSupabase?.getClient();
    if (client) {
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) return { success: false, message: error.message };
      try {
        const user = await this.getAuthenticatedUser();
        if (!user) return { success: false, message: 'Session Supabase introuvable après la connexion.' };
        return { success: true, user };
      } catch (profileError) {
        await client.auth.signOut();
        return { success: false, message: profileError.message };
      }
    }
    const users = JSON.parse(localStorage.getItem('bgshop_users'));
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('bgshop_currentUser', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: 'Email ou mot de passe incorrect' };
  },

  async register(email, password, name, profileImage = '') {
    const client = window.bgSupabase?.getClient();
    if (client) {
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: { data: { name, profile_image: profileImage } }
      });
      if (error) return { success: false, message: error.message };
      if (!data.user) return { success: false, message: 'Vérifiez votre adresse email pour activer le compte.' };
      if (!data.session) {
        return {
          success: false,
          requiresConfirmation: true,
          message: 'Compte créé. Consultez votre boîte mail et confirmez votre adresse avant de vous connecter.'
        };
      }
      const { data: profile, error: profileError } = await client
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();
      if (profileError) return { success: false, message: `Compte créé, mais le profil est indisponible : ${profileError.message}` };
      const user = profile || { id: data.user.id, email, name, profileImage, role: 'user' };
      localStorage.setItem('bgshop_currentUser', JSON.stringify(user));
      return { success: true, user };
    }
    const users = JSON.parse(localStorage.getItem('bgshop_users'));
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email déjà utilisé' };
    }
    const newUser = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      email,
      password,
      name,
      profileImage,
      role: 'user'
    };
    users.push(newUser);
    localStorage.setItem('bgshop_users', JSON.stringify(users));
    localStorage.setItem('bgshop_currentUser', JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  logout() {
    const client = window.bgSupabase?.getClient();
    if (client) client.auth.signOut();
    localStorage.removeItem('bgshop_currentUser');
  },

  // Product management
  getProducts() {
    return JSON.parse(localStorage.getItem('bgshop_products'));
  },

  getTrendingProducts() {
    const products = this.getProducts();
    return products.filter(p => p.trending).slice(0, 6);
  },

  getProductsByCategory(category) {
    const products = this.getProducts();
    const categoryGroups = {
      Esthétique: ['Cosmétiques', 'Accessoires de beauté'],
      Fashion: ['Vêtements', 'Chaussures']
    };
    const categories = categoryGroups[category] || [category];
    return products.filter(p => categories.includes(p.category));
  },

  getProduct(id) {
    return this.getProducts().find(p => p.id === id);
  },

  async recordProductView(productId, user) {
    if (!user) return null;
    const products = this.getProducts();
    const product = products.find((item) => item.id === productId);
    if (!product) return null;
    product.views = Array.isArray(product.views) ? product.views : [];
    if (!product.views.some((view) => view.userEmail === user.email)) {
      product.views.push({
        userEmail: user.email,
        name: user.name,
        date: new Date().toISOString()
      });
      localStorage.setItem('bgshop_products', JSON.stringify(products));
      const client = window.bgSupabase?.getClient();
      if (client && user?.id) {
        const { error } = await client.from('product_views').upsert({ product_id: productId, user_id: user.id });
        if (error) console.error('Impossible d’enregistrer la vue de l’article.', error);
      }
    }
    return product;
  },

  getCart() {
    return JSON.parse(localStorage.getItem('bgshop_cart') || '[]');
  },

  addToCart(productId) {
    const cart = this.getCart();
    if (!cart.includes(productId)) cart.push(productId);
    localStorage.setItem('bgshop_cart', JSON.stringify(cart));
    const user = this.checkAuth();
    const client = window.bgSupabase?.getClient();
    if (client && user?.id) {
      client.from('carts').upsert({ user_id: user.id }).then(() => client.from('cart_items').upsert({ cart_id: user.id, product_id: productId, quantity: 1 }));
    }
  },

  removeFromCart(productId) {
    localStorage.setItem('bgshop_cart', JSON.stringify(this.getCart().filter((id) => id !== productId)));
    const user = this.checkAuth();
    const client = window.bgSupabase?.getClient();
    if (client && user?.id) client.from('cart_items').delete().eq('cart_id', user.id).eq('product_id', productId);
  },

  getUserSettings(userEmail) {
    const defaults = {
      language: 'fr',
      siteBackground: { type: 'default', value: '' },
      messageBackground: { type: 'default', value: '' }
    };
    if (!userEmail) return defaults;
    return { ...defaults, ...(JSON.parse(localStorage.getItem(`bgshop_settings_${userEmail}`) || '{}')) };
  },

  async saveUserSettings(userEmail, settings) {
    if (!userEmail) return;
    localStorage.setItem(`bgshop_settings_${userEmail}`, JSON.stringify(settings));
    this.applyUserSettings(settings);
    const user = this.checkAuth();
    const client = window.bgSupabase?.getClient();
    if (client && user?.id) {
      const { error } = await client.from('user_settings').upsert({
        user_id: user.id,
        language: settings.language,
        site_background: settings.siteBackground,
        message_background: settings.messageBackground
      });
      if (error) throw new Error(`Impossible d’enregistrer les préférences : ${error.message}`);
    }
  },

  applyUserSettings(settings) {
    const site = settings?.siteBackground || {};
    const message = settings?.messageBackground || {};
    const deviceColor = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#241b27' : '#fff2ea';
    document.body.dataset.siteBackground = site.type || 'default';
    document.body.style.setProperty('--user-site-background', site.type === 'color' ? site.value : deviceColor);
    document.body.style.setProperty('--user-site-image', site.type === 'image' ? `url(${site.value})` : '');
    document.body.style.setProperty('--user-message-background', message.type === 'color' ? message.value : '');
    document.body.style.setProperty('--user-message-image', message.type === 'image' ? `url(${message.value})` : '');
  },

  getUserProductIds(userEmail, key) {
    return JSON.parse(localStorage.getItem(`bgshop_product_${key}_${userEmail}`) || '[]');
  },

  toggleProductCollection(productId, userEmail, key) {
    if (!userEmail) return false;
    const ids = this.getUserProductIds(userEmail, key);
    const index = ids.indexOf(productId);
    if (index >= 0) ids.splice(index, 1); else ids.push(productId);
    localStorage.setItem(`bgshop_product_${key}_${userEmail}`, JSON.stringify(ids));
    const user = this.checkAuth();
    const client = window.bgSupabase?.getClient();
    if (client && user?.id) {
      const query = client.from('product_collections').delete().eq('product_id', productId).eq('user_id', user.id).eq('collection', key);
      if (ids.includes(productId)) query.then(() => client.from('product_collections').insert({ product_id: productId, user_id: user.id, collection: key }));
      else query;
    }
    return ids.includes(productId);
  },

  async addProduct(product) {
    const products = this.getProducts();
    const client = window.bgSupabase?.getClient();
    const user = this.checkAuth();
    if (client) {
      const { data: authData, error: authError } = await client.auth.getUser();
      if (authError || !authData.user?.id) {
        throw new Error('Votre session Supabase est expirée. Reconnectez-vous pour publier un article.');
      }
      const sellerId = authData.user.id;
      if (!user || user.role !== 'admin') {
        throw new Error('Seul un administrateur peut publier un article.');
      }
      const { data, error } = await client.from('products').insert({
        seller_id: sellerId,
        title: product.title,
        category: product.category,
        price: product.price,
        image: product.image,
        description: product.description,
        trending: Boolean(product.trending)
      }).select('*').single();
      if (error) {
        throw new Error(`Impossible d’enregistrer l’article dans Supabase : ${error.message}`);
      }
      product.id = data.id;
      product.postedDate = data.created_at;
    } else {
      product.id = Math.max(...products.map(p => p.id), 0) + 1;
      product.postedDate = new Date().toISOString();
    }

    products.push(product);
    localStorage.setItem('bgshop_products', JSON.stringify(products));
    return product;
  },

  async deleteProduct(productId) {
    const client = window.bgSupabase?.getClient();
    if (client) {
      const { data, error } = await client
        .from('products')
        .delete()
        .eq('id', productId)
        .select('id');
      if (error) {
        throw new Error(`Suppression refusée par Supabase : ${error.message}`);
      }
      if (!data?.length) {
        throw new Error('Le produit est introuvable ou votre compte admin n’est pas autorisé à le supprimer.');
      }
    }
    const products = this.getProducts().filter((product) => product.id !== productId);
    localStorage.setItem('bgshop_products', JSON.stringify(products));
    return true;
  },

  getCategories() {
    return [
      { name: 'Voitures' },
      { name: 'Animaux' },
      { name: 'Esthétique', subcategories: ['Cosmétiques', 'Accessoires de beauté'] },
      { name: 'Fashion', subcategories: ['Vêtements', 'Chaussures'] },
      { name: 'Électronique' }
    ];
  },

  // Order management
  async addOrder(order) {
    const orders = JSON.parse(localStorage.getItem('bgshop_orders'));
    order.status = 'pending';
    order.createdDate = new Date().toISOString();
    const client = window.bgSupabase?.getClient();
    if (client) {
      if (!/^[0-9a-f-]{36}$/i.test(String(order.userId || ''))) {
        throw new Error('Vous devez être connecté pour passer une commande.');
      }
      const { data, error } = await client.from('orders').insert({
        customer_id: order.userId,
        customer_name: order.customerName,
        customer_phone: order.customerPhone,
        customer_address: order.customerAddress,
        payment_method: order.paymentMethod,
        payment_proof: order.paymentProof || null
      }).select('id, created_at').single();
      if (error) throw new Error(`Impossible d’enregistrer la commande : ${error.message}`);
      const { error: itemError } = await client.from('order_items').insert({
        order_id: data.id,
        product_id: order.productId || null,
        product_title: order.productTitle,
        product_price: order.productPrice || 0,
        quantity: 1
      });
      if (itemError) {
        await client.from('orders').delete().eq('id', data.id);
        throw new Error(`Impossible d’enregistrer l’article commandé : ${itemError.message}`);
      }
      order.id = data.id;
      order.createdDate = data.created_at;
    } else {
      order.id = Math.max(...orders.map(o => o.id || 0), 0) + 1;
    }

    orders.push(order);
    localStorage.setItem('bgshop_orders', JSON.stringify(orders));
    return order;
  },

  async getPaymentNumbers() {
    const client = window.bgSupabase?.getClient();
    if (client) {
      const { data } = await client.from('payment_numbers').select('*').order('created_at', { ascending: true });
      if (data) {
        localStorage.setItem('bgshop_payment_numbers', JSON.stringify(data));
        return data;
      }
    }
    return JSON.parse(localStorage.getItem('bgshop_payment_numbers') || '[]');
  },

  async savePaymentNumber(number) {
    const client = window.bgSupabase?.getClient();
    if (client) {
      const { data, error } = await client.from('payment_numbers').insert({ phone: number.phone, label: number.label || null }).select().single();
      if (error) throw new Error(`Impossible d’ajouter le numéro : ${error.message}`);
      number = data;
    } else {
      number = { ...number, id: Date.now(), created_at: new Date().toISOString() };
    }
    const numbers = JSON.parse(localStorage.getItem('bgshop_payment_numbers') || '[]');
    numbers.push(number);
    localStorage.setItem('bgshop_payment_numbers', JSON.stringify(numbers));
    return number;
  },

  async deletePaymentNumber(numberId) {
    const client = window.bgSupabase?.getClient();
    if (client) {
      const { error } = await client.from('payment_numbers').delete().eq('id', numberId);
      if (error) throw new Error(`Impossible de retirer le numéro : ${error.message}`);
    }
    localStorage.setItem('bgshop_payment_numbers', JSON.stringify(
      JSON.parse(localStorage.getItem('bgshop_payment_numbers') || '[]').filter((number) => number.id !== numberId)
    ));
  },

  async updatePaymentNumber(numberId, changes) {
    const client = window.bgSupabase?.getClient();
    if (client) {
      const { data, error } = await client.from('payment_numbers').update({ phone: changes.phone, label: changes.label || null }).eq('id', numberId).select().single();
      if (error) throw new Error(`Impossible de modifier le numéro : ${error.message}`);
      changes = data;
    }
    const numbers = JSON.parse(localStorage.getItem('bgshop_payment_numbers') || '[]');
    localStorage.setItem('bgshop_payment_numbers', JSON.stringify(numbers.map((number) => number.id === numberId ? { ...number, ...changes } : number)));
  },

  getOrders() {
    return JSON.parse(localStorage.getItem('bgshop_orders'));
  },

  getVideos() {
    return JSON.parse(localStorage.getItem('bgshop_videos'));
  },

  getAdVideoIds() {
    return this.getAdVideos().map((video) => video.id);
  },

  async setAdVideoIds(videoIds) {
    const selectedIds = new Set(videoIds);
    const ads = this.getAdVideos().filter((video) => selectedIds.has(video.id));
    localStorage.setItem('bgshop_ad_videos', JSON.stringify(ads));
    const client = window.bgSupabase?.getClient();
    const user = this.checkAuth();
    if (client && user?.role === 'admin') {
      const { error: deleteError } = await client.from('ad_videos').delete().gte('position', 0);
      if (deleteError) throw new Error(`Impossible de mettre à jour la publicité : ${deleteError.message}`);
      if (videoIds.length) {
        const { error } = await client.from('ad_videos').insert(videoIds.map((videoId, index) => ({ video_id: videoId, position: index })));
        if (error) throw new Error(`Impossible de sélectionner les publicités : ${error.message}`);
      }
    }
  },

  getAdVideos() {
    return JSON.parse(localStorage.getItem('bgshop_ad_videos') || '[]');
  },

  async addAdVideo(video) {
    const ads = this.getAdVideos();
    const client = window.bgSupabase?.getClient();
    const user = this.checkAuth();
    if (client) {
      if (!user?.id || user.role !== 'admin') throw new Error('Seul un administrateur peut publier une publicité.');
      const blob = await fetch(video.videoUrl).then((response) => response.blob());
      const path = `${user.id}/ads-${Date.now()}-${(video.originalName || 'video.webm').replace(/[^a-z0-9._-]/gi, '_')}`;
      const { error: uploadError } = await client.storage.from('videos').upload(path, blob, { contentType: blob.type, upsert: false });
      if (uploadError) throw new Error(`Impossible de charger la publicité : ${uploadError.message}`);
      const videoUrl = client.storage.from('videos').getPublicUrl(path).data.publicUrl;
      const { data, error } = await client.from('videos').insert({
        author_id: user.id,
        title: video.title,
        description: video.description,
        video_url: videoUrl
      }).select('id, created_at, video_url').single();
      if (error) throw new Error(`Impossible d’enregistrer la publicité : ${error.message}`);
      const { error: adError } = await client.from('ad_videos').insert({ video_id: data.id, position: ads.length });
      if (adError) throw new Error(`Impossible d’activer la publicité : ${adError.message}`);
      video.id = data.id;
      video.postedDate = data.created_at;
      video.videoUrl = data.video_url;
    } else {
      video.id = Math.max(...ads.map((ad) => ad.id || 0), 0) + 1;
      video.postedDate = new Date().toISOString();
    }
    ads.push(video);
    localStorage.setItem('bgshop_ad_videos', JSON.stringify(ads));
    return video;
  },

  getVideoById(videoId) {
    return this.getVideos().find((video) => video.id === videoId);
  },

  getFavoriteVideoIds(userEmail) {
    if (!userEmail) return [];
    const user = this.checkAuth();
    const remoteFavorites = JSON.parse(localStorage.getItem('bgshop_favorites_remote') || '[]');
    const localFavorites = JSON.parse(localStorage.getItem(`bgshop_favorites_${userEmail}`) || '[]');
    const remoteIds = remoteFavorites.filter((favorite) => favorite.user_id === user?.id).map((favorite) => favorite.video_id);
    return remoteIds.length ? remoteIds : localFavorites;
  },

  toggleVideoFavorite(videoId, userEmail) {
    const favorites = this.getFavoriteVideoIds(userEmail);
    const favoriteIndex = favorites.indexOf(videoId);
    if (favoriteIndex >= 0) {
      favorites.splice(favoriteIndex, 1);
    } else {
      favorites.push(videoId);
    }
    localStorage.setItem(`bgshop_favorites_${userEmail}`, JSON.stringify(favorites));
    const user = this.checkAuth();
    const client = window.bgSupabase?.getClient();
    if (client && user?.id) {
      const query = client.from('video_favorites').delete().eq('video_id', videoId).eq('user_id', user.id);
      if (favorites.includes(videoId)) query.then(() => client.from('video_favorites').insert({ video_id: videoId, user_id: user.id }));
      else query;
    }
    return favorites.includes(videoId);
  },

  async addVideo(video) {
    const videos = this.getVideos();
    video.views = [];
    video.likes = [];
    video.comments = [];
    const client = window.bgSupabase?.getClient();
    const user = this.checkAuth();
    if (client) {
      if (!user?.id) throw new Error('Vous devez être connecté pour publier une vidéo.');
      let videoUrl = video.videoUrl;
      if (videoUrl?.startsWith('data:')) {
        const blob = await fetch(videoUrl).then((response) => response.blob());
        const path = `${user.id}/${Date.now()}-${(video.originalName || 'video.webm').replace(/[^a-z0-9._-]/gi, '_')}`;
        const { error: uploadError } = await client.storage.from('videos').upload(path, blob, { contentType: blob.type, upsert: false });
        if (uploadError) throw new Error(`Impossible de charger la vidéo : ${uploadError.message}`);
        videoUrl = client.storage.from('videos').getPublicUrl(path).data.publicUrl;
      }
      const { data, error } = await client.from('videos').insert({
        author_id: user.id,
        title: video.title,
        description: video.description,
        video_url: videoUrl
      }).select('*').single();
      if (error) throw new Error(`Impossible d’enregistrer la vidéo : ${error.message}`);
      video.id = data.id;
      video.postedDate = data.created_at;
      video.videoUrl = data.video_url;
    } else {
      video.id = Math.max(...videos.map((v) => v.id || 0), 0) + 1;
      video.postedDate = new Date().toISOString();
    }

    videos.push(video);
    localStorage.setItem('bgshop_videos', JSON.stringify(videos));
    return video;
  },

  addVideoView(videoId, user) {
    const videos = this.getVideos();
    const video = videos.find((v) => v.id === videoId);
    if (!video) return null;
    const existing = video.views.find((view) => view.userEmail === user.email);
    if (!existing) {
      video.views.push({
        userEmail: user.email,
        name: user.name,
        date: new Date().toISOString(),
      });
      localStorage.setItem('bgshop_videos', JSON.stringify(videos));
      const client = window.bgSupabase?.getClient();
      if (client && user?.id) client.from('video_views').upsert({ video_id: videoId, user_id: user.id });
    }
    return video;
  },

  toggleVideoLike(videoId, user) {
    const videos = this.getVideos();
    const video = videos.find((v) => v.id === videoId);
    if (!video) return null;
    const likedIndex = video.likes.findIndex((like) => like.userEmail === user.email);
    if (likedIndex >= 0) {
      video.likes.splice(likedIndex, 1);
    } else {
      video.likes.push({
        userEmail: user.email,
        name: user.name,
        date: new Date().toISOString(),
      });
    }
    localStorage.setItem('bgshop_videos', JSON.stringify(videos));
    const client = window.bgSupabase?.getClient();
    if (client && user?.id) {
      const query = client.from('video_likes').delete().eq('video_id', videoId).eq('user_id', user.id);
      if (likedIndex < 0) query.then(() => client.from('video_likes').insert({ video_id: videoId, user_id: user.id }));
      else query;
    }
    return video;
  },

  addVideoComment(videoId, comment) {
    const videos = this.getVideos();
    const video = videos.find((v) => v.id === videoId);
    if (!video) return null;
    comment.id = Math.max(...video.comments.map((c) => c.id || 0), 0) + 1;
    comment.date = new Date().toISOString();
    video.comments.push(comment);
    localStorage.setItem('bgshop_videos', JSON.stringify(videos));
    const client = window.bgSupabase?.getClient();
    const user = this.checkAuth();
    if (client && user?.id) client.from('video_comments').insert({ video_id: videoId, user_id: user.id, text: comment.text });
    return comment;
  },

  async compressVideoFile(file) {
    if (!file || !file.type.startsWith('video/')) return file;
    if (file.size <= 7 * 1024 * 1024) return file;
    if (!window.MediaRecorder || !HTMLVideoElement.prototype.captureStream) {
      return file;
    }

    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.src = url;
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.style.position = 'fixed';
    video.style.left = '-9999px';
    document.body.appendChild(video);

    await new Promise((resolve) => {
      video.onloadedmetadata = resolve;
    });

    if (video.duration > 60) {
      URL.revokeObjectURL(url);
      document.body.removeChild(video);
      throw new Error('La vidéo dépasse 60 secondes.');
    }

    const stream = video.captureStream();
    const options = {
      mimeType: 'video/webm; codecs=vp8',
      videoBitsPerSecond: 800000,
      audioBitsPerSecond: 96000,
    };

    const chunks = [];
    let recorder;
    try {
      recorder = new MediaRecorder(stream, options);
    } catch (error) {
      URL.revokeObjectURL(url);
      document.body.removeChild(video);
      return file;
    }

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    const stopPromise = new Promise((resolve) => {
      recorder.onstop = resolve;
      recorder.onerror = resolve;
    });

    recorder.start();
    await video.play().catch(() => { });

    await new Promise((resolve) => {
      let ended = false;
      video.onended = () => {
        ended = true;
        resolve();
      };
      setTimeout(() => {
        if (!ended) resolve();
      }, Math.min(video.duration * 1000 + 300, 61000));
    });

    recorder.stop();
    await stopPromise;

    URL.revokeObjectURL(url);
    document.body.removeChild(video);

    const compressedBlob = new Blob(chunks, { type: 'video/webm' });
    if (compressedBlob.size > 0 && compressedBlob.size < file.size) {
      return new File([compressedBlob], file.name.replace(/\.[^\.]+$/, '.webm'), {
        type: 'video/webm',
      });
    }

    return file;
  },

  async getVideoDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  getAdminDashboardData() {
    const orders = this.getOrders();
    return {
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      completedOrders: orders.filter(o => o.status === 'completed').length,
      orders: orders.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
    };
  },

  getUserByEmail(email) {
    const users = JSON.parse(localStorage.getItem('bgshop_users'));
    return users.find((u) => u.email === email);
  },

  async addMessage(message) {
    const messages = JSON.parse(localStorage.getItem('bgshop_messages'));
    message.createdDate = new Date().toISOString();
    message.isReadByAdmin = message.receiver === 'admin' ? false : true;
    message.isReadByUser = message.receiver === 'admin' ? true : false;
    const user = this.checkAuth();
    const client = window.bgSupabase?.getClient();
    if (client) {
      if (!user?.id) throw new Error('Vous devez être connecté pour envoyer un message.');
      let threadUserId = user.id;
      if (user.role === 'admin' && message.userEmail) {
        const { data: threadUser, error: profileError } = await client
          .from('profiles')
          .select('id')
          .eq('email', message.userEmail)
          .single();
        if (profileError) throw new Error(`Destinataire introuvable : ${profileError.message}`);
        threadUserId = threadUser.id;
      }
      const { data, error } = await client.from('messages').insert({
        user_id: threadUserId,
        sender_id: user.id,
        receiver_role: message.receiver === 'admin' ? 'admin' : 'user',
        text: message.text
      }).select('id, created_at').single();
      if (error) throw new Error(`Impossible d’envoyer le message : ${error.message}`);
      message.id = data.id;
      message.createdDate = data.created_at;
    } else {
      message.id = Math.max(...messages.map((m) => m.id || 0), 0) + 1;
    }
    messages.push(message);
    localStorage.setItem('bgshop_messages', JSON.stringify(messages));
    return message;
  },

  getMessages() {
    return JSON.parse(localStorage.getItem('bgshop_messages'));
  },

  getMessagesForUser(userEmail) {
    return this.getMessages()
      .filter((m) => m.userEmail === userEmail)
      .sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
  },

  getAdminMessageThreads() {
    const messages = this.getMessages();
    const users = [...new Set(messages.map((m) => m.userEmail))];
    return users.map((userEmail) => {
      const thread = messages.filter((m) => m.userEmail === userEmail);
      const lastMessage = thread.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))[0];
      return {
        userEmail,
        userName: (this.getUserByEmail(userEmail) || {}).name || userEmail,
        lastMessage,
        unreadCount: thread.filter((m) => m.receiver === 'admin' && !m.isReadByAdmin).length,
      };
    });
  },

  markThreadReadByAdmin(userEmail) {
    const messages = this.getMessages();
    messages.forEach((m) => {
      if (m.userEmail === userEmail && m.receiver === 'admin') {
        m.isReadByAdmin = true;
      }
    });
    localStorage.setItem('bgshop_messages', JSON.stringify(messages));
    const client = window.bgSupabase?.getClient();
    if (client) {
      client.from('profiles').select('id').eq('email', userEmail).single().then(({ data }) => {
        if (data) client.from('messages').update({ is_read_by_admin: true }).eq('user_id', data.id).eq('receiver_role', 'admin');
      });
    }
  },

  markThreadReadByUser(userEmail) {
    const messages = this.getMessages();
    messages.forEach((m) => {
      if (m.userEmail === userEmail && m.receiver === userEmail) {
        m.isReadByUser = true;
      }
    });
    localStorage.setItem('bgshop_messages', JSON.stringify(messages));
    const client = window.bgSupabase?.getClient();
    const user = this.checkAuth();
    if (client && user?.id) client.from('messages').update({ is_read_by_user: true }).eq('user_id', user.id).eq('receiver_role', 'user');
  },

  getUnreadMessagesCountForUser(userEmail) {
    return this.getMessages().filter((m) => m.userEmail === userEmail && m.receiver === userEmail && !m.isReadByUser).length;
  },

  getNotifications() {
    return JSON.parse(localStorage.getItem('bgshop_notifications') || '[]');
  },

  async addNotification(notification) {
    const notifications = this.getNotifications();
    const client = window.bgSupabase?.getClient();
    const user = this.checkAuth();
    const localNotification = { ...notification, id: Date.now(), createdDate: new Date().toISOString() };
    if (client) {
      if (!user?.id || user.role !== 'admin') throw new Error('Seul un administrateur peut envoyer une notification.');
      const { data, error } = await client.from('notifications').insert({ title: notification.title, text: notification.text, created_by: user.id }).select('id, created_at').single();
      if (error) throw new Error(`Impossible d’envoyer la notification : ${error.message}`);
      localNotification.id = data.id;
      localNotification.createdDate = data.created_at;
    }
    notifications.unshift(localNotification);
    localStorage.setItem('bgshop_notifications', JSON.stringify(notifications));
    return localNotification;
  },

  async updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const order = orders.find((item) => item.id === orderId);
    if (!order) return;
    const client = window.bgSupabase?.getClient();
    if (client) {
      const { error } = await client.from('orders').update({ status }).eq('id', orderId);
      if (error) throw new Error(`Impossible de mettre à jour la commande : ${error.message}`);
    }
    order.status = status;
    localStorage.setItem('bgshop_orders', JSON.stringify(orders));
  },

  async changeAdminPassword(email, currentPassword, newPassword) {
    const client = window.bgSupabase?.getClient();
    if (client) {
      const { error: loginError } = await client.auth.signInWithPassword({ email, password: currentPassword });
      if (loginError) return false;
      const { error } = await client.auth.updateUser({ password: newPassword });
      return !error;
    }
    const users = JSON.parse(localStorage.getItem('bgshop_users'));
    const admin = users.find((user) => user.email === email && user.role === 'admin');
    if (!admin || admin.password !== currentPassword) return false;
    admin.password = newPassword;
    localStorage.setItem('bgshop_users', JSON.stringify(users));
    localStorage.setItem('bgshop_currentUser', JSON.stringify(admin));
    return true;
  }
};

// Initialize app on page load
document.addEventListener('DOMContentLoaded', () => {
  app.init();
  const user = app.checkAuth();
  if (user) app.applyUserSettings(app.getUserSettings(user.email));
  enhanceNavigation();
  renderAdvertisingBar();
  updateAuthUI();
  renderGlobalTaskbar();
});

function enhanceNavigation() {
  return;
}

function renderAdvertisingBar() {
  return;
}

function renderGlobalTaskbar() {
  if (!document.querySelector('.navbar') || document.querySelector('.global-taskbar') || document.body.classList.contains('market-page')) return;
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const taskbar = document.createElement('nav');
  taskbar.className = 'global-taskbar';
  taskbar.setAttribute('aria-label', 'Navigation principale');
  taskbar.innerHTML = `<a class="${currentPage === 'index.html' ? 'active' : ''}" href="index.html"><strong>⌂</strong><span>Accueil</span></a>
    <a class="${currentPage === 'videos.html' ? 'active' : ''}" href="videos.html"><strong>▶</strong><span>Réel</span></a>
    <a class="${currentPage === 'panier.html' ? 'active' : ''}" href="panier.html"><strong>▢</strong><span>Panier</span></a>
    <a class="${currentPage === 'messages.html' ? 'active' : ''}" href="messages.html"><strong>◌</strong><span>Messages</span></a>
    <a class="${currentPage === 'settings.html' ? 'active' : ''}" href="settings.html"><strong>⚙</strong><span>Paramètres</span></a>`;
  document.body.appendChild(taskbar);
  document.body.classList.add('has-global-taskbar');
}

function productActionsMarkup(productId) {
  const user = app.checkAuth();
  const liked = user && app.getUserProductIds(user.email, 'liked').includes(productId);
  const favorite = user && app.getUserProductIds(user.email, 'favorites').includes(productId);
  return `<div class="product-actions">
    <button class="product-action ${liked ? 'active' : ''}" aria-label="J'aime" aria-pressed="${Boolean(liked)}" onclick="event.stopPropagation(); toggleProductCardCollection(${productId}, 'liked', this)">👍</button>
    <button class="product-action ${favorite ? 'active' : ''}" aria-label="Ajouter aux favoris" aria-pressed="${Boolean(favorite)}" onclick="event.stopPropagation(); toggleProductCardCollection(${productId}, 'favorites', this)">♡</button>
  </div>`;
}

function toggleProductCardCollection(productId, key, button) {
  const user = app.checkAuth();
  if (!user) { window.location.href = 'login.html'; return; }
  const active = app.toggleProductCollection(productId, user.email, key);
  button.classList.toggle('active', active);
  button.setAttribute('aria-pressed', String(active));
  button.textContent = key === 'liked' ? '👍' : (active ? '♥' : '♡');
}

// Update auth UI
function updateAuthUI() {
  const user = app.checkAuth();
  const authContainer = document.getElementById('auth-container');

  if (authContainer) {
    if (user) {
      authContainer.innerHTML = user.role === 'admin'
        ? '<a href="admin.html" class="admin-space-button">Espace admin</a>'
        : `<a class="profile-chip" href="settings.html"><span class="profile-avatar">${user.profileImage ? `<img src="${user.profileImage}" alt="Photo de ${user.name}">` : '♙'}</span><span>${user.name.split(' ')[0]}</span></a>`;
    } else {
      authContainer.innerHTML = `
        <span class="profile-avatar">♙</span>
        <a href="login.html" class="login-link">Se connecter</a>
      `;
    }
  }
}

function handleLogout() {
  app.logout();
  updateAuthUI();
  window.location.href = 'index.html';
}
