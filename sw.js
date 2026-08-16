self.addEventListener("install", event => {

  console.log("Service Worker installé");

  self.skipWaiting();

});


self.addEventListener("activate", event => {

  console.log("Service Worker activé");

  event.waitUntil(
    self.clients.claim()
  );

});


self.addEventListener("push", event => {

  console.log("Notification push reçue");

  let donnees = {};

  if (event.data) {

    try {
      donnees = event.data.json();
    }

    catch (erreur) {

      donnees = {
        titre: "Nouvelle notification",
        message: event.data.text()
      };

    }

  }


  const titre =
    donnees.titre ||
    "Nouvelle notification";


  const options = {

    body:
      donnees.message ||
      "Vous avez une nouvelle notification.",

    icon:
      "/gestion-consommables/icon-192.png",

    badge:
      "/gestion-consommables/icon-192.png",

    vibrate: [
      200,
      100,
      200
    ],

    data: {

      lien:
        donnees.lien ||
        "/gestion-consommables/"

    }

  };


  event.waitUntil(

    self.registration.showNotification(
      titre,
      options
    )

  );

});


self.addEventListener(
  "notificationclick",
  event => {

    event.notification.close();


    const lien =
      event.notification.data?.lien ||
      "/gestion-consommables/";


    event.waitUntil(

      clients.matchAll({
        type: "window",
        includeUncontrolled: true
      }).then(
        fenetres => {

          for (
            const fenetre
            of fenetres
          ) {

            if (
              "focus" in fenetre
            ) {

              fenetre.focus();

              return fenetre.navigate(
                lien
              );

            }

          }


          if (
            clients.openWindow
          ) {

            return clients.openWindow(
              lien
            );

          }

        }
      )

    );

  }
);
