// ===== SYSTEM DATA MANAGEMENT =====
const interfacePhrases = [
  ['Accueil', 'Home', 'Inicio', 'Главная', 'Início', 'Startseite', '首页'],
  ['Catégories', 'Categories', 'Categorías', 'Категории', 'Categorias', 'Kategorien', '分类'],
  ['Vidéos', 'Videos', 'Vídeos', 'Видео', 'Vídeos', 'Videos', '视频'],
  ['Messages', 'Messages', 'Mensajes', 'Сообщения', 'Mensagens', 'Nachrichten', '消息'],
  ['Paramètres', 'Settings', 'Configuración', 'Настройки', 'Configurações', 'Einstellungen', '设置'],
  ['Panier', 'Cart', 'Carrito', 'Корзина', 'Carrinho', 'Warenkorb', '购物车'],
  ['Réel', 'Reels', 'Reels', 'Видео', 'Reels', 'Reels', '短视频'],
  ['Navigation principale', 'Main navigation', 'Navegación principal', 'Главная навигация', 'Navegação principal', 'Hauptnavigation', '主导航'],
  ['Connexion', 'Sign in', 'Iniciar sesión', 'Войти', 'Entrar', 'Anmelden', '登录'],
  ['Se connecter', 'Sign in', 'Iniciar sesión', 'Войти', 'Entrar', 'Anmelden', '登录'],
  ['Déconnexion', 'Sign out', 'Cerrar sesión', 'Выйти', 'Sair', 'Abmelden', '退出登录'],
  ['S’inscrire', 'Sign up', 'Registrarse', 'Зарегистрироваться', 'Cadastrar-se', 'Registrieren', '注册'],
  ['Nos catégories', 'Our categories', 'Nuestras categorías', 'Наши категории', 'Nossas categorias', 'Unsere Kategorien', '商品分类'],
  ['Parcourez nos produits par catégorie', 'Browse products by category', 'Explora nuestros productos por categoría', 'Просматривайте товары по категориям', 'Explore nossos produtos por categoria', 'Produkte nach Kategorie durchsuchen', '按类别浏览商品'],
  ['Tous les produits', 'All products', 'Todos los productos', 'Все товары', 'Todos os produtos', 'Alle Produkte', '所有商品'],
  ['Voitures', 'Cars', 'Coches', 'Автомобили', 'Carros', 'Autos', '汽车'],
  ['Animaux', 'Pets', 'Mascotas', 'Животные', 'Animais', 'Tiere', '宠物'],
  ['Esthétique', 'Beauty', 'Belleza', 'Красота', 'Beleza', 'Schönheit', '美容'],
  ['Cosmétiques', 'Cosmetics', 'Cosméticos', 'Косметика', 'Cosméticos', 'Kosmetik', '化妆品'],
  ['Accessoires de beauté', 'Beauty accessories', 'Accesorios de belleza', 'Аксессуары для красоты', 'Acessórios de beleza', 'Beauty-Accessoires', '美容配件'],
  ['Fashion', 'Fashion', 'Moda', 'Мода', 'Moda', 'Mode', '时尚'],
  ['Vêtements', 'Clothing', 'Ropa', 'Одежда', 'Roupas', 'Kleidung', '服装'],
  ['Chaussures', 'Shoes', 'Zapatos', 'Обувь', 'Calçados', 'Schuhe', '鞋'],
  ['Électronique', 'Electronics', 'Electrónica', 'Электроника', 'Eletrônicos', 'Elektronik', '电子产品'],
  ['Aucun produit trouvé dans cette catégorie pour le moment.', 'No products found in this category yet.', 'Aún no hay productos en esta categoría.', 'В этой категории пока нет товаров.', 'Ainda não há produtos nesta categoria.', 'In dieser Kategorie wurden noch keine Produkte gefunden.', '此分类暂无商品。'],
  ['La marketplace qui vous rapproche', 'The marketplace that brings you closer', 'El mercado que te acerca', 'Маркетплейс, который сближает', 'O marketplace que aproxima você', 'Der Marktplatz, der verbindet', '让你更亲近的购物平台'],
  ['Trouvez votre prochain coup de cœur.', 'Find your next favorite thing.', 'Encuentra tu próximo favorito.', 'Найдите то, что вам понравится.', 'Encontre seu próximo favorito.', 'Finde deinen nächsten Favoriten.', '发现你的心仪好物。'],
  ['Des articles sélectionnés près de chez vous, des vendeurs passionnés et de nouvelles trouvailles chaque jour.', 'Curated items near you, passionate sellers, and new finds every day.', 'Artículos seleccionados cerca de ti, vendedores apasionados y nuevos descubrimientos cada día.', 'Товары рядом с вами, увлечённые продавцы и новые находки каждый день.', 'Produtos selecionados perto de você, vendedores apaixonados e novas descobertas todos os dias.', 'Ausgewählte Artikel in deiner Nähe, engagierte Verkäufer und täglich neue Entdeckungen.', '精选附近好物、热情卖家，每天都有新发现。'],
  ['Pays ou ville', 'Country or city', 'País o ciudad', 'Страна или город', 'País ou cidade', 'Land oder Stadt', '国家或城市'],
  ['Rechercher un pays ou une ville', 'Search for a country or city', 'Buscar un país o ciudad', 'Поиск страны или города', 'Buscar país ou cidade', 'Land oder Stadt suchen', '搜索国家或城市'],
  ['Que recherchez-vous ?', 'What are you looking for?', '¿Qué estás buscando?', 'Что вы ищете?', 'O que você está procurando?', 'Wonach suchst du?', '你在寻找什么？'],
  ['Rechercher un article', 'Search for an item', 'Buscar un artículo', 'Поиск товара', 'Buscar um produto', 'Artikel suchen', '搜索商品'],
  ['Sélection B&G', 'B&G picks', 'Selección B&G', 'Выбор B&G', 'Seleção B&G', 'B&G-Auswahl', 'B&G精选'],
  ['Articles tendances', 'Trending items', 'Productos populares', 'Популярные товары', 'Produtos em alta', 'Beliebte Artikel', '热门商品'],
  ['article', 'item', 'artículo', 'товар', 'produto', 'Artikel', '件商品'],
  ['articles', 'items', 'artículos', 'товаров', 'produtos', 'Artikel', '件商品'],
  ['Ajouter', 'Add', 'Añadir', 'Добавить', 'Adicionar', 'Hinzufügen', '添加'],
  ['Aucun article ne correspond à votre recherche.', 'No items match your search.', 'Ningún artículo coincide con tu búsqueda.', 'По вашему запросу ничего не найдено.', 'Nenhum produto corresponde à sua busca.', 'Keine Artikel für deine Suche gefunden.', '没有符合搜索条件的商品。'],
  ['Explorer', 'Explore', 'Explorar', 'Обзор', 'Explorar', 'Entdecken', '探索'],
  ['Votre espace', 'Your account', 'Tu espacio', 'Ваш профиль', 'Sua área', 'Dein Bereich', '个人中心'],
  ['Toutes les catégories', 'All categories', 'Todas las categorías', 'Все категории', 'Todas as categorias', 'Alle Kategorien', '所有分类'],
  ['Mon panier', 'My cart', 'Mi carrito', 'Моя корзина', 'Meu carrinho', 'Mein Warenkorb', '我的购物车'],
  ['Tous droits réservés.', 'All rights reserved.', 'Todos los derechos reservados.', 'Все права защищены.', 'Todos os direitos reservados.', 'Alle Rechte vorbehalten.', '版权所有。'],
  ['Nos vidéos', 'Our videos', 'Nuestros vídeos', 'Наши видео', 'Nossos vídeos', 'Unsere Videos', '精选视频'],
  ['Découvrez les dernières vidéos publiées par B&G Shop.', 'Discover the latest videos published by B&G Shop.', 'Descubre los últimos vídeos publicados por B&G Shop.', 'Смотрите последние видео B&G Shop.', 'Confira os vídeos mais recentes publicados pela B&G Shop.', 'Entdecke die neuesten Videos von B&G Shop.', '查看 B&G Shop 最新发布的视频。'],
  ['Aucune vidéo publiée pour le moment.', 'No videos published yet.', 'Aún no se han publicado vídeos.', 'Видео пока не опубликованы.', 'Nenhum vídeo publicado ainda.', 'Noch keine Videos veröffentlicht.', '暂时没有发布视频。'],
  ['Commentaires', 'Comments', 'Comentarios', 'Комментарии', 'Comentários', 'Kommentare', '评论'],
  ['J’aime', 'Like', 'Me gusta', 'Нравится', 'Curtir', 'Gefällt mir', '喜欢'],
  ['Ajouter aux favoris', 'Add to favorites', 'Añadir a favoritos', 'В избранное', 'Adicionar aos favoritos', 'Zu Favoriten hinzufügen', '加入收藏'],
  ['Passer la commande', 'Place order', 'Hacer el pedido', 'Оформить заказ', 'Fazer pedido', 'Bestellen', '下单'],
  ['Ajouter un commentaire...', 'Add a comment...', 'Añadir un comentario...', 'Добавить комментарий...', 'Adicionar um comentário...', 'Kommentar hinzufügen...', '添加评论...'],
  ['Publier', 'Post', 'Publicar', 'Опубликовать', 'Publicar', 'Veröffentlichen', '发布'],
  ['Aucun commentaire pour le moment.', 'No comments yet.', 'Aún no hay comentarios.', 'Комментариев пока нет.', 'Ainda não há comentários.', 'Noch keine Kommentare.', '暂无评论。'],
  ['Messagerie', 'Messages', 'Mensajería', 'Сообщения', 'Mensagens', 'Nachrichten', '消息'],
  ['Échangez directement avec l’équipe B&G Shop.', 'Chat directly with the B&G Shop team.', 'Habla directamente con el equipo de B&G Shop.', 'Общайтесь напрямую с командой B&G Shop.', 'Converse diretamente com a equipe B&G Shop.', 'Schreibe direkt mit dem B&G-Shop-Team.', '与 B&G Shop 团队直接交流。'],
  ['Discussions', 'Conversations', 'Conversaciones', 'Диалоги', 'Conversas', 'Unterhaltungen', '对话'],
  ['Vous devez être connecté pour accéder à votre messagerie.', 'You must be signed in to access your messages.', 'Debes iniciar sesión para acceder a tus mensajes.', 'Войдите, чтобы просматривать сообщения.', 'Entre na sua conta para acessar suas mensagens.', 'Melde dich an, um deine Nachrichten aufzurufen.', '登录后即可查看消息。'],
  ['Écrivez votre message...', 'Write your message...', 'Escribe tu mensaje...', 'Введите сообщение...', 'Escreva sua mensagem...', 'Nachricht schreiben...', '输入消息...'],
  ['Envoyer', 'Send', 'Enviar', 'Отправить', 'Enviar', 'Senden', '发送'],
  ['Aucune discussion pour le moment.', 'No conversations yet.', 'Aún no hay conversaciones.', 'Диалогов пока нет.', 'Ainda não há conversas.', 'Noch keine Unterhaltungen.', '暂无对话。'],
  ['Aucun message envoyé', 'No messages sent', 'No se han enviado mensajes', 'Сообщений пока нет', 'Nenhuma mensagem enviada', 'Noch keine Nachrichten gesendet', '尚未发送消息'],
  ['Discussion avec B&G Shop', 'Conversation with B&G Shop', 'Conversación con B&G Shop', 'Диалог с B&G Shop', 'Conversa com a B&G Shop', 'Unterhaltung mit B&G Shop', '与 B&G Shop 对话'],
  ['Support client interne', 'Customer support', 'Atención al cliente', 'Поддержка клиентов', 'Atendimento ao cliente', 'Kundenservice', '客户支持'],
  ['Bienvenue dans la messagerie', 'Welcome to messages', 'Te damos la bienvenida a mensajería', 'Добро пожаловать в сообщения', 'Bem-vindo às mensagens', 'Willkommen bei den Nachrichten', '欢迎使用消息功能'],
  ['Sélectionnez une discussion à gauche pour répondre.', 'Select a conversation on the left to reply.', 'Selecciona una conversación a la izquierda para responder.', 'Выберите диалог слева, чтобы ответить.', 'Selecione uma conversa à esquerda para responder.', 'Wähle links eine Unterhaltung aus, um zu antworten.', '选择左侧对话并回复。'],
  ['Aucune discussion sélectionnée.', 'No conversation selected.', 'No hay ninguna conversación seleccionada.', 'Диалог не выбран.', 'Nenhuma conversa selecionada.', 'Keine Unterhaltung ausgewählt.', '未选择对话。'],
  ['Votre sélection', 'Your selection', 'Tu selección', 'Ваша подборка', 'Sua seleção', 'Deine Auswahl', '你的选择'],
  ['Total', 'Total', 'Total', 'Итого', 'Total', 'Gesamt', '合计'],
  ['Confirmer l’achat', 'Confirm purchase', 'Confirmar compra', 'Подтвердить покупку', 'Confirmar compra', 'Kauf bestätigen', '确认购买'],
  ['Votre panier est vide.', 'Your cart is empty.', 'Tu carrito está vacío.', 'Корзина пуста.', 'Seu carrinho está vazio.', 'Dein Warenkorb ist leer.', '购物车为空。'],
  ['Retirer', 'Remove', 'Quitar', 'Удалить', 'Remover', 'Entfernen', '移除'],
  ['Détails du produit', 'Product details', 'Detalles del producto', 'Информация о товаре', 'Detalhes do produto', 'Produktdetails', '商品详情'],
  ['Articles similaires', 'Similar items', 'Artículos similares', 'Похожие товары', 'Produtos semelhantes', 'Ähnliche Artikel', '相似商品'],
  ['Nom complet *', 'Full name *', 'Nombre completo *', 'Полное имя *', 'Nome completo *', 'Vollständiger Name *', '姓名 *'],
  ['Numéro de téléphone *', 'Phone number *', 'Número de teléfono *', 'Номер телефона *', 'Número de telefone *', 'Telefonnummer *', '电话号码 *'],
  ['Adresse de livraison *', 'Delivery address *', 'Dirección de entrega *', 'Адрес доставки *', 'Endereço de entrega *', 'Lieferadresse *', '收货地址 *'],
  ['Mode de paiement *', 'Payment method *', 'Método de pago *', 'Способ оплаты *', 'Forma de pagamento *', 'Zahlungsart *', '付款方式 *'],
  ['Paiement à la livraison', 'Cash on delivery', 'Pago contra entrega', 'Оплата при получении', 'Pagamento na entrega', 'Barzahlung bei Lieferung', '货到付款'],
  ['Vous payerez à la livraison', 'You will pay upon delivery', 'Pagarás al recibirlo', 'Оплата при доставке', 'Você pagará na entrega', 'Du zahlst bei Lieferung', '送货时付款'],
  ['Envoyer la commande', 'Submit order', 'Enviar pedido', 'Отправить заказ', 'Enviar pedido', 'Bestellung senden', '提交订单'],
  ['Annuler', 'Cancel', 'Cancelar', 'Отмена', 'Cancelar', 'Abbrechen', '取消'],
  ['Produit non trouvé', 'Product not found', 'Producto no encontrado', 'Товар не найден', 'Produto não encontrado', 'Produkt nicht gefunden', '未找到商品'],
  ['Aucun article similaire', 'No similar items', 'No hay artículos similares', 'Похожих товаров нет', 'Nenhum produto semelhante', 'Keine ähnlichen Artikel', '没有相似商品'],
  ['Appeler le support', 'Call support', 'Llamar a soporte', 'Позвонить в поддержку', 'Ligar para o suporte', 'Support anrufen', '联系支持'],
  ['Contacter via WhatsApp', 'Contact via WhatsApp', 'Contactar por WhatsApp', 'Связаться через WhatsApp', 'Falar pelo WhatsApp', 'Per WhatsApp kontaktieren', '通过 WhatsApp 联系'],
  ['Vous devez être connecté pour passer une commande.', 'You must be signed in to place an order.', 'Debes iniciar sesión para hacer un pedido.', 'Войдите, чтобы оформить заказ.', 'Entre na sua conta para fazer um pedido.', 'Melde dich an, um eine Bestellung aufzugeben.', '登录后即可下单。'],
  ['Nom complet', 'Full name', 'Nombre completo', 'Полное имя', 'Nome completo', 'Vollständiger Name', '姓名'],
  ['Téléphone', 'Phone', 'Teléfono', 'Телефон', 'Telefone', 'Telefon', '电话'],
  ['Adresse de livraison', 'Delivery address', 'Dirección de entrega', 'Адрес доставки', 'Endereço de entrega', 'Lieferadresse', '收货地址'],
  ['Afficher le mot de passe', 'Show password', 'Mostrar contraseña', 'Показать пароль', 'Mostrar senha', 'Passwort anzeigen', '显示密码'],
  ['Mot de passe', 'Password', 'Contraseña', 'Пароль', 'Senha', 'Passwort', '密码'],
  ['Photo de profil (facultatif)', 'Profile photo (optional)', 'Foto de perfil (opcional)', 'Фото профиля (необязательно)', 'Foto de perfil (opcional)', 'Profilbild (optional)', '头像（可选）'],
  ['S\'inscrire', 'Sign up', 'Registrarse', 'Зарегистрироваться', 'Cadastrar-se', 'Registrieren', '注册'],
  ['Pas encore de compte?', 'Don’t have an account yet?', '¿Aún no tienes una cuenta?', 'Ещё нет аккаунта?', 'Ainda não tem uma conta?', 'Noch kein Konto?', '还没有账户？'],
  ['Déjà inscrit?', 'Already registered?', '¿Ya tienes una cuenta?', 'Уже зарегистрированы?', 'Já tem uma conta?', 'Bereits registriert?', '已经注册？'],
  ['Votre nom complet', 'Your full name', 'Tu nombre completo', 'Ваше полное имя', 'Seu nome completo', 'Dein vollständiger Name', '你的全名'],
  ['exemple@email.com', 'example@email.com', 'ejemplo@email.com', 'пример@email.com', 'exemplo@email.com', 'beispiel@email.com', '示例@email.com'],
  ['Veuillez remplir tous les champs', 'Please fill in all fields', 'Completa todos los campos', 'Заполните все поля', 'Preencha todos os campos', 'Bitte alle Felder ausfüllen', '请填写所有字段'],
  ['L\'adresse mail invalide', 'Invalid email address', 'La dirección de correo no es válida', 'Неверный адрес электронной почты', 'Endereço de e-mail inválido', 'Ungültige E-Mail-Adresse', '邮箱地址无效'],
  ['Le nom est requis', 'Name is required', 'El nombre es obligatorio', 'Требуется имя', 'O nome é obrigatório', 'Name ist erforderlich', '姓名为必填项'],
  ['L\'email est requis', 'Email is required', 'El correo electrónico es obligatorio', 'Требуется электронная почта', 'O e-mail é obrigatório', 'E-Mail ist erforderlich', '邮箱为必填项'],
  ['Le mot de passe doit contenir au moins 6 caractères', 'Password must be at least 6 characters', 'La contraseña debe tener al menos 6 caracteres', 'Пароль должен содержать не менее 6 символов', 'A senha deve ter pelo menos 6 caracteres', 'Das Passwort muss mindestens 6 Zeichen lang sein', '密码至少需要 6 个字符'],
  ['Les mots de passe ne correspondent pas', 'Passwords do not match', 'Las contraseñas no coinciden', 'Пароли не совпадают', 'As senhas não coincidem', 'Passwörter stimmen nicht überein', '两次输入的密码不一致'],
  ['Création du compte...', 'Creating account...', 'Creando cuenta...', 'Создание аккаунта...', 'Criando conta...', 'Konto wird erstellt...', '正在创建账户...'],
  ['Email ou mot de passe incorrect', 'Incorrect email or password', 'Correo o contraseña incorrectos', 'Неверный адрес или пароль', 'E-mail ou senha incorretos', 'E-Mail oder Passwort falsch', '邮箱或密码错误'],
  ['Vérifiez votre adresse email pour activer le compte.', 'Check your email to activate your account.', 'Revisa tu correo para activar la cuenta.', 'Проверьте почту, чтобы активировать аккаунт.', 'Verifique seu e-mail para ativar a conta.', 'Prüfe deine E-Mail, um dein Konto zu aktivieren.', '请查收邮件以激活账户。'],
  ['Compte créé. Consultez votre boîte mail et confirmez votre adresse avant de vous connecter.', 'Account created. Check your inbox and confirm your address before signing in.', 'Cuenta creada. Revisa tu correo y confirma tu dirección antes de iniciar sesión.', 'Аккаунт создан. Подтвердите адрес в письме перед входом.', 'Conta criada. Confirme seu endereço pelo e-mail antes de entrar.', 'Konto erstellt. Bestätige deine E-Mail-Adresse vor der Anmeldung.', '账户已创建。请先查收邮件并确认地址，然后登录。'],
  ['Email déjà utilisé', 'Email already in use', 'Correo electrónico ya utilizado', 'Электронная почта уже используется', 'E-mail já está em uso', 'E-Mail bereits vergeben', '邮箱已被使用'],
  ['Enregistrer', 'Save', 'Guardar', 'Сохранить', 'Guardar', 'Speichern', '保存'],
  ['Préférences enregistrées.', 'Preferences saved.', 'Preferencias guardadas.', 'Настройки сохранены.', 'Preferências salvas.', 'Einstellungen gespeichert.', '偏好设置已保存。'],
  ['Votre panier est vide.', 'Your cart is empty.', 'Tu carrito está vacío.', 'Корзина пуста.', 'Seu carrinho está vazio.', 'Dein Warenkorb ist leer.', '购物车为空。'],
  ['Aucun message pour le moment. Envoyez votre premier message ci-dessous.', 'No messages yet. Send your first message below.', 'Aún no hay mensajes. Envía el primero a continuación.', 'Сообщений пока нет. Отправьте первое сообщение ниже.', 'Ainda não há mensagens. Envie a primeira abaixo.', 'Noch keine Nachrichten. Sende unten deine erste Nachricht.', '暂无消息，请在下方发送第一条消息。'],
  ['Aucun numéro MTN n\'est disponible pour le moment. Choisissez le paiement à la livraison.', 'No MTN number is available right now. Choose cash on delivery.', 'No hay ningún número MTN disponible. Elige pagar contra entrega.', 'Номер MTN пока недоступен. Выберите оплату при получении.', 'Nenhum número MTN disponível. Escolha pagamento na entrega.', 'Derzeit ist keine MTN-Nummer verfügbar. Wähle Barzahlung bei Lieferung.', '目前没有可用的 MTN 号码，请选择货到付款。'],
  ['Numéro de dépôt en cours de chargement...', 'Loading deposit number...', 'Cargando número de depósito...', 'Загрузка номера для перевода...', 'Carregando número para depósito...', 'Einzahlungsnummer wird geladen...', '正在加载存款号码...'],
  ['Aucune notification.', 'No notifications.', 'No hay notificaciones.', 'Нет уведомлений.', 'Nenhuma notificação.', 'Keine Benachrichtigungen.', '暂无通知。'],
  ['Aucune commande.', 'No orders.', 'No hay pedidos.', 'Заказов нет.', 'Nenhum pedido.', 'Keine Bestellungen.', '暂无订单。'],
  ['Aucun contenu pour le moment.', 'No content yet.', 'Aún no hay contenido.', 'Пока нет содержимого.', 'Ainda não há conteúdo.', 'Noch keine Inhalte.', '暂无内容。'],
  ['Gestion de la barre de publicité', 'Manage ad banner', 'Administrar la barra publicitaria', 'Управление рекламной панелью', 'Gerenciar a faixa de anúncios', 'Werbebanner verwalten', '管理广告栏'],
  ['Sélectionnez plusieurs vidéos. Elles seront lues automatiquement l\'une après l\'autre, sans son.', 'Select multiple videos. They will play automatically one after another, without sound.', 'Selecciona varios vídeos. Se reproducirán automáticamente uno tras otro, sin sonido.', 'Выберите несколько видео. Они будут воспроизводиться по очереди без звука.', 'Selecione vários vídeos. Eles serão reproduzidos em sequência, sem som.', 'Wähle mehrere Videos aus. Sie werden nacheinander ohne Ton abgespielt.', '选择多个视频，它们将自动依次播放且不带声音。'],
  ['Importer des vidéos publicitaires', 'Import ad videos', 'Importar vídeos publicitarios', 'Загрузить рекламные видео', 'Importar vídeos publicitários', 'Werbevideos importieren', '导入广告视频'],
  ['Importer les vidéos', 'Import videos', 'Importar vídeos', 'Загрузить видео', 'Importar vídeos', 'Videos importieren', '导入视频'],
  ['Enregistrer la sélection publicitaire', 'Save ad selection', 'Guardar selección publicitaria', 'Сохранить выбор рекламы', 'Salvar seleção de anúncios', 'Werbeauswahl speichern', '保存广告选择'],
  ['Changer le mot de passe admin', 'Change admin password', 'Cambiar contraseña de administrador', 'Изменить пароль администратора', 'Alterar senha do administrador', 'Admin-Passwort ändern', '更改管理员密码'],
  ['Notifier tous les utilisateurs', 'Notify all users', 'Notificar a todos los usuarios', 'Уведомить всех пользователей', 'Notificar todos os usuários', 'Alle Benutzer benachrichtigen', '通知所有用户'],
  ['Envoyer la notification', 'Send notification', 'Enviar notificación', 'Отправить уведомление', 'Enviar notificação', 'Benachrichtigung senden', '发送通知'],
  ['Demandes envoyées par les utilisateurs.', 'Requests sent by users.', 'Solicitudes enviadas por los usuarios.', 'Запросы пользователей.', 'Solicitações enviadas pelos usuários.', 'Anfragen von Benutzern.', '用户提交的请求。'],
  ['Arrière-plan du site', 'Site background', 'Fondo del sitio', 'Фон сайта', 'Fundo do site', 'Website-Hintergrund', '网站背景'],
  ['Arrière-plan de la messagerie', 'Messaging background', 'Fondo de mensajes', 'Фон сообщений', 'Fundo das mensagens', 'Nachrichtenhintergrund', '消息背景'],
  ['Langue du site', 'Site language', 'Idioma del sitio', 'Язык сайта', 'Idioma do site', 'Website-Sprache', '网站语言'],
  ['Tableau de bord', 'Dashboard', 'Panel de control', 'Панель управления', 'Painel', 'Dashboard', '管理面板'],
  ['Ajouter un article', 'Add an item', 'Añadir un artículo', 'Добавить товар', 'Adicionar produto', 'Artikel hinzufügen', '添加商品'],
  ['Gérer les articles', 'Manage items', 'Gestionar artículos', 'Управление товарами', 'Gerenciar produtos', 'Artikel verwalten', '管理商品'],
  ['Commandes', 'Orders', 'Pedidos', 'Заказы', 'Pedidos', 'Bestellungen', '订单'],
  ['Ajouter un nouvel article', 'Add a new item', 'Añadir un artículo nuevo', 'Добавить новый товар', 'Adicionar novo produto', 'Neuen Artikel hinzufügen', '添加新商品'],
  ['Catégorie *', 'Category *', 'Categoría *', 'Категория *', 'Categoria *', 'Kategorie *', '分类 *'],
  ['Prix (FCFA) *', 'Price (FCFA) *', 'Precio (FCFA) *', 'Цена (FCFA) *', 'Preço (FCFA) *', 'Preis (FCFA) *', '价格 (FCFA) *'],
  ['Description *', 'Description *', 'Descripción *', 'Описание *', 'Descrição *', 'Beschreibung *', '商品描述 *'],
  ['Réinitialiser', 'Reset', 'Restablecer', 'Сбросить', 'Redefinir', 'Zurücksetzen', '重置'],
  ['Vidéos courtes', 'Short videos', 'Vídeos cortos', 'Короткие видео', 'Vídeos curtos', 'Kurzvideos', '短视频'],
  ['Fichier vidéo *', 'Video file *', 'Archivo de vídeo *', 'Видеофайл *', 'Arquivo de vídeo *', 'Videodatei *', '视频文件 *'],
  ['Publier la vidéo', 'Publish video', 'Publicar vídeo', 'Опубликовать видео', 'Publicar vídeo', 'Video veröffentlichen', '发布视频'],
  ['Accès réservé aux administrateurs', 'Administrator access only', 'Acceso solo para administradores', 'Доступ только для администратора', 'Acesso restrito a administradores', 'Nur für Administratoren', '仅限管理员访问'],
  ['Voir', 'View', 'Ver', 'Посмотреть', 'Ver', 'Ansehen', '查看'],
  ['Modifier', 'Edit', 'Editar', 'Изменить', 'Editar', 'Bearbeiten', '编辑'],
  ['Supprimer', 'Delete', 'Eliminar', 'Удалить', 'Excluir', 'Löschen', '删除']
];
const languageIndexes = { en: 1, es: 2, ru: 3, pt: 4, de: 5, zh: 6 };
const interfaceTranslations = Object.fromEntries(Object.entries(languageIndexes).map(([language, index]) => [
  language,
  Object.fromEntries(interfacePhrases.map((phrase) => [phrase[0], phrase[index]]))
]));
let interfaceLanguage = 'fr';
const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();

