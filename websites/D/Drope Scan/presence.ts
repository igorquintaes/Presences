const presence = new Presence({
    clientId: "572793863354187803"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "drope_s",
      startTimestamp: browsingStamp
    },
    pathname = document.location.pathname,
    hostname = document.location.hostname;

  if (hostname === "dropescan.com" || hostname === "www.dropescan.com") {    
    presenceData.details = "Vendo:";
    presenceData.state = "Website Drope Scan";

    if (document.querySelector(".manga-search-form") != null)
    {
        const searchState = document.querySelector(".search-wrap li.active a").textContent.trim(),
              keywordInput = document.querySelector(".manga-search-form input[type=text]").getAttribute("value"),
              keyword = keywordInput == "" ? "Todos resultados" : keywordInput;

        presenceData.details = "Busca: " + searchState;
        presenceData.state = keyword;
    }

    if (pathname.startsWith("/manga")) {
      presenceData.details = "Vendo:";
      presenceData.state = "Lista de Mangás";
      
      if (document.querySelector(".profile-manga") != null) {
        const information = document.querySelector(".post-title h1").textContent.trim();
        presenceData.details = "Vendo Mangá:";
        presenceData.state = information;
      }

      if (document.querySelector("#manga-reading-nav-head") != null) {
        const mangaProperties = document
                .querySelector("meta[property='og:title']")
                .getAttribute("content"),
              mangaName = mangaProperties.split(" - ")[0],
              chapterName = mangaProperties.split(" - ")[1];
        
        presenceData.details = mangaName;
        presenceData.state = "Capítulo: " + chapterName;
      }
    }

    if (pathname.startsWith("/blog")) {
      presenceData.details = "Vendo:";
      presenceData.state = "Postagens do Blog";
    }

    if (document.querySelector(".site-content div.type-post[id*=post-]") != null &&
        document.querySelector(".entry-header h2") != null) {
      presenceData.details = "Lendo notícia:";
      presenceData.state = document.querySelector(".entry-header h2").textContent.trim();
    }

    if (pathname.startsWith("/recrutamento")) {
      presenceData.details = "Vendo:";
      presenceData.state = "Recrutamento";
    }

    if (pathname.startsWith("/fale-conosco")) {
      presenceData.details = "Vendo:";
      presenceData.state = "Fale Conosco";
    }

    if (pathname.startsWith("/faq")) {
      presenceData.details = "Vendo:";
      presenceData.state = "FAQ";
    }

    if (pathname.startsWith("/politica-de-privacidade")) {
      presenceData.details = "Vendo:";
      presenceData.state = "Política de Privacidade";
    }

    if (pathname.startsWith("/doacoes")) {
      presenceData.details = "Vendo:";
      presenceData.state = "Doações";
    }

    if (pathname.startsWith("/user-settings")) {
      presenceData.details = "Vendo:";
      presenceData.state = "Configurações de Usuário";
    }

    if (pathname.startsWith("/manga-tag")) {
      presenceData.details = "Pesquisando por Tag:";
      presenceData.state = document.querySelector("h1").innerText;
    }

    if (pathname.startsWith("/manga-genre")) {
      presenceData.details = "Pesquisando por Gênero:";
      presenceData.state = document.querySelector("h1").innerText;
    }

    if (pathname.startsWith("/manga-artist")) {
      presenceData.details = "Pesquisando por Desenhista:";
      presenceData.state = document.querySelector("h1").innerText;
    }

    if (pathname.startsWith("/manga-author")) {
      presenceData.details = "Pesquisando por Autor:";
      presenceData.state = document.querySelector("h1").innerText;
    }

    if (pathname.startsWith("/manga-author")) {
      presenceData.details = "Pesquisando por Data Lançamento:";
      presenceData.state = document.querySelector("h1").innerText;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
