<script>
  // Import necessary functions and modules from Firebase and Svelte
  import {createUserWithEmailAndPassword} from 'firebase/auth';
  import {auth} from '../firebase';
  import { goto } from '$app/navigation';
  import authStore from '../stores/authStore';
  import { onDestroy } from 'svelte';
  
  // Declare variables to store user's email and password
  let email = "";
  let password = "";
  let confirmPassword = "";
  let loading = false;
  let error = "";
  
  // Function to handle the registration process when the form is submitted
  async function register(){
    if (password !== confirmPassword) {
      error = "Passwords do not match.";
      return;
    }
    
    if (password.length < 6) {
      error = "Password must be at least 6 characters long.";
      return;
    }
    
    loading = true;
    error = "";
    try { 
      // Attempt to create a new user account with the provided email and password
      await createUserWithEmailAndPassword(auth, email, password);
    } catch(err) {
      // If an error occurs during registration, show user-friendly error message
      if (err.code === 'auth/email-already-in-use') {
        error = "An account with this email already exists.";
      } else if (err.code === 'auth/weak-password') {
        error = "Password is too weak. Please choose a stronger password.";
      } else {
        error = "Failed to create account. Please try again.";
      }
      console.log(err);
    }
    loading = false;
  }
  
  // Subscribe to the authStore to check if the user is already logged in
  const sub = authStore.subscribe(async (info) => {
      // If the user is already logged in, redirect to the dashboard
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
  <title>Sign Up - My Dashboard</title>
</svelte:head>

<!-- The following HTML code creates the signup form -->
<div class="container d-flex justify-content-center align-items-center min-vh-100">
  <div class="card shadow-lg" style="width: 28rem;">
    <div class="card-body p-5">
      <div class="text-center mb-4">
        <h2 class="card-title fw-bold">Create Account</h2>
        <p class="card-text text-muted">Join us and start tracking your progress</p>
      </div>
      
      {#if error}
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      {/if}
      
      <form on:submit|preventDefault={register}>
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
            placeholder="Create a password"
            required
          />
        </div>
        <!-- Input field for password confirmation -->
        <div class="mb-3">
          <label for="confirmPasswordInput" class="form-label">Confirm Password</label>
          <input
            bind:value={confirmPassword}
            type="password"
            class="form-control form-control-lg"
            id="confirmPasswordInput"
            placeholder="Confirm your password"
            required
          />
        </div>
        <div class="form-text mb-3">
          Your password must be at least 6 characters long.
        </div>
        <!-- Sign Up button to submit the form -->
        <button 
          type="submit" 
          class="btn btn-success btn-lg w-100 mb-3"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
    
    <!-- Link to the login page for existing users -->
    <div class="card-footer text-center bg-light">
      <small class="text-muted">
        Already have an account? <a href="/login" class="text-decoration-none">Sign in here</a>
      </small>
    </div>
  </div>
</div>