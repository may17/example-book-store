<template>
  <div>
    <h1>404 - Seite nicht gefunden</h1>
    <p>Die gesuchte Seite existiert nicht.</p>
    <RouterLink :to="{ name: 'books' }">Zurück zur Startseite</RouterLink>
  </div>
</template>
