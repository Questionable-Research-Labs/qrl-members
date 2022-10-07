<script lang="ts">
  import { QChange, QNotification, addEventListener } from "../assets/event";
  import {
    getMembers,
    signInMember,
    undoSignIn,
    type Memeber,
  } from "../assets/db";
  import Fuse from "fuse.js";

  let members: Memeber[];
  let fuse: Fuse<Memeber>;
  let filteredList: string[] = [];
  let name = "";

  const updateMembers = async () => {
    const response = await getMembers();
    if (typeof response == "string") {
      new QNotification(
        "Could not fetch members, tring again in 30 seconds"
      ).dispatch();
      setTimeout(updateMembers, 30000);
    } else {
      members = response;
      fuse = new Fuse(response, {
        keys: ["name"],
      });
    }
  };

  setInterval(updateMembers, 86400000);

  updateMembers();

  $: if (name != "" && fuse) {
    console.log("we gaming");
    filteredList = fuse
      .search(name)
      .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
      .slice(0, 5)
      .map(({ item: { name } }) => name);
  } else {
    filteredList = [];
  }

  addEventListener("change", (event) => {
    if (event.qName != "member") {
      name = "";
    }
  });

  const signIn = (name: string) => async () => {
    const member = members.find(({ name: memberName }) => name == memberName);
    if (member) {
      const result = await signInMember(member.id);

      if (typeof result == "string") {
        new QNotification(`Error signing in ${result}`).dispatch();
        return;
      }

      const undoAction = async () => {
        const undoResult = await undoSignIn(result);

        (typeof undoResult == "string"
          ? new QNotification(`Cound not undo sign in ${undoResult}`, {
              text: "Try again",
              action: undoAction,
            })
          : new QNotification(`Successfully remove sign in for ${name}!`)
        ).dispatch();
      };

      new QNotification(`${name} signed in as a member!`, {
        action: undoAction,
        text: "Undo",
      }).dispatch();

      new QChange("main").dispatch();
    }
  };
</script>

<input type="text" bind:value={name} />

<div class="names">
  {#each filteredList as name}
    <button on:click={signIn(name)}>{name}</button>
  {/each}
</div>

{#if filteredList.length != 5 && name != ""}
  <button
    class="not-showing"
    on:click={() => {
      new QChange("guest").dispatch();
    }}>Not showing?</button
  >
{/if}

<style lang="scss">
  input {
    font-size: 20pt;
    padding: 1rem;
    width: 90%;
    background-color: var(--bg-color);
    outline: 5px solid rgb(0 0 0 / 5%);
    border: none;
    color: var(--text-color);
    text-align: center;

    &:focus-visible {
      outline: 7px solid rgb(0 0 0 / 15%);
    }
  }

  .names {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    background-color: var(--bg-color);
  }

  button {
    font-size: 18pt;
    font-weight: bold;
    height: 4rem;
    color: var(--text-color-dark);
    transition: all 0.1s ease-in-out;
    border: none;
    background: none;

    &:hover {
      color: var(--text-color);
      transform: scale(1.05, 1.05);
    }
  }

  .not-showing {
    color: var(--text-color);
    background-color: var(--bg-color-red);
    text-transform: uppercase;
    width: 80%;
    box-shadow: 0 5px 2px rgb(0 0 0 / 25%);

    &:hover {
      box-shadow: 5px 10px 6px rgb(0 0 0 / 25%);
    }
  }
</style>
