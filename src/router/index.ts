
import { createRouter, createWebHistory } from 'vue-router';
import BookListView from '../views/BookListView.vue';
import BookDetailView from '../views/BookDetailView.vue';
import AboutView from '../views/AboutView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/books',
    },
    {
      path: '/books',
      name: 'books',
      component: BookListView,
    },
    {
      path: '/books/:isbn',
      name: 'book-detail',
      component: BookDetailView,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