function translateTextNode(node) {
  if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
  const source = originalTextNodes.get(node);
  const phrase = source.trim();
  const count = phrase.match(/^(\d+)\s+(articles?)$/);
  const translated = count
    ? `${count[1]} ${interfaceTranslations[interfaceLanguage]?.[count[2]] || count[2]}`
    : interfaceTranslations[interfaceLanguage]?.[phrase];
  const localizedValue = translated ? source.replace(phrase, translated) : interfaceLanguage === 'fr' ? source : node.nodeValue;
  if (node.nodeValue !== localizedValue) node.nodeValue = localizedValue;
}

function translateElement(element) {
  if (element.nodeType !== Node.ELEMENT_NODE || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(element.tagName)) return;
  const translateAttributes = (target) => {
    let originals = originalAttributes.get(target);
    if (!originals) {
      originals = new Map();
      originalAttributes.set(target, originals);
    }
    for (const attribute of ['placeholder', 'title', 'aria-label', 'alt']) {
      if (!target.hasAttribute(attribute)) continue;
      if (!originals.has(attribute)) originals.set(attribute, target.getAttribute(attribute));
      const source = originals.get(attribute);
      const translated = interfaceTranslations[interfaceLanguage]?.[source.trim()];
      const localizedValue = translated ? source.replace(source.trim(), translated) : interfaceLanguage === 'fr' ? source : target.getAttribute(attribute);
      if (target.getAttribute(attribute) !== localizedValue) target.setAttribute(attribute, localizedValue);
    }
  };
  translateAttributes(element);
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    if (walker.currentNode.nodeType === Node.ELEMENT_NODE) translateAttributes(walker.currentNode);
    else translateTextNode(walker.currentNode);
  }
}

