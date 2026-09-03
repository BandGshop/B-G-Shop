// ===== SYSTEM DATA MANAGEMENT =====
const app = {
  // Initialize app data
  init() {
    this.ensureDefaultData();
    this.checkAuth();
  },

  // Ensure default data exists in localStorage
  ensureDefaultData() {
    if (!localStorage.getItem('bgshop_users')) {
      localStorage.setItem('bgshop_users', JSON.stringify([
        { id: 1, email: 'admin@bgshop.com', password: 'admin123', role: 'admin', name: 'B&G' }
      ]));
    }

    if (!localStorage.getItem('bgshop_products')) {
      const sampleProducts = [
        {
          id: 1,
          title: 'iPhone 15 Pro',
          category: 'Électronique',
          price: 1200,
          image: 'https://via.placeholder.com/400?text=iPhone+15+Pro',
          description: 'Dernier modèle Apple avec appareil photo premium',
          trending: true,
          postedDate: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Chien Golden Retriever',
          category: 'Animaux',
          price: 450,
          image: 'https://via.placeholder.com/400?text=Golden+Retriever',
          description: 'Chiot Golden Retriever enregistré et vacciné',
          trending: true,
          postedDate: new Date().toISOString()
        },
        {
          id: 3,
          title: 'Robe de Soirée Noire',
          category: 'Vêtements',
          price: 85,
          image: 'https://via.placeholder.com/400?text=Robe+Noire',
          description: 'Robe élégante en soie pour soirée spéciale',
          trending: true,
          postedDate: new Date().toISOString()
        },
        {
          id: 4,
          title: 'Montre Rolex Submariner',
          category: 'Cosmétiques',
          price: 8000,
          image: 'https://via.placeholder.com/400?text=Rolex+Watch',
          description: 'Montre de luxe authentique',
          trending: true,
          postedDate: new Date().toISOString()
        },
        {
          id: 5,
          title: 'Toyota Corolla Location',
          category: 'Voitures',
          price: 50,
          image: 'https://via.placeholder.com/400?text=Toyota+Corolla',
          description: 'Location quotidienne de voiture',
          trending: false,
          postedDate: new Date().toISOString()
        }
      ];
      localStorage.setItem('bgshop_products', JSON.stringify(sampleProducts));
    } else {
      const products = JSON.parse(localStorage.getItem('bgshop_products'));
      const legacyCategoryNames = {
        fashion: 'Vêtements',
        Fashion: 'Vêtements'
      };
      const normalizedProducts = products.map((product) => ({
        ...product,
        category: legacyCategoryNames[product.category] || product.category
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
    if (!localStorage.getItem('bgshop_ad_videos')) {
      localStorage.setItem('bgshop_ad_videos', JSON.stringify([]));
    }
  },

  // Authentication management
  checkAuth() {
    const user = localStorage.getItem('bgshop_currentUser');
    return user ? JSON.parse(user) : null;
  },

  login(email, password) {
    const users = JSON.parse(localStorage.getItem('bgshop_users'));
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('bgshop_currentUser', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: 'Email ou mot de passe incorrect' };
  },

  register(email, password, name) {
    const users = JSON.parse(localStorage.getItem('bgshop_users'));
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email déjà utilisé' };
    }
    const newUser = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      email,
      password,
      name,
      role: 'user'
    };
    users.push(newUser);
    localStorage.setItem('bgshop_users', JSON.stringify(users));
    localStorage.setItem('bgshop_currentUser', JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  logout() {
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

  getUserSettings(userEmail) {
    const defaults = {
      language: 'fr',
      siteBackground: { type: 'default', value: '' },
      messageBackground: { type: 'default', value: '' }
    };
    if (!userEmail) return defaults;
    return { ...defaults, ...(JSON.parse(localStorage.getItem(`bgshop_settings_${userEmail}`) || '{}')) };
  },

  saveUserSettings(userEmail, settings) {
    if (!userEmail) return;
    localStorage.setItem(`bgshop_settings_${userEmail}`, JSON.stringify(settings));
    this.applyUserSettings(settings);
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
    return ids.includes(productId);
  },

  addProduct(product) {
    const products = this.getProducts();
    product.id = Math.max(...products.map(p => p.id), 0) + 1;
    product.postedDate = new Date().toISOString();
    products.push(product);
    localStorage.setItem('bgshop_products', JSON.stringify(products));
    return product;
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
  addOrder(order) {
    const orders = JSON.parse(localStorage.getItem('bgshop_orders'));
    order.id = Math.max(...orders.map(o => o.id || 0), 0) + 1;
    order.status = 'pending';
    order.createdDate = new Date().toISOString();
    orders.push(order);
    localStorage.setItem('bgshop_orders', JSON.stringify(orders));
    return order;
  },

  getOrders() {
    return JSON.parse(localStorage.getItem('bgshop_orders'));
  },

  getVideos() {
    return JSON.parse(localStorage.getItem('bgshop_videos'));
  },

  getAdVideoIds() {
    return JSON.parse(localStorage.getItem('bgshop_ad_videos') || '[]');
  },

  setAdVideoIds(videoIds) {
    localStorage.setItem('bgshop_ad_videos', JSON.stringify(videoIds));
  },

  getVideoById(videoId) {
    return this.getVideos().find((video) => video.id === videoId);
  },

  getFavoriteVideoIds(userEmail) {
    if (!userEmail) return [];
    return JSON.parse(localStorage.getItem(`bgshop_favorites_${userEmail}`) || '[]');
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
    return favorites.includes(videoId);
  },

  addVideo(video) {
    const videos = this.getVideos();
    video.id = Math.max(...videos.map((v) => v.id || 0), 0) + 1;
    video.postedDate = new Date().toISOString();
    video.views = [];
    video.likes = [];
    video.comments = [];
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
    await video.play().catch(() => {});

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

  addMessage(message) {
    const messages = JSON.parse(localStorage.getItem('bgshop_messages'));
    message.id = Math.max(...messages.map((m) => m.id || 0), 0) + 1;
    message.createdDate = new Date().toISOString();
    message.isReadByAdmin = message.receiver === 'admin' ? false : true;
    message.isReadByUser = message.receiver === 'admin' ? true : false;
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
  },

  markThreadReadByUser(userEmail) {
    const messages = this.getMessages();
    messages.forEach((m) => {
      if (m.userEmail === userEmail && m.receiver === userEmail) {
        m.isReadByUser = true;
      }
    });
    localStorage.setItem('bgshop_messages', JSON.stringify(messages));
  },

  getUnreadMessagesCountForUser(userEmail) {
    return this.getMessages().filter((m) => m.userEmail === userEmail && m.receiver === userEmail && !m.isReadByUser).length;
  },

  getNotifications() {
    return JSON.parse(localStorage.getItem('bgshop_notifications') || '[]');
  },

  addNotification(notification) {
    const notifications = this.getNotifications();
    notifications.unshift({ ...notification, id: Date.now(), createdDate: new Date().toISOString() });
    localStorage.setItem('bgshop_notifications', JSON.stringify(notifications));
  },

  changeAdminPassword(email, currentPassword, newPassword) {
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
});

function enhanceNavigation() {
  const navbar = document.querySelector('.navbar');
  if (!navbar || navbar.querySelector('.burger-button')) return;
  const menu = document.createElement('div');
  menu.className = 'burger-menu';
  menu.innerHTML = `<button class="burger-button" type="button" aria-label="Ouvrir le menu" aria-expanded="false">☰</button>
    <div class="burger-panel"><a href="index.html">Accueil</a><a href="categories.html">Catégories</a><a href="videos.html">Vidéos</a><a href="messages.html">Messages</a><a href="settings.html">Paramètres</a></div>`;
  navbar.prepend(menu);
  const button = menu.querySelector('.burger-button');
  button.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
}

function renderAdvertisingBar() {
  if (document.querySelector('.ad-bar')) return;
  const bar = document.createElement('section');
  bar.className = 'ad-bar';
  document.body.classList.add('has-ad-bar');
  bar.setAttribute('aria-label', 'Publicité B&G Shop');
  document.body.prepend(bar);
  const videos = app.getVideos().filter((video) => app.getAdVideoIds().includes(video.id));
  if (!videos.length) {
    const logoImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="520" height="120" viewBox="0 0 520 120"%3E%3Crect width="520" height="120" fill="%231e101b"/%3E%3Ctext x="260" y="78" text-anchor="middle" font-family="Georgia,serif" font-size="58" font-weight="bold" fill="%23ffd65d"%3EB%26amp%3BG Shop%3C/text%3E%3C/svg%3E';
    bar.innerHTML = `<div class="ad-empty-light"><img src="${logoImage}" alt="B&G Shop"></div>`;
    return;
  }
  const video = document.createElement('video');
  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.controls = false;
  video.src = videos[0].videoUrl;
  let current = 0;
  video.addEventListener('ended', () => {
    current = (current + 1) % videos.length;
    video.src = videos[current].videoUrl;
    video.play().catch(() => {});
  });
  bar.appendChild(video);
  video.play().catch(() => {});
}

// Update auth UI
function updateAuthUI() {
  const user = app.checkAuth();
  const authContainer = document.getElementById('auth-container');
  
  if (authContainer) {
    if (user) {
      authContainer.innerHTML = `
        <span>Bienvenue, ${user.name}</span>
        <a href="settings.html" class="btn btn-secondaire">Paramètres</a>
        <button onclick="handleLogout()" class="btn btn-secondaire">Déconnexion</button>
        ${user.role === 'admin' ? '<a href="admin.html" class="btn btn-primaire">Admin</a>' : ''}
      `;
    } else {
      authContainer.innerHTML = `
        <a href="login.html" class="btn btn-primaire">Connexion</a>
        <a href="login.html" class="btn btn-secondaire">Inscription</a>
      `;
    }
  }
}

function handleLogout() {
  app.logout();
  updateAuthUI();
  window.location.href = 'index.html';
}
