<script>
    import { db } from "./lib/db";
    import { liveQuery } from "dexie";
    let name, age, email;

    function addItem() {
        db.people.add({ name, age, email });
    }
    let lowerNamePattern = "a";

    $: peopleList = liveQuery(async () => {
        const coll = db.people
            .where("name")
            .startsWithIgnoreCase(lowerNamePattern);
        return await coll.toArray();
    });
</script>

<input type="text" id="name" bind:value={name} />
<input type="text" id="age" bind:value={age} />
<input type="text" id="email" bind:value={email} />

{name}
{age}
{email}

<button on:click={addItem}> </button>

<input type="text" bind:value={lowerNamePattern} />

{#if $peopleList}
    <ul>
        {#each $peopleList as person}
            <li>{person.name} - {person.age} - {person.email}</li>
        {/each}
    </ul>
{:else}
    <p>Loading data...</p>
    {JSON.stringify($peopleList)}
{/if}