function applySiteLanguage(language) {
  interfaceLanguage = languageIndexes[language] ? language : 'fr';
  document.documentElement.lang = interfaceLanguage;
  translateElement(document.body);
}

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
      if (error) {
        const rateLimitMessage = error.code === 'over_email_send_rate_limit'
          || error.message?.toLowerCase().includes('email rate limit');
        return {
          success: false,
          message: rateLimitMessage
            ? 'Limite d’emails atteinte. Attendez quelques minutes ou désactivez la confirmation email dans Supabase pour les tests.'
            : error.message
        };
      }
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
    localStorage.setItem('bgshop_language', settings.language || 'fr');
    this.applyUserSettings(settings);
    applySiteLanguage(settings.language || 'fr');
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

  async deleteCompletedOrder(orderId) {
    const orders = this.getOrders();
    const order = orders.find((item) => String(item.id) === String(orderId));
    if (!order || order.status !== 'completed') {
      throw new Error('Seules les commandes complétées peuvent être supprimées.');
    }

    const user = this.checkAuth();
    if (!user || user.role !== 'admin') throw new Error('Seul un administrateur peut supprimer une commande.');

    const client = window.bgSupabase?.getClient();
    if (client) {
      const { data, error } = await client.from('orders').delete().eq('id', orderId).eq('status', 'completed').select('id');
      if (error) throw new Error(`Impossible de supprimer la commande : ${error.message}`);
      if (!data?.length) throw new Error('La commande n’est plus complétée ou a déjà été supprimée.');
    }

    localStorage.setItem('bgshop_orders', JSON.stringify(orders.filter((item) => String(item.id) !== String(orderId))));
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
  applySiteLanguage(user ? app.getUserSettings(user.email).language : localStorage.getItem('bgshop_language') || 'fr');
  const languageObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') translateTextNode(mutation.target);
      for (const node of mutation.addedNodes || []) {
        if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
        else if (node.nodeType === Node.ELEMENT_NODE) translateElement(node);
      }
      if (mutation.type === 'attributes') translateElement(mutation.target);
    }
  });
  languageObserver.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label', 'alt'] });
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
