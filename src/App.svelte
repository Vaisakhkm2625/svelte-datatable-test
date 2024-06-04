<script lang="ts">
    import { onMount } from "svelte";
    import { db, addJSONData, addData, deleteData } from "./lib/db";
    import { liveQuery } from "dexie";
    let name, age, email;

    //function addItem() {
    //    db.people.add({ name, age, email });
    //}
    let firstNameSearch = "a";
    let lastNameSearch = "a";

    let idstart = 1;

    let rowsPerPage = 10;

    $: peopleList = liveQuery(async () => {
        const coll = db.contacts
            .where("first_name")
            .startsWithIgnoreCase(firstNameSearch)
            //.and((person) => person.id <= idstart + rowsPerPage);
            .and((person) =>
                person.last_name.ignoreCase().startsWith(lastNameSearch),
            );

        //.or("last_name")
        //.startsWithIgnoreCase(lowerNamePattern);
        //.where("first_name")
        //.startsWithIgnoreCase(lowerNamePattern)
        return await coll.toArray();
    });
</script>

<!-- <input type="text" id="name" bind:value={name} />
<input type="text" id="age" bind:value={age} />
<input type="text" id="email" bind:value={email} />

{name}
{age}
{email}

<button on:click={addItem}> </button>
-->

<button on:click={addJSONData}>Add data </button>
<button on:click={deleteData}>Delete data </button>

<button
    on:click={() => {
        idstart -= rowsPerPage;
    }}
>
    {"<"}
</button>
<button
    on:click={() => {
        idstart += rowsPerPage;
    }}
>
    >
</button>

<input type="text" bind:value={firstNameSearch} />
<input type="text" bind:value={lastNameSearch} />

<input type="text" id="rowsPerPage" bind:value={rowsPerPage} />

<datalist id="rowsPerPage">
    {#each [10, 20, 50, 100] as rp}
        <option value={rp} />
    {/each}
</datalist>

{#if $peopleList}
    {$peopleList.length}
    ({idstart + " - " + (idstart + rowsPerPage)})

    <ul>
        {#each $peopleList.slice(idstart, idstart + rowsPerPage) as person}
            <li>
                {person.first_name} - {person.last_name} - {person.phone_number}
            </li>
        {/each}
    </ul>
{:else}
    <p>Loading data...</p>
    {JSON.stringify($peopleList)}
{/if}
