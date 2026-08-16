self.addEventListener(
  "push",
  function (event) {

    if (!event.data) {
      return;
    }

    const data =
      event.data.json();

    const titre =
      data.titre ||
      "Nouvelle notification";

    const options = {

      body:
        data.message ||
        "Vous avez une nouvelle notification.",

      icon:
        "/icon-192.png",

      badge:
        "/icon-192.png",

      tag:
        "notification-exebio",

      renotify:
        true,

      requireInteraction:
        false,

      data: {
        lien:
          data.lien ||
          "/index.html"
      }

    };


    event.waitUntil(

      self.registration.showNotification(
        titre,
        options
      )

    );

  }
);


self.addEventListener(
  "notificationclick",
  function (event) {

    event.notification.close();


    const lien =
      event.notification.data?.lien ||
      "/index.html";


    event.waitUntil(

      clients.matchAll({
        type: "window",
        includeUncontrolled: true
      }).then(
        function (clientList) {

          for (
            const client of clientList
          ) {

            if (
              "focus" in client
            ) {

              client.navigate(
                lien
              );

              return client.focus();

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
