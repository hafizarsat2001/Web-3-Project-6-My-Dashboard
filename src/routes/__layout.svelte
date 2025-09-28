<script>
  import { onMount } from 'svelte';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth } from '../firebase';
  import authStore from '../stores/authStore';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  
  let currentPath;
  page.subscribe((p) => {
    currentPath = p.url.pathname;
  });
  
  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        $authStore.isLoggedIn = true;
        $authStore.firebaseControlled = true;
        $authStore.user = user;
        
        // Redirect to dashboard if on auth pages
        if (currentPath === '/login' || currentPath === '/signup') {
          goto('/');
        }
      } else {
        $authStore.isLoggedIn = false;
        $authStore.firebaseControlled = true;
        $authStore.user = null;
        
        // Redirect to login if on protected pages
        if (currentPath === '/') {
          goto('/login');
        }
      }
    });
    
    return unsubscribe;
  });
</script>

<main>
  <slot />
</main>