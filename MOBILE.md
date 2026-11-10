# Application mobile B&G Shop

L'application Android et iOS réutilise les pages web du projet avec Capacitor. Les fichiers copiés dans `www/` sont générés par la préparation mobile et ne sont pas à modifier directement.

## Préparer le projet

```sh
npm install
npm run mobile:prepare
npx cap add android
npx cap add ios
```

Les projets natifs sont créés une seule fois. Après une modification des pages ou des ressources web, synchronisez-les avec :

```sh
npm run mobile:sync
```

## Ouvrir les projets natifs

```sh
npm run mobile:android
npm run mobile:ios
```

## Compiler un APK Android

Dans le Codespace configuré, synchronisez les pages puis lancez Gradle avec le JDK 21 et le SDK Android installés dans l'environnement :

```sh
npm run mobile:sync
cd android
JAVA_HOME=/usr/local/sdkman/candidates/java/21.0.12+1-ms \
ANDROID_HOME="$HOME/Android/Sdk" \
ANDROID_SDK_ROOT="$HOME/Android/Sdk" \
./gradlew assembleDebug
```

L'APK de débogage est généré dans `android/app/build/outputs/apk/debug/app-debug.apk`. Android Studio est facultatif pour cette compilation en ligne de commande. Pour publier sur Google Play, il faudra générer une version de production signée et disposer d'un compte Google Play Developer.

La compilation et la signature iOS nécessitent macOS avec Xcode. Un compte Apple Developer est requis pour publier sur l'App Store.

L'identifiant d'application initial est `com.bgshop.app`; il doit être confirmé ou remplacé avant la première publication. Les pages continuent de charger Supabase et les bibliothèques hébergées en ligne, une connexion Internet est donc nécessaire pour ces services.