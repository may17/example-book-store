
import { createRouter, createWebHistory } from 'vue-router';

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
      component: () => import('../views/BookListView.vue'),
    },
    {
      path: '/books/:isbn',
      name: 'book-detail',
      component: () => import('../views/BookDetailView.vue'),
      props: true,
    },
      {
      path: '/books/:isbn/edit',
      name: 'book-edit',
      component: () => import('../views/BookEditView.vue'),
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
});

export default router;
