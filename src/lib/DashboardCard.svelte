<script>
  export let title = "";
  export let value = "";
  export let icon = "";
  export let color = "primary";
  export let trend = null; // { direction: 'up'|'down', percentage: number }
</script>

<div class="card h-100 shadow-sm border-0">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-start">
      <div>
        <h6 class="card-subtitle mb-2 text-muted">{title}</h6>
        <h2 class="card-title mb-0 text-{color}">{value}</h2>
        {#if trend}
          <small class="text-{trend.direction === 'up' ? 'success' : 'danger'}">
            <i class="bi bi-arrow-{trend.direction} me-1"></i>
            {trend.percentage}% from last month
          </small>
        {/if}
      </div>
      {#if icon}
        <div class="text-{color} opacity-75">
          <i class="bi bi-{icon} fs-1"></i>
        </div>
      {/if}
    </div>
  </div>
</div>