<script lang="ts">
  import { addEventListener, QNotificationAction } from "../assets/event";

  let notificationPresent = false;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  let text = "";
  let action: QNotificationAction | undefined;

  addEventListener("notification", (event) => {
    text = event.text;
    action = event.action;
    notificationPresent = true;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      notificationPresent = false;
    }, 5000);
  });
</script>

<div class:notificationPresent class="notification">
  <span>{text}</span>
  {#if action}
    <div>
      <button on:click={action.action} disabled={!notificationPresent}
        >{action.text}</button
      >
    </div>
  {/if}
</div>

<style lang="scss">
  .notification {
    position: fixed;
    top: 1rem;
    right: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    color: var(--text-color);
    background-color: var(--bg-color-dark);
    opacity: 0;
    box-shadow: rgb(0 0 0 / 25%) 0 10px 15px;

    transition: all 0.1s ease-in-out;
    transform: translateX(50%);

    padding: 1rem;
    font-size: 15pt;

    &.notificationPresent {
      transform: translate(0);
      opacity: 1;
    }

    button {
      box-shadow: 0 5px 2px rgb(0 0 0 / 25%);
      transition: all 0.1s ease-in;
      text-transform: uppercase;
      border: none;
      font-size: 15pt;
      font-weight: bold;
      background-color: var(--bg-color-red);
      color: var(--text-color);
      padding: 1rem;

      &:hover {
        transform: translateY(-10%) scale(1.01, 1.01);
        box-shadow: 5px 10px 6px rgb(0 0 0 / 25%);
      }
    }
  }
</style>
