<script>
  import { onMount } from 'svelte';
  import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
  import { db } from '../firebase';
  import authStore from '../stores/authStore';
  
  let activities = [];
  let unsubscribe = null;
  
  onMount(() => {
    if ($authStore.user) {
      const q = query(
        collection(db, 'activities'),
        orderBy('timestamp', 'desc'),
        limit(10)
      );
      
      unsubscribe = onSnapshot(q, (snapshot) => {
        activities = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate()
        }));
      });
    }
    
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });
  
  function formatTime(timestamp) {
    if (!timestamp) return '';
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }
</script>

<div class="card h-100 shadow-sm border-0">
  <div class="card-header bg-transparent">
    <h5 class="card-title mb-0">
      <i class="bi bi-activity me-2"></i>
      Recent Activity
    </h5>
  </div>
  <div class="card-body p-0">
    {#if activities.length > 0}
      <div class="list-group list-group-flush">
        {#each activities as activity}
          <div class="list-group-item border-0">
            <div class="d-flex justify-content-between align-items-start">
              <div class="flex-grow-1">
                <h6 class="mb-1">{activity.title}</h6>
                <p class="mb-1 text-muted small">{activity.description}</p>
              </div>
              <small class="text-muted">{formatTime(activity.timestamp)}</small>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center py-4">
        <i class="bi bi-inbox fs-1 text-muted"></i>
        <p class="text-muted mt-2">No recent activity</p>
      </div>
    {/if}
  </div>
</div>