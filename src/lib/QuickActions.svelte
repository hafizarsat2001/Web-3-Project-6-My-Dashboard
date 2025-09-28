<script>
  import { addDoc, collection } from 'firebase/firestore';
  import { db } from '../firebase';
  import authStore from '../stores/authStore';
  
  let showModal = false;
  let actionTitle = '';
  let actionDescription = '';
  let loading = false;
  
  async function addQuickAction() {
    if (!actionTitle.trim()) return;
    
    loading = true;
    try {
      await addDoc(collection(db, 'activities'), {
        userId: $authStore.user.uid,
        title: actionTitle,
        description: actionDescription,
        timestamp: new Date(),
        type: 'quick_action'
      });
      
      actionTitle = '';
      actionDescription = '';
      showModal = false;
    } catch (error) {
      console.error('Error adding activity:', error);
    }
    loading = false;
  }
</script>

<div class="card h-100 shadow-sm border-0">
  <div class="card-header bg-transparent">
    <h5 class="card-title mb-0">
      <i class="bi bi-lightning me-2"></i>
      Quick Actions
    </h5>
  </div>
  <div class="card-body">
    <div class="d-grid gap-2">
      <button 
        class="btn btn-outline-primary" 
        on:click={() => showModal = true}
      >
        <i class="bi bi-plus-circle me-2"></i>
        Add Activity
      </button>
      <button class="btn btn-outline-success">
        <i class="bi bi-file-earmark-plus me-2"></i>
        Create Report
      </button>
      <button class="btn btn-outline-info">
        <i class="bi bi-gear me-2"></i>
        Settings
      </button>
    </div>
  </div>
</div>

<!-- Modal for adding activity -->
{#if showModal}
  <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Activity</h5>
          <button 
            type="button" 
            class="btn-close" 
            on:click={() => showModal = false}
          ></button>
        </div>
        <div class="modal-body">
          <form on:submit|preventDefault={addQuickAction}>
            <div class="mb-3">
              <label for="actionTitle" class="form-label">Title</label>
              <input 
                type="text" 
                class="form-control" 
                id="actionTitle"
                bind:value={actionTitle}
                required
              />
            </div>
            <div class="mb-3">
              <label for="actionDescription" class="form-label">Description</label>
              <textarea 
                class="form-control" 
                id="actionDescription"
                rows="3"
                bind:value={actionDescription}
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-secondary" 
            on:click={() => showModal = false}
          >
            Cancel
          </button>
          <button 
            type="button" 
            class="btn btn-primary" 
            on:click={addQuickAction}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Activity'}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}