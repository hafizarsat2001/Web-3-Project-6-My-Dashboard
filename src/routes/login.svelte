<script> 
  // Import necessary functions and modules from Firebase and Svelte
  import {signInWithEmailAndPassword} from 'firebase/auth';
  import {auth} from '../firebase';
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';
  import authStore from '../stores/authStore';

  // Declare variables to store user's email and password
  let email = "";
  let password = "";
  let loading = false;
  let error = "";

  // Function to handle the login process when the form is submitted
  async function login(){
    loading = true;
    error = "";
    try { 
      // Attempt to log in the user using the provided email and password
      await signInWithEmailAndPassword(auth, email, password);
    } catch(err) {
      // If an error occurs during login, show user-friendly error message
      error = "Invalid email or password. Please try again.";
      console.log(err);
    }
    loading = false;
  }

  // Subscribe to the authStore to check if the user is already logged in
  const sub = authStore.subscribe(async (info) => {
    // If the user is logged in, redirect to the home page
    if (info.isLoggedIn) {
      await goto('/');
    }
  });

  // Unsubscribe from the authStore when the component is destroyed
  onDestroy(() => {
    sub();
  });
</script>

<svelte:head>
  <title>Login - My Dashboard</title>
</svelte:head>

<!-- The following HTML code creates the login form -->
<div class="container d-flex justify-content-center align-items-center min-vh-100">
  <div class="card shadow-lg" style="width: 28rem;">
    <div class="card-body p-5">
      <div class="text-center mb-4">
        <h2 class="card-title fw-bold">Welcome Back</h2>
        <p class="card-text text-muted">Please log-in to continue to your dashboard</p>
      </div>
      
      {#if error}
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      {/if}
      
      <form on:submit|preventDefault={login}>
        <!-- Input field for the user's email -->
        <div class="mb-3">
          <label for="emailInput" class="form-label">Email address</label>
          <input 
            bind:value={email} 
            type="email" 
            class="form-control form-control-lg" 
            id="emailInput" 
            placeholder="Enter your email"
            required
          />
        </div>
        <!-- Input field for the user's password -->
        <div class="mb-3">
          <label for="passwordInput" class="form-label">Password</label>
          <input
            bind:value={password}
            type="password"
            class="form-control form-control-lg"
            id="passwordInput"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="form-text mb-3">
          Your password must be at least 6 characters long.
        </div>
        <!-- Login button to submit the form -->
        <button 
          type="submit" 
          class="btn btn-primary btn-lg w-100 mb-3"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
    
    <!-- Link to the registration page for new users -->
    <div class="card-footer text-center bg-light">
      <small class="text-muted">
        First time? <a href="/signup" class="text-decoration-none">Create an account</a>
      </small>
    </div>
  </div>
</div>