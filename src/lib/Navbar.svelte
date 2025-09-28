<script>
  import { signOut } from 'firebase/auth';
  import { auth } from '../firebase';
  import authStore from '../stores/authStore';
  import { goto } from '$app/navigation';
  
  async function logout() {
    try {
      await signOut(auth);
      $authStore.isLoggedIn = false;
      $authStore.firebaseControlled = false;
      await goto('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
  <div class="container">
    <a class="navbar-brand fw-bold" href="/">
      <i class="bi bi-speedometer2 me-2"></i>
      My Dashboard
    </a>
    
    <button 
      class="navbar-toggler" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="/">
            <i class="bi bi-house me-1"></i>
            Dashboard
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/analytics">
            <i class="bi bi-graph-up me-1"></i>
            Analytics
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/profile">
            <i class="bi bi-person me-1"></i>
            Profile
          </a>
        </li>
      </ul>
      
      <div class="navbar-nav">
        <div class="nav-item dropdown">
          <a 
            class="nav-link dropdown-toggle" 
            href="#" 
            role="button" 
            data-bs-toggle="dropdown"
          >
            <i class="bi bi-person-circle me-1"></i>
            {$authStore.user?.email || 'User'}
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/profile">Profile Settings</a></li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <button class="dropdown-item" on:click={logout}>
                <i class="bi bi-box-arrow-right me-1"></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</nav>