<script lang="ts">
  import { QChangeEvent, QNotification } from "../assets/app";
  import {
    getMembers,
    signInMember,
    undoSignIn,
    type Memeber,
  } from "../assets/db";
  import Fuse from "fuse.js";

  let members: Memeber[];

  const updateMembers = async () => {
    const response = await getMembers();
    if (typeof response == "string") {
      document.dispatchEvent(
        new QNotification("Could not fetch members, tring again in 30 seconds")
      );
      setTimeout(updateMembers, 30000);
    } else {
      members = response;
    }
  };

  setInterval(updateMembers, 86400000);

  updateMembers();

  let name = "";

  let fuse: Fuse<Memeber>;

  $: if (members) {
    console.log("Setting new members");
    fuse = new Fuse(members, {
      keys: ["name"],
    });
  }

  let filteredList: string[] = [];

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

  document.addEventListener("q-change", (event) => {
    if ((event as QChangeEvent).name != "member") {
      name = "";
    }
  });

  const signIn = (name: string) => async () => {
    const member = members.find(({ name: memberName }) => name == memberName);
    if (member) {
      const result = await signInMember(member.id);

      if (typeof result == "string") {
        document.dispatchEvent(new QNotification(`Error signing in ${result}`));
        return;
      }

      const undoAction = async () => {
        const undoResult = await undoSignIn(result);

        if (typeof undoResult == "string") {
          document.dispatchEvent(
            new QNotification(`Cound not undo sign in ${undoResult}`, {
              text: "Try again",
              action: undoAction,
            })
          );
        }

        document.dispatchEvent(
          new QNotification(`Successfully remove sign in for ${name}!`)
        );
      };

      document.dispatchEvent(
        new QNotification(`${name} signed in as a member!`, {
          action: undoAction,
          text: "Undo",
        })
      );

      document.dispatchEvent(new QChangeEvent("main"));
    }
  };
</script>

<input type="text" bind:value={name} />

<div class="names">
  {#each filteredList as name}
    <button on:click={signIn(name)}>{name}</button>
  {/each}
  {#if filteredList.length != 5 && name != ""}
    <button
      class="not-showing"
      on:click={() => {
        document.dispatchEvent(new QChangeEvent("guest"));
      }}>Not showing?</button
    >
  {/if}
</div>

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
    width: 100%;

    button {
      font-size: 18pt;
      font-weight: bold;
      border: 5px solid #252a31;
      width: 90%;
      height: 4rem;
      color: var(--text-color);
      transition: all 0.1s ease-in-out;

      &:nth-child(even) {
        background-color: var(--bg-color);
      }

      &:nth-child(odd) {
        background-color: var(--bg-color-light);
      }

      &:hover {
        transform: scale(1.1, 1.1);
      }
    }

    .not-showing {
      color: var(--text-color-dark);
      text-transform: uppercase;
      margin-top: 1rem;
      border-bottom: 5px solid #252a31;
    }
  }
</style>
